import express, { Express, RequestHandler } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import version_1 from "./app/routes/version_1";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import logger from "morgan";

dotenv.config();

const app: Express = express();



app.set("trust proxy", true);

const logTime = () => {
  const time = new Date();
  return time.toString().slice(0, 24);
};

const options: RequestHandler[] = [
  cors({
    origin: true,
    credentials: true,
  }),
  cookieParser(),
  logger(function (tokens, req, res) {
    return [
      tokens.method(req, res)?.blue,
      tokens.url(req, res)?.cyan,
      Number(tokens.status(req, res)) === 200
        ? tokens.status(req, res)?.green
        : (tokens.status(req, res)?.red ?? ""),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      "/",
      logTime(),
    ].join(" ");
  }),
  express.json({ limit: "50mb" }),
  express.urlencoded({ extended: true }),
];

app.use(...options);

app.use("/api/v1/", version_1);


app.get("/", (req, res) => {
  res.send("🔥 Server Ready to Serve");
});

app.use(globalErrorHandler);

export default app;
