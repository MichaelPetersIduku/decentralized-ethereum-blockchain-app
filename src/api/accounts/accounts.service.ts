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
        const response: IResponse = await Web3ConnectionClass.createAccount();
        if (response.status) {
          const { address, privateKey } = response.data;
          const account = await Account.create({ address, privateKey, name: "Test account"})
          return this.successResponse(response.message, account);
        } else {
          return this.failureResponse(response.message, response.data)
        }
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };

  public getAccountBalance = async (meta, req): Promise<IResponse> => {
    const { account } = req.params;
    try {
        const response: IResponse = await Web3ConnectionClass.getAccountBalance(account);
        if (response.status) {
          const balance = response.data;
          return this.successResponse(response.message, { account, balance });
        } else {
          return this.failureResponse(response.message, response.data);
        }
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };
}
