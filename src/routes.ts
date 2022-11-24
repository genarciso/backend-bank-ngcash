import { Router } from "express";
import { checkAuthenticate } from "./middlewares/checkAuthenticate";
import { CheckBalanceController } from "./modules/accounts/userCases/checkBalance/checkBalanceController";
import { CheckTransactionsController } from "./modules/accounts/userCases/checkTransactions/checkTransactionsController";
import { TransferCashController } from "./modules/accounts/userCases/transferCash/transfererCashController";
import { AuthenticateController } from "./modules/auth/authenticate/authenticateController";
import { CreateUsersController } from "./modules/users/useCases/createUsers/createUsersController";

const routes = Router();

const authenticateController = new AuthenticateController();
const createUsersController = new CreateUsersController();
const checkBalanceController = new CheckBalanceController();
const transferCashController = new TransferCashController();
const checkTransactionsController = new CheckTransactionsController();

routes.post("/login", authenticateController.handle);
routes.post("/user", createUsersController.handle);

// Authenticated routes
routes.get("/user/balance", checkAuthenticate, checkBalanceController.handle);
routes.post("/user/transfer", checkAuthenticate, transferCashController.handle);
routes.get("/user/transactions", checkAuthenticate, checkTransactionsController.handle);

export { routes };