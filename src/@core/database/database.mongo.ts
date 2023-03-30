import mongoose from "mongoose";

const MONGODB_URL_LOCAL = 'mongodb://localhost:27017/ethereum_blockchain';
const MONGODB_URL = process.env.MONGODB_URL || MONGODB_URL_LOCAL;
const { connection } = mongoose;
console.log("MONGODB_URL", process.env);
export const connectMongo = () => {
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
  });
};

connection.on("error", (error: any) => {
  console.log(`MongoDB database connection error: ${error}`);
  throw error;
});

connection.once("open", async function () {
  console.log("MongoDB database connection opened successfully.");
});
