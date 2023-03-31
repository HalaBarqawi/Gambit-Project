import express, { Express, Request, Response } from "express";

export  async function getName (req:Request, res:Response){
    const data= process.env.NAME;
    console.log(data);
    res.send({data});
    

}