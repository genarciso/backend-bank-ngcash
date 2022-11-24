import { Request, Response } from "express";
import { TransferCashUseCase } from "./transferCashUseCase";

export class TransferCashController {
    async handle(request: Request, response: Response) {
        const {receiverUserUsername, value} = request.body;
        const senderUserId = request.id_user;

        const transferCashUseCase = new TransferCashUseCase();

        const result = await transferCashUseCase.execute({
            senderUserId, 
            receiverUserUsername, 
            value 
        });

        return response.json(result);

    }
}