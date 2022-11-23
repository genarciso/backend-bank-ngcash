
import { prisma } from "../../../../database/prismaClient";
import { ICheckBalance } from "./types";

export class CheckBalanceUseCase {
    async execute({ userId }: ICheckBalance) {
        
        const result = await prisma.accounts.findFirst({
            where: {
                user: {
                    id: {
                        equals: userId
                    }
                }
            },
            select: {
                id: true,
                balance: true,
                user: {
                    select: {
                        id: true, 
                        username: true
                    }
                }
            }
        });
        return { result };
    }
}