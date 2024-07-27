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
    export const LoginAccount = async()=>
        {
        // implement login logic here
        let user
        // check if user is already exists
        try{
            user = await User.findOne({email: email})
        }
        catch(error){
            return new errorHandler(500,"Internal Server Error");
        }
        if(!user){
            return new(errorHandler(404,"User does not exist"));
        }
        // check if password is correct
        let isValidPassword = bcryptjs.compareSync(password, user.password)
        if(!isValidPassword){
            return new(errorHandler(201,"Wrong Credentials"));
        }
        // if everything is correct return the user
        return user;
    
    }
    // export const signin = async (req,res,next)=>
    //     {
    //         const {email, password}=req.body;
    //         if(!email ||!password ||email==='' || password==='')
    //         {
    //            next(errorHandler(500,'All Fields Required to Fills Field'));
    //         }
    //        try {
    //         const checkUser= await User.findOne({email});
    //         if(!checkUser)
    //         {
    //            return next(errorHandler(404,'User Not Found'));
    //         }
    //         const isMatchPassword = bcryptjs.compareSync(password,checkUser.password);
    //        if(!isMatchPassword) {
    //        return next(errorHandler(401,'Invalid User Password!!'));
    //        }
    //        const token = jwt.sign({User_id:checkUser._id,isAdmin:checkUser.isAdmin}
    //         ,process.env.JWT_SECRET);
    //         const {password:pass ,...rest}=checkUser._doc;
    //         res
    //         .status(200)
    //         .cookie('access_token',token,
    //         {
    //          httpOnly: true,   
    //         }).json(rest);
        
    //        } catch (err) {
    //         next(err);
    //        }
        
    //     }