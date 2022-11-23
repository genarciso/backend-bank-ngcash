import { Request, Response } from "express";
import { CreateUsersUseCase } from "./createUsersUseCase";

export class CreateUsersController {
    async handle(request: Request, response: Response) {
        const {username, password} = request.body;
        const createUsersUseCase = new CreateUsersUseCase();

        const result = await createUsersUseCase.execute({
            username, 
            password
        });

        return response.json(result);

    }
}