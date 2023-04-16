import dotenv from "dotenv";
import express, { Request, Response,Express } from 'express';
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
app.get('/', (req: Request, res: Response): Response => {
    return res.status(200).json({message: 'Hello World!'})
  });
export default app