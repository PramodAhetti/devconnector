const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs')
const{ check,validationResult }=require('express-validator');
const User=require('../../models/User')
const jwt=require('jsonwebtoken');
//get api/users
//test route
router.post('/new',[

    check('name','Name is required').not().isEmpty(),
    check('email','Please add a vaild email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})

],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if(user){
            res.status(400).json({errors:[{msg:'user already exists'}]});
        }else{
            const newuser=new User({name:name,email:email,password:password})
            bcrypt.hash(newuser.password,10,(error,hashedpassword)=>{
                if(error){
                    throw error;
                }
                newuser.password=hashedpassword;
                newuser.save();
            })
            const payload={
                user:{
                    id:newuser.id
                }
            }
            jwt.sign(payload,process.env.SECRET,{expiresIn:'1h'},(err,token)=>{
                 if(err){
                    throw err;
                 }
                 res.json({token});
            });
        }
    } catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});
module.exports=router;