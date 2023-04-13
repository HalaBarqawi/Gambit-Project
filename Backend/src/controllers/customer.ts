import { hashSync } from "bcrypt";
import { Request, Response } from "express";
import { create, getCustomer } from "../service/customer";
import { sign } from "jsonwebtoken";
import { genSaltSync } from "bcrypt";


export async function Login(req: Request, res: Response) {
    const body = req.body;
    const customer = await getCustomer(body.Email, body.Password);
    if (!customer) {
        return res.status(401).json({
            success: 0,
            data: "Invalid email or password"
        });
    }
    const token = sign({ id: customer!.Id }, "secret")
    return res.status(200).json({
        success: 1,
        message: "Login successfully",
        token: token,
        data: customer!.Is_SuperUser
    })
}
export async function Signup(req: Request, res: Response) {
    const body = req.body;
    const salt = genSaltSync(10);
    body.Password = hashSync(body.Password, salt);
    const customer = await create(body);
    if (!customer) {
        res.status(400).send(customer)
    }
    else {
        res.status(201).send({
            success: 1,
            data: customer
        })
    }
}
