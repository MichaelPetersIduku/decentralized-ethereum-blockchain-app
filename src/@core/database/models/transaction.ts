import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const TransactionSchema = new Schema(
  {
    txHash: { type: String, unique: true, dropDups: true },
    from: String,
    to: String,
    value: Number
  },
  { timestamps: true }
);

TransactionSchema.index({ txHash: 1 }, { unique: true });

TransactionSchema.plugin(mongoosePaginate);

const Transaction = model("transaction", TransactionSchema);

export default Transaction;