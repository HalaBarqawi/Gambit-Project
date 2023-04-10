import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config({path:".env"});
import { router as userRouter } from "./src/routes/customer"; 
const app:Express=express();
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.json());
app.use(userRouter);

app.listen(process.env.PORT  , ()=>{
    console.log("We ar listening on "+process.env.PORT )
});
module.exports = app;
