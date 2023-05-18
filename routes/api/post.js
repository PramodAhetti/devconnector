const express=require('express')
const router=express.Router();
const userauth=require('../../middleware/userauth');
const posts=require('../../models/Post')
//get api/users
//test route

//route to get all the posts
router.get('/all',userauth,async(req,res)=>{
    try{
        let allposts=await posts.find().sort({['date']:1});
        res.send(allposts);
    }catch(err){
        res.status(400).send({err:"server error"});
    }
})


//route to add new post
router.post('/new',userauth,async (req,res)=>{
     try{
        let newpost=new posts({
            owned_id:req.body.user_id,
            message:req.body.message,
            date:Date.now()
         });
         await newpost.save();
         return res.send({msg:'post saved'});
     }catch(err){
        res.status(400).send({err:"server error"});
     }

});


//route to delete already existing posts
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

router.post('/addcomment',userauth,async(req,res)=>{
      try{
         let post=await posts.findById(req.body.post_id);
         post.comment.unshift({index:post.__v,user:req.body.user_id,comment:req.body.comment});
         await post.save();
         res.send({msg:"commented to this post"})
      }catch(err){
        res.status(400).send({err:"server error"})
      }
})

router.delete('/deletecomment',userauth,async(req,res)=>{
    try{
       let post=await posts.findById(req.body.post_id);
       let comment =post.comment.find((data)=>{return (data.user.toString()===req.body.user_id && data.index.toString()===req.body.index)});
       post.comment.remove(comment);
       await post.save();
       res.send({msg:"comment on this post is deleted"})
    }catch(err){
      res.status(400).send({err:"server error"})
    }
})
module.exports=router;