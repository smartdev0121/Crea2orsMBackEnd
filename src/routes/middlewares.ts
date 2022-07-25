import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User.model";

export const authenticate =
  (roles = []) =>
  (req, res, next) => {
    if (!req.user) {
      res.status(401).send("Authorization required");
    } else {
      next();
    }
  };
