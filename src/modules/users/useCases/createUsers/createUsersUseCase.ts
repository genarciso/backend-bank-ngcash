import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient"


export class CreateUsersUseCase {
    async execute({username, password}: ICreateUser) {
        // Validação do tamanho do nome
        if (username.length < 3) {
            throw new Error("Username has less than 3 characteres");
        }

        /* Validação da senha:
        *   a password seja composta por pelo menos 8 caracteres, 
        *   um número 
        *   e uma letra maiúscula
        */
        if (!password.match(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) ) {
            throw new Error("Password is invalid!");
        }

        // Verificação da existência do usuário
        const userExist = await prisma.users.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });

        if (userExist) {
            throw new Error("User already exist!");
        }

        // Criptografar a senha antes de salvar no banco
        const hashPassword = await hash(password, 10);

        const user = await prisma.users.create({
            data: {
                username,
                password: hashPassword,
                account: {
                    create : {}
                }
            }
        });

        return {
            user
        };
    }
}