import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const AccountSchema = new Schema(
  {
    address: { type: String, unique: true, dropDups: true },
    name: String
  },
  { timestamps: true }
);

AccountSchema.index({ address: 1 }, { unique: true });

AccountSchema.plugin(mongoosePaginate);

const Account = model("account", AccountSchema);

export default Account;