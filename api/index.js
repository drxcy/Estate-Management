import express,{Router} from 'express';
import mongoDb from './DB/MonogDb.config.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './Routes/server.js';
import {logger,logEvents} from './Middlewares/logger.js';
import Error_Handler from './Middlewares/error-handler.js';
import corsOptions from './DB/cors-configure.js';
import cors from'cors';
 dotenv.config();
 const app = express();
 const port = process.env.PORT || 3000;
 mongoDb();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(logger);
app.use(router);
app.use(Error_Handler);
mongoose.connection.once("open", () => {
console.log("Connected to DB");
app.listen(port, ()=>
    {
    console.log(`listening on port ${port}`)
    });
});
mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(`${err.name} : ${err.message}`, "mongoErrLog.log");
  });