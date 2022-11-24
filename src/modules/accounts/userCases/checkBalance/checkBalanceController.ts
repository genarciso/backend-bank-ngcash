import { Request, Response } from "express";
import { CheckBalanceUseCase } from "./checkBalanceUseCase";

export class CheckBalanceController {
    async handle(request: Request, response: Response) {
        const userId = request.id_user;
        const checkBalanceUseCase = new CheckBalanceUseCase();

        const result = await checkBalanceUseCase.execute({
            userId
        });

        return response.json(result);

    }
}