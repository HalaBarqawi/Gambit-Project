import express, { Express, Request, Response } from "express";
const router = express.Router();
import {getName} from "../controllers/customer";

router.get('/getName', getName);

export {router};
