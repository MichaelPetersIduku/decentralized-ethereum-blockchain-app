import { IResponse } from "../../@core/common/response";
import { UniversalsService } from "../../@core/common/universals.service";
import { Web3ConnectionClass } from "../../@core/connectors/web3.connector";
import Account from "../../@core/database/models/account";

export class AccountsService extends UniversalsService {
  public getAccounts = async (meta, req): Promise<IResponse> => {
    try {
      const accounts = await Account.find();
      return this.successResponse("Successful", accounts);
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };

  public createAccount = async (meta, req): Promise<IResponse> => {
    try {
        
      return this.successResponse("Successful", accounts);
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };

  public getAccountBalance = async (meta, req): Promise<IResponse> => {
    const { account } = req.params;
    try {
        const balance = await Web3ConnectionClass.getAccountBalance(account);

      return this.successResponse("Successful", { account, balance });
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };
}
