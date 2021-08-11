const users=require('../models/users');
const jwt=require('jsonwebtoken');

async function auth(req,res,next)
{
    try {
        let token=req.cookies.jwt;
        let verifyUser=jwt.verify(token,process.env.SK);
        req.user=await users.findOne({_id:verifyUser._id});
        req.token=token;
        req.flag=true;
        next();
    } catch (error) {
        console.log(error);
        req.flag=false;
        next();
    }
}
module.exports=auth;