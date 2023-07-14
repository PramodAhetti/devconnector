const express=require('express');
const connectDB=require('./config/db');
const app=express();
const morgan = require('morgan')
const bodyparser=require('body-parser')
require('dotenv').config();


//connecting to database
connectDB();

//middleware
app.use(bodyparser.json())
app.use(morgan('dev'))


//routes
app.get('/main',(req,res)=>res.send({name:"pramod",token:"adfa5545421212121",user_id:"ad4fa65df4a5dfaa"}));

app.use('/user',require('./routes/api/users'));
app.use('/post',require('./routes/api/post'));
app.use('/auth',require('./routes/api/auth'));
app.use('/profile',require('./routes/api/profile'));

const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>console.log(`server running on port ${PORT}`))