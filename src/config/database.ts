import mongoose from "mongoose";
import looger from "../helpers/logger";

class database {
  constructor() {}

  async mongoConnect(uri: string) {
    try {
      await mongoose.connect(uri as string);
      looger.info("MongoDB connected uri: ".green + uri);
    } catch (err) {
      if (err instanceof Error) {
        looger.error(err.message.red);
      }
    }
  }
}

export default database;
