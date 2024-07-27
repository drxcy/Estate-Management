import { errorHandler } from "../utils/ErrorHandler.js";
import bcryptjs from "bcryptjs";
import User from "../Models/user.model.js"
import {CreateAccount,LoginAccount} from "../Services/auth.services.js"

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
export const login = async (req,res,next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler(500,"Please enter a both email and password."));
    }
    try {
        await LoginAccount(email, password);
        res.status(201).json("user login Successfully");
    }
    catch (error) {
        return next(error);
    }
}