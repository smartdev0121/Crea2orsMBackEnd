import http from "http";
import express from "./services/express";
import routes from "./routes";
import config from "./config";
import "./models";

const app = express(routes);
const server = http.createServer(app);

server.listen(config.APP_PORT, () => {
  console.log(
    "Express server listening on %d, in %s mode",
    config.APP_PORT,
    config.ENV
  );
});
