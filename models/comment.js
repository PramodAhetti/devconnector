let mongoose=require('mongoose')
let comment=mongoose.Schema({
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    comment:{
        type:String,
        required:true
    }

});
module.exports=mongoose.model('comment',comment);