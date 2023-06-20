import { execute, s3bucket } from "../2-utils/dal";
import * as dotenv from 'dotenv';
import { EventModel } from "../4-models/EventModel";
import { GuestModel } from "../4-models/GuestModel";
import uniqid from "uniqid";
import { saveBase64ImageToS3, saveImagesToS3 } from "./aws-logic";
dotenv.config({ path: ".env" });



export async function getEventDataById(eventId: string) {
    try {
    const query = "SELECT * FROM events WHERE id = ?;";
    const [rows] = await execute<EventModel>(query, [eventId]);
    return rows
    } catch (e) {
        console.log(e);
    }
}


export async function getSpeseficEvent(email: string, eventId: string) {
    try {
    const query = "SELECT * FROM events WHERE userEmail = ? and id = ?;";
    const [rows] = await execute<EventModel>(query, [email, eventId]);
    return rows
    } catch (e) {
        console.log(e);
    }
}


export async function getEventsByUser(email: string) {
    try {
    const query = "SELECT * FROM events WHERE userEmail = ?;";
    const [rows] = await execute<EventModel[]>(query, [email]);
    return rows
    } catch (e) {
        console.log(e);
    }
}


export async function getGuestsByUser(eventId: string) {
    try {
    const query = "SELECT * FROM guests WHERE eventId = ?;";
    const [rows] = await execute<GuestModel[]>(query, [eventId]);
    return rows
    } catch (e) {
        console.log(e);
    }
}

function isBase64(str: string) {
    return Buffer.from(str, 'base64').toString('base64') === str;
}


export async function createNewEvent(event: EventModel, email: string) {

    if(event.imageId.includes('data:image')) {
        const generateImageId = uniqid();
        const savedImgToS3 = await saveBase64ImageToS3(event.imageId, generateImageId);
        
        event.imageId = savedImgToS3;
    }

    // genarate eventId
    const id = uniqid();

    
    // try {
    //     const query = "INSERT INTO events (id, userEmail, eventType, hallName, name1, name2, food, vegetarian, vegan, kids, regular, city, street, eventDate, eventStartHour, imageId, background, colorText, iconId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    //     const [rows] = await execute<EventModel>(query, [id, email, event.eventType, event.hallName, event.name1, event.name2 ?? "", event.food, event.vegetarian, event.vegan, event.kids, event.regular, event.city, event.street, event.eventDate, event.eventStartHour, event.imageId, event.background, event.colorText ?? "", event.iconId ?? ""]);
    //     return rows
    // } catch (e) {
    //     console.log(e);
    // }
    console.log(event);
    

    try {
        const query = "INSERT INTO events (id, userEmail, eventType, hallName, name1, name2, food, vegetarian, vegan, kids, regular, city, street, eventDate, eventStartHour, imageId, background, colorText, iconId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        const values = [id, email, event.eventType, event.hallName, event.name1, event.name2 ?? "", event.food === 'true' ? 1 : 0, event.vegetarian === 'true' ? 1 : 0, event.vegan === 'true' ? 1 : 0, event.kids === 'true' ? 1 : 0, event.regular === 'true' ? 1 : 0, event.city, event.street, event.eventDate, event.eventStartHour, event.imageId, event.background, event.colorText ?? "", event.iconId ?? ""];
        const [rows] = await execute<EventModel>(query, values);
        return rows
    } catch (e) {
        console.log(e);
    }
}


export async function editEvent(event, email: string, eventId: string) {

    try {
        const query = "UPDATE events SET eventType = ?, hallName = ?, name1 = ?, name2 = ?, food = ?, vegetarian = ?, vegan = ?, kids = ?, regular = ?, city = ?, street = ?, eventDate = ?, eventStartHour = ?  WHERE id = ? AND userEmail = ?";
        const [rows] = await execute<EventModel>(query, [event.eventType, event.hallName, event.name1, event.name2 ?? null, event.food, event.vegetarian, event.vegan, event.kids, event.regular, event.city, event.street, event.eventDate, event.eventStartHour, eventId, email]);
        return rows
    } catch (e) {
        console.log(e);
    }
}



export async function deleteEventById(eventId: string, email: string) {

    try {
        const query = "DELETE from events WHERE id = ? and userEmail = ?";
        const [rows] = await execute<EventModel>(query, [eventId, email]);
        return rows
    } catch (e) {
        console.log(e);
    }
}

export async function validateUserEmailByEvent(email: string, eventId: string) {
    try {
      const query = "SELECT * FROM events WHERE id = ? AND userEmail = ?";
      const [rows] = await execute<EventModel[]>(query, [eventId, email]);
      return rows.length > 0; // Return true if there is a matching event, false otherwise
    } catch (e) {
      console.log(e);
      return false; // Return false if an error occurs
    }
  }



