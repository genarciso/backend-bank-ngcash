import { NextFunction, request, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";


export async function checkAuthenticate(
    request: Request, 
    response: Response, 
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    
    // Checa validade do token
    if (!authHeader) {
        return  response.status(401).json({
            message: "Token missing"
        })
    }

    const [,token] = authHeader.split(" ");

    try {
        const {sub} = verify(
            token, 
            "f266fae6128a252bd2b2cb0444c626f988c72cc22e0a24e8194a86cfa6199039"
            ) as { sub: string };
        
        request.id_user = sub;
        return next();
    } catch (err) {
        return  response.status(401).json({
            message: "Token invalid"
        })
    }
}