import { s3bucket } from "../2-utils/dal";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from 'dotenv';

dotenv.config({ path: ".env" });



export async function getEventByUser(email: string) {
    try {
        // const events = 
        // return events
        // get events from db
    } catch (e) {
        console.log(e);
    }
}
