require("dotenv").config();
import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import logger from "./util/logger/logger";
import { connectMongo } from "./@core/database/database.mongo";

import { accountsRouter } from "./api/accounts/accounts.route";
import { transactionsRouter } from "./api/transactions/transactions.route";

// create express server
const app: Application = express();

app.set("port", process.env.PORT || 4001);
app.set("env", "production");

app.use(cors());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(express.static("public"))

// set up error handler
process.on("uncaughtException", (e: any) => {
  logger.log("error", e);
  process.exit(1);
});

process.on("unhandledRejection", (e: any) => {
  logger.log("error", e);
  process.exit(1);
});

// connect mongo database
connectMongo();

//Routes
app.use("/api/v1/accounts", accountsRouter);
app.use("/api/v1/transactions", transactionsRouter);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Decentralized Ethereum blockchain api",
  });
});

export default app;
