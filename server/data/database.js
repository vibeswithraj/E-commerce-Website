import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

export const connectMongoDb = () => {
  mongoose
    .connect(process.env.MONGODB_ATLAS_URI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      dbName: "E-commerce",
    })
    .then(() => console.log("connected to mongodb"))
    .catch((error) => console.log("can't connect to mongodb", error));
};
