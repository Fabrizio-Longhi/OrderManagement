import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).json({error: "Token not provided"})
    }

    const token = authHeader?.split(" ")[1];

    const jwtSecret = process.env.JWT_SECRET;
    if (!token || !jwtSecret) {
        return res.status(401).json({ error: "Token or secret not provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        (req as any).user = decoded; // guardamos info del usuario en la request
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalid or expired" });
    }
}