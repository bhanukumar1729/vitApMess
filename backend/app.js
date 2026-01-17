import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
const app=express();

async function connectDb(){
    await mongoose.connect(process.env.DBURL);
}

app.listen(process.env.PORT,()=>{
    console.log("server is listening at port")
})

connectDb().then(()=>{
    console.log("database is Connected");
}).catch((err)=>{
    console.log(err);
})
app.get('/',(req,res)=>{
    res.send("Hello world, Iam root");
})