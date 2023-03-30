import mongoose from "mongoose";

const { MONGODB_URL } = process.env;
const { connection } = mongoose;

export const connectMongo = () => {
  // mongoose.connect(MONGODB_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  //   autoIndex: true,
  // });
};

connection.on("error", (error: any) => {
  console.log(`MongoDB database connection error: ${error}`);
  throw error;
});

connection.once("open", async function () {
  console.log("MongoDB database connection opened successfully.");
});
