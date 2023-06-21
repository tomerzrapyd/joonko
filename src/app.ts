import express from 'express';
import {initRoutes} from "./startup/routes";
import {corsConfig} from "./startup/cors";

const app = express();
const port = process.env.PORT || 3001;

corsConfig(app);
initRoutes(app);
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

export {app, server};