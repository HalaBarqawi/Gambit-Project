import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config({path:"./src/config/.env"});
import { router as userRouter } from "./src/routes/customer"; 
const app:Express=express();
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.json());
app.use(userRouter);
app.get('/', (req, res)=>{
    res.json({success: true , messsage : "Welcome to backend !"})
});
app.listen(8080 , ()=>{
    console.log('port 8080 is listening')
});
module.exports = app;
