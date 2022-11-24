import { Request, Response } from "express";
import { CheckTransactionsUseCase } from "./checkTransactionsUseCase";

export class CheckTransactionsController {
    async handle(request: Request, response: Response) {
        const {date , 
            transactionCashIn, 
            transactionCashOut} = request.query;
        const userId = request.id_user;

        const checkTransactionsUseCase = new CheckTransactionsUseCase();

        const result = await checkTransactionsUseCase.execute({
            userId,
            date: date as string, 
            transactionCashIn: transactionCashIn == 'true',
            transactionCashOut: transactionCashOut == 'true'
        });

        return response.json(result);

    }
}