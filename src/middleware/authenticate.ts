//protect the routes -- so that only authenticated users can access them
//current version generates a JWT after GitHub login, but other routes are not protected 
//create middleware to verify JWT, attach user info to request and use it on protected routes
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "No token provided"});
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Invalid token format"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(401).json({message: "Invalid or expired token"});
    }
};