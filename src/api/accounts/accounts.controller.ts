import { NextFunction, Request, Response } from "express";
import { UniversalsController } from "../../@core/common/universals.controller";
import { AccountsService } from "./accounts.service";

export class AccountsController extends UniversalsController {

  public getAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { ip, method, originalUrl } = req;
    try {
      const response = await new AccountsService().getAccounts({ ip, method, originalUrl },req);
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };

  public createAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { ip, method, originalUrl } = req;
    try {
      const response = await new AccountsService().createAccount({ ip, method, originalUrl },req);
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };

  public getAccountBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { ip, method, originalUrl } = req;
    try {
      const response = await new AccountsService().getAccountBalance({ ip, method, originalUrl },req);
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };
}