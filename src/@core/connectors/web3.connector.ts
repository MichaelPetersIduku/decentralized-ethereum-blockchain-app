import Web3 from "web3";
import { Transaction } from "web3-core";

const ETHEREUM_PROVIDER_WS = process.env.ETHEREUM_PROVIDER_WS || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GAS_LIMIT = process.env.GAS_LIMIT || 21000;
const Web3Connection = new Web3(
  new Web3.providers.WebsocketProvider(ETHEREUM_PROVIDER_WS)
);
const Web3Utils = Web3Connection.utils;

export class Web3ConnectionClass {

  public static signTransaction = async (transaction: {
    from: string;
    to: string;
    value: number;
  }): Promise<string> => {
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

    const signedTx = await Web3Connection.eth.accounts.signTransaction(tx,`0x${PRIVATE_KEY}`);

    const receipt = await Web3Connection.eth.sendSignedTransaction(signedTx.rawTransaction || "");

    return receipt.transactionHash;
  };

  public static getAccountBalance = async (account: string): Promise<string> => {
    const balance = await Web3Connection.eth.getBalance(account);
    const etherBalance = Web3Utils.fromWei(balance, 'ether');
    return etherBalance;
  }

  public static getTransaction = async (txHash: string): Promise<Transaction> => {
    const transaction = await Web3Connection.eth.getTransaction(txHash);
    return transaction;
  }

  public static createAccount = async () => {
    const { address, privateKey } = Web3Connection.eth.accounts.create();
    return { address, privateKey };
  }
}
