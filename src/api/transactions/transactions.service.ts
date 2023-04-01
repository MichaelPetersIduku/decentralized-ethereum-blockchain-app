import Web3 from "web3";
import { IResponse } from "../../@core/common/response";
import { UniversalsService } from "../../@core/common/universals.service";
import { Web3ConnectionClass } from "../../@core/connectors/web3.connector";
import Account from "../../@core/database/models/account";
import Transaction from "../../@core/database/models/transaction";
import { Utils } from "../../util/util";

export class TransactionsService extends UniversalsService {
  public signTransactions = async (meta, req): Promise<IResponse> => {
    const { from, to, value } = req.body;
    try {
      const txHash = await Web3ConnectionClass.signTransaction({
        from,
        to,
        value,
      });

      const dbTx = new Transaction({ from, to, value, txHash });
      const txn = await dbTx.save();

      return this.successResponse("Successful", txn);
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };

  public getTransactions = async (meta, req): Promise<IResponse> => {
    const { from, to, txHash } = req.body;
    try {
      const dbQuery = Utils.cleanObject({ from, to, txHash });
      const dbTransactions = await Transaction.find(dbQuery);

      // Fetch the transactions from the blockchain
      const chainTransactions = await Promise.all(
        dbTransactions.map((dbTx) =>
          Web3ConnectionClass.getTransaction(dbTx.txHash)
        )
      );

      return this.successResponse("Successful", chainTransactions);
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };
}
