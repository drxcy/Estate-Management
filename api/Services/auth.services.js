import { errorHandler } from "../utils/ErrorHandler.js";
import bcryptjs from "bcryptjs";
import User from "../Models/user.model.js"
export const CreateAccount = async(username,password,email)=>
    {
        // check for user whether already exist or not
        let user 
    try{
        user = await User.findOne({email: email})
    }
    catch(error){
        throw new errorHandler(500,"Internal Server Error");
    }
    if(user){
    return new(errorHandler("User already exists"));
    }
    // Hashing the Password 
    let hashedPassword
    try {
        hashedPassword = bcryptjs.hashSync(password,10);
    } catch (error) {
       return new(errorHandler("Password does not matched")) 
    }
    //    Save to the database
        const newUser = new User(
            {
                username,
                email,
                password:hashedPassword
            }
        );  
    }