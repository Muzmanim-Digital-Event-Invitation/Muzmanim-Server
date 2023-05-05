import express, { json } from 'express';
import { catchAll } from './3-middleware/error-handle';
import { logRequest } from './3-middleware/log';
import cors from "cors";
import fileUpload from 'express-fileupload';
import { eventsRouter } from './6-controllers/events-controller';

import * as dotenv from 'dotenv';
dotenv.config({ path: ".env" });

const server = express();
server.use(cors())
server.use(json());
server.use(fileUpload())
server.use(logRequest);

server.use(eventsRouter);

server.use(catchAll);

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});