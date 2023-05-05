import mongoose from "mongoose";

const { connection } = mongoose;
export const connectMongo = async (url, callback) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
  });
  callback(connection);
};

export class MongooseConnectionType extends mongoose.Connection {}

connection.on("error", (error: any) => {
  console.log(`MongoDB database connection error: ${error}`);
  throw error;
});

connection.once("open", async function () {
  console.log("MongoDB database connection opened successfully.");
});
