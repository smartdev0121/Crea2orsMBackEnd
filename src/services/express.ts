import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import multer from "multer";
import { errorHandler as queryErrorHandler } from "querymen";
import { errorHandler as bodyErrorHandler } from "bodymen";

var upload = multer();

export default (routes) => {
  const app = express();

  //if (process.env.NODE_ENV === "production") {
  app.use(cors());
  //}
  app.use(compression());
  app.use(morgan("dev"));

  // app.use(express.static(`${__dirname}\public`));
  app.use(express.static("public"));

  app.use(bodyParser.json());
  app.use(routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  return app;
};
