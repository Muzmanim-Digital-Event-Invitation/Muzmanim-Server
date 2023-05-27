import express from "express";
import { createNewEvent, editEvent, getEventDataById, getEventsByUser, getGuestsByUser, getSpeseficEvent, submitEventForm } from "../5-logic/events-logic";
import jwt_decode from "jwt-decode";
import { UserModel } from "../4-models/UserModel";
import { EventModel } from "../4-models/EventModel";
import { GuestModel } from "../4-models/GuestModel";

export const eventsRouter = express.Router();

eventsRouter.get('/eventForGuestById/:eventId', async (req, res, next) => {
    const eventId = req.params.eventId;

    const event: EventModel = await getEventDataById(eventId);
    if(!event) res.json("Event not found").status(404)
    console.log(event[0]);
    console.log(event);
    res.json(event[0]).status(200);
  });

eventsRouter.get('/speseficEvent/:eventId', async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) res.json("notLogged").status(401)
    const { email } : UserModel = jwt_decode(token);  
    console.log(email);

    const eventId = req.params.eventId;

    const event: EventModel = await getSpeseficEvent(email, eventId);
    if(!event) res.json("Event not found").status(404)
    console.log(event[0]);
    res.json(event[0]).status(200);
  });

eventsRouter.get('/eventsByUser', async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) res.json("notLogged").status(401)
    const { email } : UserModel = jwt_decode(token);  
    console.log(email);
    
    const events: EventModel[] = await getEventsByUser(email);
    console.log(events);
    res.json(events).status(200);
  });
  

eventsRouter.post('/newEvent', async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) res.json("notLogged - unauthorized").status(401)
    const { email } : UserModel = jwt_decode(token);  
    console.log(email);

    const event: EventModel = req.body;
    
    if(!event.eventType || !event.hallName || !event.name1 || !event.city || !event.street || !event.eventDate || !event.eventStartHour ){
        res.status(400).json("One of the fields is missing")
    }
    
    const newEvent: EventModel = await createNewEvent(event, email);
    console.log(newEvent);
    res.json(newEvent).status(200);
  });
  


eventsRouter.put('/editEventInfo/:eventId', async (req, res, next) => {
  try {

    const eventId = req.params.eventId;
    const token = req.headers.authorization;
    if(!token) res.json("notLogged").status(401)
    const { email } : UserModel = jwt_decode(token);  
    console.log(email);
    
    const {event} = req.body;
    
    const editedEvent: EventModel = await editEvent(event, email, eventId);
    console.log(editedEvent);
    res.json(editedEvent).status(200);
  } catch (e) {
    console.log(e);
  }
  });
  


eventsRouter.post('/submitEventForm/:eventId', async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) res.json("notLogged").status(401)
  const eventId = req.params.eventId;
    const guestInfo: GuestModel = req.body;
    
    const editedGuest: GuestModel = await submitEventForm(guestInfo, eventId);
    console.log(editedGuest);
    res.json(editedGuest).status(200);
  });
  


eventsRouter.get('/guestsByEvent/:eventId', async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) res.json("notLogged").status(401)
  const eventId = req.params.eventId;

    const guests: GuestModel[] = await getGuestsByUser(eventId);
    console.log(guests);
    res.json(guests).status(200);
  });
  


eventsRouter.get('/test', async (req, res, next) => {
  res.json("test").status(200);
  });
  
  
  
  
  
