import dotenv from "dotenv";
import express, { Request, Response,Express } from 'express';
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config({path:".env"});
import { router as userRouter } from "./src/routes/customer"; 
import { router as userRouter1 } from "./src/routes/preference"; 
import { router as userRouter2 } from "./src/routes/notification"; 
const app:Express=express();
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.json());
app.use(userRouter);
app.use(userRouter1);
app.use(userRouter2);
app.get('/', (req: Request, res: Response): Response => {
    return res.status(200).json({message: 'Hello World!'})
  });
export default app