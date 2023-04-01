import { NextFunction, Request, Response } from "express";
import { UniversalsController } from "../../@core/common/universals.controller";
import { TransactionsService } from "./transactions.service";

export class TransactionsController extends UniversalsController {

  public signTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { ip, method, originalUrl } = req;
    try {
      const response = await new TransactionsService().signTransactions({ ip, method, originalUrl },req);
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };

  public getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { ip, method, originalUrl } = req;
    try {
      const response = await new TransactionsService().getTransactions({ ip, method, originalUrl },req);
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };
}