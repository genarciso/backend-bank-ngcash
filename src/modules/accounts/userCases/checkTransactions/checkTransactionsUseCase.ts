import { prisma } from "../../../../database/prismaClient";
import { ICheckTransactions } from "./type";

export class CheckTransactionsUseCase {
    async execute({ 
        userId, 
        date, 
        transactionCashIn, 
        transactionCashOut 
    }: ICheckTransactions) {
        const userAccount = await prisma.users.findFirst({
            where: {
                id: {
                    equals: userId
                }
            },
            include: {
                account: true
            }
        });


        const userTransactions = await prisma.transactions.findMany({
            where: {
                createdAt: date ? {
                    equals: new Date(date)
                } : undefined,
                OR: [
                    {
                        cretidedAccountId: transactionCashIn ? {
                            equals: userAccount?.accountId
                        } : undefined
                    }, {
                        debitedAccountId: transactionCashOut ? {
                            equals: userAccount?.accountId
                        } : undefined
                    }

                ]
            }
        });

        return {
            userTransactions
        }
    }
}