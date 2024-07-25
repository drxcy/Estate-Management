import { format } from "date-fns";
// const { v4: uuid } = require("uuid");
import {v4} from "uuid";
import fsPromise from"fs/promises";
import path from "path";
import fs from "fs";
export const logEvents= async(message,logFilename)=>{
    const folderPath= path.join(__dirname,'..','logs')
    const DateTime= format(new Date(),'dd-MM-yyyy\t HH:mm:ss');
    const logItem=  `${DateTime}\t${uuid()}\t${message}\n`;
    try {
    if(!fs.existsSync(folderPath))
        {
       await fsPromise.mkdir(folderPath);
        }
        const filePath= path.join(__dirname,'..','logs',logFilename);
        await fsPromise.appendFile(filePath,logItem);
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
