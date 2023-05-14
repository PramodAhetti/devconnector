const mongoose=require('mongoose')
let post=new mongoose.Schema({
       owned_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
       },
       date:{
          type:String,
          required:true
       },
       message:{
          type:String,
          required:true
       },
       comment:{
         type:Array,
       }
})
module.exports=mongoose.model('post',post);