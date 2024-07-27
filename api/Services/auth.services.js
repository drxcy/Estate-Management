import { errorHandler } from "../utils/ErrorHandler.js";
import bcryptjs from "bcryptjs";
import User from "../Models/user.model.js"
import jwt from 'jsonwebtoken';
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
    throw new errorHandler("User already exists");
    }
    // Hashing the Password 
    let hashedPassword
    try {
        hashedPassword = bcryptjs.hashSync(password,10);
    } catch (error) {
       throw new errorHandler("Password does not matched");
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
    export const LoginAccount = async(email,password)=>
        {
        // implement login logic here
        let user
        // check if user is already exists
        try{
            user = await User.findOne({email: email})
        }
        catch(error){
            throw new errorHandler(500,"Internal Server Error");
        }
        if(!user){
            throw new errorHandler(404,"User does not exist");
        }
        // check if password is correct
        let isValidPassword = bcryptjs.compareSync(password, user.password)
        if(!isValidPassword){
            throw new errorHandler(201,"Wrong Credentials");
        
        // if everything is correct return the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...restUserinfo } = user._doc;
        // res.cookie('access_token', token, { httpOnly: true }).status(200).json(restUserinfo);
      } 
    }
    
    
    