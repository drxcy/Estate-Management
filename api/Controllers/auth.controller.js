import { errorHandler } from "../utils/ErrorHandler.js";
import bcryptjs from "bcryptjs";
import User from "../Models/user.model.js"
export const signup = async(req,res,next)=>
    {
        const { username,password,email} = req.body;
        if(!username||!password ||!email || username==='' || password==='' || email==='')
            {
                next(errorHandler(500,'All Fields Required to Fills Field'));
            }
            const hashedPassword = bcryptjs.hashSync(password,10);
            const newUser = new User(
                {
                    username,
                    email,
                    password:hashedPassword
                }
            );
            try {
                await newUser.save();
                res.json("User created successfully");
            } catch (error) {
                next(error);
            }
    }