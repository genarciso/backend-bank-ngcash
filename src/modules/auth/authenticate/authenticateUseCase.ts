
import { compare } from "bcrypt";
import { JsonWebTokenError, sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";
import { IAuthenticateUser } from "./types";

export class AuthenticateUseCase {
    async execute({username, password}: IAuthenticateUser) {

        // Verificar se o username é cadastrado
        const user = await prisma.users.findFirst({
            where: {
                username
            }
        });
        
        if (!user) {
            throw new Error("Username or password are invalid!");
        }
        
        // Verificar se o password corresponde ao do usuário
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Username or password are invalid!");
        }

        // Gerar token para o usuário
        const token = sign({username}, "f266fae6128a252bd2b2cb0444c626f988c72cc22e0a24e8194a86cfa6199039", {
            subject: user.id,
            expiresIn: "1d"
        });
        return token;
    }   
}