export async function deleteGuestById(guestId: number, eventId: string) {

    try {
        const query = "DELETE from guests WHERE id = ? and eventId = ?";
        const [rows] = await execute<EventModel>(query, [guestId, eventId]);
        return rows
    } catch (e) {
        console.log(e);
    }
}



  

// export async function submitEventForm(guestInfo: GuestModel, eventId: string) {
//     console.log(guestInfo);

    
//     try {
//       // Check if the phone number already exists in the database for the given eventId
//       const selectQuery = "SELECT id FROM guests WHERE eventId = ? AND phone = ?";
//       const [selectRows] = await execute<{ id: number }>(selectQuery, [eventId, guestInfo.phone]);
      
//       if (selectRows.length > 0) {
//         // Update the existing row
//         const updateQuery = "UPDATE guests SET firstName = ?, lastName = ?, guestsAmount = ?, isComing = ?, vegetarian = ?, vegan = ?, kids = ?, regular = ?, notes = ? WHERE id = ?";
//         const [updateRows] = await execute<GuestModel>(updateQuery, [guestInfo.firstName, guestInfo.lastName, guestInfo.guestsAmount, guestInfo.isComing, guestInfo.vegetarian, guestInfo.vegan, guestInfo.kids, guestInfo.regular, guestInfo.notes, selectRows[0].id]);
//         return updateRows;
//       } else {
//         // Insert a new row
//         const insertQuery = "INSERT INTO guests (eventId, firstName, lastName, guestsAmount, phone, isComing, vegetarian, vegan, kids, regular, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//         const [insertRows] = await execute<GuestModel>(insertQuery, [eventId, guestInfo.firstName, guestInfo.lastName, guestInfo.guestsAmount, guestInfo.phone, guestInfo.isComing, guestInfo.vegetarian, guestInfo.vegan, guestInfo.kids, guestInfo.regular, guestInfo.notes]);
//         return insertRows;
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }

export async function submitEventForm(guestInfo: GuestModel, eventId: string) {
  try {
    // Check if the phone number already exists in the database for the given eventId
    const selectQuery = "SELECT phone FROM guests WHERE eventId = ? AND phone = ?";
    const [selectRows] = await execute<{ phone: string }>(selectQuery, [eventId, guestInfo.phone]);

    if (selectRows.length > 0) {
      // Update the existing row
      const updateQuery = "UPDATE guests SET firstName = ?, lastName = ?, guestsAmount = ?, isComing = ?, vegetarian = ?, vegan = ?, kids = ?, regular = ?, notes = ? WHERE phone = ? AND eventId = ?";
      const [updateRows] = await execute<GuestModel>(updateQuery, [guestInfo.firstName, guestInfo.lastName, guestInfo.guestsAmount, guestInfo.isComing, guestInfo.vegetarian, guestInfo.vegan, guestInfo.kids, guestInfo.regular, guestInfo.notes, selectRows[0].phone, eventId]);
      return updateRows;
    } else {
      // Insert a new row
      const insertQuery = "INSERT INTO guests (eventId, firstName, lastName, guestsAmount, phone, isComing, vegetarian, vegan, kids, regular, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const [insertRows] = await execute<GuestModel>(insertQuery, [eventId, guestInfo.firstName, guestInfo.lastName, guestInfo.guestsAmount, guestInfo.phone, guestInfo.isComing, guestInfo.vegetarian, guestInfo.vegan, guestInfo.kids, guestInfo.regular, guestInfo.notes]);
      return insertRows;
    }
  } catch (e) {
    throw new Error(`Error occurred while submitting event form: ${e.message}`);
  }
}



  export async function editGuest(guestInfo: GuestModel, eventId: string) {
    try {
      const updateQuery = `
        UPDATE guests
        SET firstName = ?, lastName = ?, guestsAmount = ?, phone = ?, isComing = ?, vegetarian = ?, vegan = ?, kids = ?, regular = ?, notes = ?
        WHERE eventId = ?`;
      
      const updateParams = [
        guestInfo.firstName,
        guestInfo.lastName,
        guestInfo.guestsAmount,
        guestInfo.phone,
        guestInfo.isComing,
        guestInfo.vegetarian,
        guestInfo.vegan,
        guestInfo.kids,
        guestInfo.regular,
        guestInfo.notes,
        eventId
      ];
      
      const [updateRows] = await execute<GuestModel>(updateQuery, updateParams);
      return updateRows;
    } catch (e) {
      console.log(e);
      throw new Error("Error editing guest."); // You can handle the error in a more appropriate way if needed.
    }
  }
  
  

// export async function getWordsByUser(userId: number) {
//     const query = "SELECT * FROM words WHERE userId = ?;";
//     const [rows] = await execute<WordModel[]>(query, [userId]);
    
//     return rows
// }
