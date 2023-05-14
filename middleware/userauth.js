let jwt=require('jsonwebtoken');
async function userauth(req,res,next){
    try{
        let token=await jwt.verify(req.body.token,process.env.SECRET);
        req.body.user_id=token.user.id;
        next();
    }catch(err){
        res.status(400).send({err:"login required"});
    }
}

module.exports=userauth;