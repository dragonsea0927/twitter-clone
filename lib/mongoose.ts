import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;
export const connectToDatabase = async () => {
  mongoose.set("strict", true);

  if (!process.env.MONGO_URI) {
    return console.error("MONGO_URL is not defined");
  }

  if (isConnected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "twitter",
      autoCreate: true,
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    isConnected = true;
  } catch (error:any) {

    console.log("Error connecting to database",error);
    console.error(error.stack);
  }
};
