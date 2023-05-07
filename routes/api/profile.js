const express=require('express')
const router=express.Router();
//get api/users
//test route
router.get('/',(req,res)=>{res.send('profile url')});
module.exports=router;