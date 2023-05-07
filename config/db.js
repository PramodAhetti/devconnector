const mongoose=require('mongoose');
const connectDB=async()=>{
 try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connect..');
 }catch(err){
    console.error(err.message);
}
}
module.exports=connectDB;