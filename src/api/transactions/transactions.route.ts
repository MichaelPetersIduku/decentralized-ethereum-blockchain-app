import { Router } from "express";
import { inputValidator } from "../../util/middleware";
import { TransactionsController } from "./transactions.controller";

export const transactionsRouter = Router();

transactionsRouter.post("/", new TransactionsController().signTransactions);

transactionsRouter.get("/", new TransactionsController().getTransactions);
