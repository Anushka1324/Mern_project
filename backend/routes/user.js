const router= require("express").Router();
const User = require("../models/user"); 
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

//SIGN_IN API
router.post("/sign-in",async(req,res)=>{
    try{
        const {username}= req.body;
    const {email}=req.body;
    const existinguser= await User.findOne({username:username});
    const existingemail= await User.findOne({email: email});
    if(existinguser){
        return res.status(300).json({message:"Username already exist"});
    }else if (username.length<4){
        return res.status(400).json({message:"Username should have atleast4 characters"});
    }
    if(existingemail){
        return res.status(300).json({message:"Email already exist"});
    }
    const hashPass= await bcrypt.hash(req.body.password,10);
    const newuser= new User({username:req.body.username,
        email:req.body.email,
        password: hashPass,
    });
    await newuser.save();
    return res.status(200).json({message:"Signin Successfully"});
    }catch(error){
        console.log(error);
        res.status(400).json({message:"Internal Server Error"});
    }
});

//login
router.post("/log-in",async(req,res)=>{
    const {username,password}= req.body;
    const existinguser= await User.findOne({username:username});
    if(!existinguser){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    bcrypt.compare(password,existinguser.password,(err,data)=>{
        if(data){
            const authClaims=[{name:username},{jti: jwt.sign({},process.env.SECRET_KEY)}];
            const token=jwt.sign({authClaims},process.env.SECRET_KEY,{expiresIn:"2d"});
            res.status(200).json({id:existinguser._id,token:token})
        }else{
            return res.status(400).json({message:"Invalid Credentials"});
        }
    })
});
module.exports=router;