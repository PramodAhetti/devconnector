const express=require('express')
const router=express.Router();
const userauth=require('../../middleware/userauth');
const posts=require('../../models/Post')
//get api/users
//test route
router.post('/new',userauth,async (req,res)=>{
     try{
        let newpost=new posts({
            owned_id:req.body.user_id,
            message:req.body.message
         });
         await newpost.save();
         return res.send({msg:'post saved'});
     }catch(err){
        res.status(400).send({err:"server error"});
     }

});



router.post('/delete',userauth,async (req,res)=>{
    try{
        let post=await posts.findById(req.body.post_id)
        if(post){
            post.delete();
            return res.send({msg:"deleted the post"})
        }else{
            res.status(400).send({err:"post not found"});
        }
    }catch(err){
       res.status(400).send({err:"server error"});
    }

});
module.exports=router;