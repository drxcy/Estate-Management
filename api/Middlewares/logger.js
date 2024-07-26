import { format } from "date-fns";
// const { v4: uuid } = require("uuid");
import {v4 as uuidv4} from "uuid";
import fsPromise from"fs/promises";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const logEvents= async(message,logFilename)=>{
    const folderPath= path.join(__dirname,'..','logs')
    const DateTime= format(new Date(),'dd-MM-yyyy\t HH:mm:ss');
    const logItem=  `${DateTime}\t${uuidv4()}\t${message}\n`;
    try {
    if(!fs.existsSync(folderPath))
        {
       await fsPromise.mkdir(folderPath);
        }
        const logsDirectory= path.join(__dirname,'..','logs',logFilename);
        await fsPromise.appendFile(logsDirectory,logItem);
    }
    catch(err){
        throw err;
    }

};
export const logger = (req,res,next)=>
    {
        logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  next();
    }
    export default logger;
