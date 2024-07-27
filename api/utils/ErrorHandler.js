// I m geeting error for throw new exception
export const errorHandler =(statuscode, message) => {
    const error = new Error();
    error.statuscode = statuscode;
    error.message = message;
    
    return error;
};
// it can be used both with throw new and return next
// class ErrorHandler extends Error {
//     constructor(statuscode, message) {
//         super(message);
//         this.statuscode = statuscode;
//     }
// }

// export const errorHandler = (statuscode, message) => {
//     return new ErrorHandler(statuscode, message);
// };