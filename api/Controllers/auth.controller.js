import { errorHandler } from "../utils/ErrorHandler.js";
import bcryptjs from "bcryptjs";
import User from "../Models/user.model.js"
import {CreateAccount} from "../Services/auth.services.js"
export const signup = async(req,res,next)=>
    {
        const { username,password,email} = req.body;
        if(!username||!password ||!email || username==='' || password==='' || email==='')
            {
                next(errorHandler(500,'All Fields Required to Fills Field'));
            }
           
            try {
                await CreateAccount(email, password,username);
                res.status(201).json("User created successfully");
            } catch (error) {
                next(error);
            }
    }