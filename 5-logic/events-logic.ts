import { execute, s3bucket } from "../2-utils/dal";
import * as dotenv from 'dotenv';
import { EventModel } from "../4-models/EventModel";
import { GuestModel } from "../4-models/GuestModel";
import uniqid from "uniqid";
dotenv.config({ path: ".env" });



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


export async function createNewEvent(event: EventModel, email: string) {
    // genarate uniqId
    const id = uniqid();
    console.log(event);
    
    try {
        const query = "INSERT INTO events (id, userEmail, eventType, hallName, name1, name2, food, vegetarian, vegan, kids, regular, city, street, eventDate, eventStartHour, imageId, patternId, colorText, iconId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        const [rows] = await execute<EventModel>(query, [id, email, event.eventType, event.hallName, event.name1, event.name2 ?? null, event.food, event.vegetarian, event.vegan, event.kids, event.regular, event.city, event.street, event.eventDate, event.eventStartHour, event.imageId, event.patternId, event.colorText, event.iconId]);
        return rows
    } catch (e) {
        console.log(e);
    }
}


// export async function getWordsByUser(userId: number) {
//     const query = "SELECT * FROM words WHERE userId = ?;";
//     const [rows] = await execute<WordModel[]>(query, [userId]);
    
//     return rows
// }
