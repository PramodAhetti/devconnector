const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs')
const{ check,validationResult }=require('express-validator');
const User=require('../../models/User')
const jwt=require('jsonwebtoken');
//get api/users
//test route

router.post('/login',[
    check('email','email is required').isEmail(),
    check('password','password required').not().isEmpty()
],
async(req,res)=>{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
      }
      let {email,password}=req.body;
      try{
       console.log({email});
       let user=await User.findOne({email:email});
       if(user){
        let checkpassword=await bcrypt.compare(password,user.password);
        if(!checkpassword){
            return res.status(400).json({err:'wrong password'});
        }
        const payload={
            user:{
                id:user.id
            }
        }
        let token=jwt.sign(payload,process.env.SECRET,{expiresIn:'1h'});
           res.json({data:{token}});
       }else{
           res.status(400).json({err:'user doesnt exists'});
       }
      }catch(err){
        console.error(err.message);
        res.status(400).json({err:'server error'});
      }
      
})

router.post('/new',[

    check('name','Name is required').not().isEmpty(),
    check('email','Please add a vaild email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})

],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({err: errors.array()});
    }
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if(user){
            return res.status(400).json({err:'user already exists'});
        }else{
            const newuser=new User({name:name,email:email,password:password})
            let salt=await bcrypt.genSalt(10);
            let hashedpassword=await bcrypt.hash(newuser.password,salt);
                newuser.password=hashedpassword;
                newuser.save();
            const payload={
                user:{
                    id:newuser.id
                }
            }
            let token =await jwt.sign(payload,process.env.SECRET,{expiresIn:'1h'});
            console.log(token);
            if(token){
                res.send({data:{token}});
            }
        }
    } catch(err){
        console.error(err.message);
        res.status(400).json({err:'server error'});
    }
});
module.exports=router;