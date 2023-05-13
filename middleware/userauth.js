let jwt=require('jsonwebtoken');
async function userauth(req,res,next){
    try{
        await jwt.verify(req.body.token,process.env.SECRET);
        next();
    }catch(err){
        res.status(400).send({err:"login required"});
    }
}

module.exports=userauth;