import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import FoodMenu from "./models/foodMenu.js";
import cors from 'cors';

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
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

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.get("/api/menu", async (req, res) => {
  try {
    const { date, hostelType, menuType } = req.query;

    if (!date || !hostelType || !menuType) {
      return res.status(400).json({
        message: "date, hostelType, and menuType are required"
      });
    }

    const menu = await FoodMenu.findOne({
      date: new Date(date),
      foodType: menuType,
      hostelType: hostelType // works because hostelType is an array
    });

    if (!menu) {
      return res.status(404).json({
        message: "Menu not found"
      });
    }

    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});