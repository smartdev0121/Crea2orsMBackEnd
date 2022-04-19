import express, { Router } from "express";
import Controllers from "../controllers";
import jwt from "../services/jwt";
import { storagePath } from "../helpers";
// import * as middlewares from "./middlewares";
// import { userRoles } from "../models/User.model";

const router = Router();
router.use(jwt);
console.log("post request");
router.post("/users", Controllers.User.create);
router.post("/auth/login", Controllers.Auth.login);
router.get("/profile/info", Controllers.Profile.info);
router.use("/pusher/auth", Controllers.Pusher.auth);
router.post("/auth/forgot_password", Controllers.Auth.forgotPassword);
export default router;
