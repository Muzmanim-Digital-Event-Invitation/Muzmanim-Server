import express from "express";
import { getEventByUser } from "../5-logic/evenets-logic";

export const eventsRouter = express.Router();

eventsRouter.get('/eventsByUser', async (req, res, next) => {
    const token = req.headers.authorization;
    const {email } = decode(token);  
    const events = await getEventByUser(email);
    console.log(events);
    res.json(events).status(200);
  });
  
  
eventsRouter.get('/test', async (req, res, next) => {
    res.json("test").status(200);
  });
  
  
  
  
  
