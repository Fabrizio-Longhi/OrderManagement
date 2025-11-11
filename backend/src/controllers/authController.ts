import { Request, Response } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const SALT_ROUNDS = 10;

// Session register

export const register = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({error: "Email and password required"});
        }

        if(password.length < 10){
            return res.status(422).json({error: "Password more short"});
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(422).json({ error: "Email invalid" });
        }

        const existing = await prisma.user.findUnique({where: { email }});
        if (existing){
            return res.status(400).json({error: "User already exists"})
        }
        const passwordHash = await bcrypt.hash(password,SALT_ROUNDS)

        const user = await prisma.user.create({
            data: {email,passwordHash},
        });
        return res.status(201).json({id: user.id, email: user.email})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Session login

export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: "Email and password required"});
        }

        const user = await prisma.user.findUnique({where : {email}});
        if (!user){
            return res.status(401).json({error: "Invalid credentials"});
        }

        const isValid = await bcrypt.compare(password,user.passwordHash)
        if(!isValid){
            return res.status(401).json({error: "Invalid credentials"})
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET as string,
            {expiresIn:"1h"}
        );
        return res.json({token})
    }catch (error) {
        
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
