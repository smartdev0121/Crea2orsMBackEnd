import jwt from "jsonwebtoken";
import config from "../config";

export default (req, res, next) => {
  let token: any;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (token) {
    try {
      req.user = jwt.verify(token, config.APP_SECRET);
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  }

  next();
};
