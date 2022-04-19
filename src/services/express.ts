import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import { errorHandler as queryErrorHandler } from "querymen";
import { errorHandler as bodyErrorHandler } from "bodymen";

export default (routes) => {
  const app = express();

  //if (process.env.NODE_ENV === "production") {
  app.use(cors());
  //}

  app.use(compression());
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  return app;
};
