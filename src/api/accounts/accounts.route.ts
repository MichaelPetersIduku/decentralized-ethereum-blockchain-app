import { Router } from "express";
import { inputValidator } from "../../util/middleware";
import { AccountsController } from "./accounts.controller";

export const accountsRouter = Router();

accountsRouter.get("/", new AccountsController().getAccounts);

accountsRouter.post("/", new AccountsController().createAccount);

accountsRouter.get("/balance/:account", new AccountsController().getAccountBalance);
