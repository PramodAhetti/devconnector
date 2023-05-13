const mongoose=require('mongoose')
let post=new mongoose.Schema({
       owned_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
       },
       message:{
          type:String,
          required:true
       }
})
module.exports=mongoose.model('post',post);