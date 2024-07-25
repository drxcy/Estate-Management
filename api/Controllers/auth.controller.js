export const signup =  async(req,res,next)=>
    {
        const {username,password,email}= req.body;
        if(!username ||!password ||!email || username==='' || password==='' || email==='')
            {}
    }