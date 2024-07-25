import logEvents from '../Middlewares/logger.js';
export const Error_Handler = (err,req,res,next)=> {
    logEvents (
        `${err.name} :${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        "errorLog.log"
    );
    if(res.headersSent)
        {
            next(err);
        }
   res.statusCode = (err.status||400) 
   res.json({message:err.message||"Some things went wrong"})    
}
export default Error_Handler;