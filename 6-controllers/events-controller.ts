import express from "express";
import { createNewEvent, editEvent, getEventsByUser, getGuestsByUser, submitEventForm } from "../5-logic/events-logic";
import jwt_decode from "jwt-decode";
import { UserModel } from "../4-models/UserModel";
import { EventModel } from "../4-models/EventModel";
import { GuestModel } from "../4-models/GuestModel";

export const eventsRouter = express.Router();

eventsRouter.get('/eventsByUser', async (req, res, next) => {
    const token = req.headers.authorization;
    const { email } : UserModel = jwt_decode(token);  
    console.log(email);
    
    const events: EventModel[] = await getEventsByUser(email);
    console.log(events);
    res.json(events).status(200);
  });
  

eventsRouter.post('/newEvent', async (req, res, next) => {
    const token = req.headers.authorization;
    const { email } : UserModel = jwt_decode(token);  
    console.log(email);

    const event: EventModel = req.body;
    
    const newEvent: EventModel = await createNewEvent(event, email);
    console.log(newEvent);
    res.json(newEvent).status(200);
  });
  


eventsRouter.put('/editEvent/:eventId', async (req, res, next) => {
  const eventId = req.params.eventId;
    const token = req.headers.authorization;
    const { email } : UserModel = jwt_decode(token);  
    console.log(email);

    const event: EventModel = req.body;
    
    const editedEvent: EventModel = await editEvent(event, email, eventId);
    console.log(editedEvent);
    res.json(editedEvent).status(200);
  });
  


eventsRouter.post('/submitEventForm/:eventId', async (req, res, next) => {
    const eventId = req.params.eventId;
    const guestInfo: GuestModel = req.body;
    
    const editedGuest: GuestModel = await submitEventForm(guestInfo, eventId);
    console.log(editedGuest);
    res.json(editedGuest).status(200);
  });
  


eventsRouter.get('/guestsByEvent', async (req, res, next) => {
    const { eventId } = req.body;
    
    const guests: GuestModel[] = await getGuestsByUser(eventId);
    console.log(guests);
    res.json(guests).status(200);
  });
  
  
  
eventsRouter.get('/test', async (req, res, next) => {
    res.json("test").status(200);
  });
  
  
  
  
  
