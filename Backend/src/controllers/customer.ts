import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import {create, getUserByUserEmail} from "../service/customer";
import { sign  } from "jsonwebtoken";
import { genSaltSync } from "bcrypt";
export  async function Login (req:Request, res:Response){
    const body =req.body;
    getUserByUserEmail(body.Email , (err:any, results:any)=>{
        if(err){
            console.log(err);
        }
        if(!results){
            return res.status(404).json({
                success:0 ,
                data: "Invalid Email or Password"
            });
        }
        const result = compareSync (body.Password ,results.Password);
        if(result){
            results.Password=undefined;
            const jsontoken=sign({result:results}, "secret",{expiresIn : "3h"});
            return res.json({
                success:1,
                message:"Login successfully",
                token: jsontoken,
                data:results.Is_SuperUser,
            });

        } else{
            return res.json({
                success:0,
                data:"Invalid email or password"
            });
        }
    })

}
export  async function Signup (req:Request, res:Response){
    const body =req.body;
    const salt=genSaltSync(10);
    body.Password=hashSync(body.Password, salt);
    create(body, (err:any , results:any)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                success:0,
                message:"Database connection error"
            });

        }
        return res.status(200).json({
            success:1,
            data:results
        });

    });

}
