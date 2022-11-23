import { Router } from "express";
import { checkAuthenticate } from "./middlewares/checkAuthenticate";
import { CheckBalanceController } from "./modules/accounts/userCases/checkBalance/checkBalanceController";
import { AuthenticateController } from "./modules/auth/authenticate/authenticateController";
import { CreateUsersController } from "./modules/users/useCases/createUsers/createUsersController";

const routes = Router();

const authenticateController = new AuthenticateController();
const createUsersController = new CreateUsersController();
const checkBalanceController = new CheckBalanceController();

routes.post("/login", authenticateController.handle);
routes.post("/user", createUsersController.handle);

// Authenticated routes
routes.get("/user/balance", checkAuthenticate, checkBalanceController.handle);

export { routes };