import { prisma } from "../../../../database/prismaClient";
import { ITransferCash } from "./types";

export class TransferCashUseCase {
    async execute({ senderUserId, receiverUserUsername, value}: ITransferCash) {
        // Consulta os usuários remetente e destinátario
        const senderUser = await prisma.users.findFirst({
            where: {
                id: {
                    equals: senderUserId
                }
            },
            include: {
                account: true
            }
        });

        const receiverUser = await prisma.users.findFirst({
            where: {
                username: {
                    equals: receiverUserUsername
                }
            },
            include: {
                account: true
            }
        });

        // Validações para a transferência
        if (value < 0) {
            throw Error("Value is invalid");
        }

        if (!senderUser) {
            throw Error("Sender id is invalid");
        }

        if (!receiverUser) {
            throw Error("Receiver username is invalid");
        }

        if (senderUser.id == receiverUser.id) {
            throw Error("Sender and Receiver are the same");
        }

        if (senderUser?.account.balance < value) {
            throw Error("The balance is less than amount to be transferred");
        }

        // Atualização das contas de remetente e destinátario
        await prisma.accounts.update({
            where: {
                id: senderUser.accountId
            }, 
            data: {
                balance: senderUser.account.balance - value
            }
        });

        await prisma.accounts.update({
            where: {
                id: receiverUser.accountId
            }, 
            data: {
                balance: receiverUser.account.balance + value
            }
        });

        // Salva a transação
        const newTransaction = await prisma.transactions.create({
            data: {
                value: value,
                createdAt: new Date(),
                cretidedAccountId: receiverUser.accountId,
                debitedAccountId: senderUser.accountId
            }
        })

        return newTransaction;


    }
}