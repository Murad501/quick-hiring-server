import app from "./app";
import config from "./config";
import database from "./config/database";
import logger from "./helpers/logger";
import colors from "colors";
import http from "http";

colors.enable();

process.on("uncaughtException", (error: Error) => {
  logger.error(`uncaught exception: ${error.message}`.red.bold);
  process.exit(1);
});

const startServer = async () => {
  try {
    // Database connection initialization
    const con = new database();
    await con.mongoConnect(config.mongodb_host as string);

    // Create HTTP server
    const server = http.createServer(app);

    server.listen(config.port, () => {
      logger.info(`🚀 Server is running on port ${config.port}`.blue.bold);
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`❌ Server startup failed: ${error.message}`.red.bold);
    }
    process.exit(1);
  }
};

process.on("unhandledRejection", (error: Error) => {
  logger.error(`unhandled rejection: ${error.message}`.red.bold);
  process.exit(1);
});
startServer();
