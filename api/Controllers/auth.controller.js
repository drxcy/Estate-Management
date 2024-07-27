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
export const signin = async (req,res,next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(errorHandler(500,"Please enter a both email and password."));
    }
    try {
        await LoginAccount(email, password);
        res.status(201).json("user login Successfully");
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(restUserinfo);
    }
    catch (error) {
        return next(error);
    }
}