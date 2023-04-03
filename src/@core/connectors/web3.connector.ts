import Web3 from "web3";
import { Transaction } from "web3-core";
import { UniversalsService } from "../common/universals.service";
import { IResponse } from "../common/response";

const ETHEREUM_PROVIDER_WS = process.env.ETHEREUM_PROVIDER_WS || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GAS_LIMIT = process.env.GAS_LIMIT || 21000;
const Web3Connection = new Web3(
  new Web3.providers.WebsocketProvider(ETHEREUM_PROVIDER_WS)
);
const Web3Utils = Web3Connection.utils;

export class Web3ConnectionClass extends UniversalsService {

  public static signTransaction = async (transaction: {
    from: string;
    to: string;
    value: number;
  }): Promise<IResponse> => {
    try {
    const nonce = await Web3Connection.eth.getTransactionCount(transaction.from);

    const gasPrice = await Web3Connection.eth.getGasPrice();

    const tx = {
      from: transaction.from,
      to: transaction.to,
      value: Web3Connection.utils.toWei(transaction.value.toString(), 'ether'),
      nonce,
      gasPrice,
      gasLimit: GAS_LIMIT,
    };

    const signedTx = await Web3Connection.eth.accounts.signTransaction(tx,`${PRIVATE_KEY}`);

    const receipt = await Web3Connection.eth.sendSignedTransaction(signedTx.rawTransaction || "");

    return new Web3ConnectionClass().successResponse("Successful", receipt);
  } catch(error: any) {
    return new Web3ConnectionClass().failureResponse(error.message, error);
  }
  };

  public static getAccountBalance = async (account: string): Promise<IResponse> => {
    try {
      const balance = await Web3Connection.eth.getBalance(account);
      const etherBalance = Web3Utils.fromWei(balance, 'ether');
      return new Web3ConnectionClass().successResponse("Successful", etherBalance);
    } 
    catch(error: any) {
      return new Web3ConnectionClass().failureResponse(error.message, error);
    }
  }

  public static getTransaction = async (txHash: string): Promise<Transaction> => {
    const transaction = await Web3Connection.eth.getTransaction(txHash);
    return transaction;
  }

  public static createAccount = async (): Promise<IResponse> => {
    try {
      const { address, privateKey } = Web3Connection.eth.accounts.create();
      return new Web3ConnectionClass().successResponse("Successful", { address, privateKey });
    } catch (error: any) {
      return new Web3ConnectionClass().failureResponse(error.message, error);
    }
  }
}
