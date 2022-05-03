import express, { Router } from "express";
import Controllers from "../controllers";
import jwt from "../services/jwt";
import { storagePath } from "../helpers";
// import * as middlewares from "./middlewares";
// import { userRoles } from "../models/User.model";
const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `images/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] !== "exe") {
    cb(null, true);
  } else {
    cb(new Error("This is executable file!!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
// 2
const router = Router();
router.use(jwt);
console.log("post request");
//===================== users profile pages ====================//
router.get("/custom/:custom_url", Controllers.User.goProfilePage);

router.post("/users", Controllers.User.create);
router.post("/auth/login", Controllers.Auth.login);
router.get("/profile/info", Controllers.Profile.info);
router.use("/pusher/auth", Controllers.Pusher.auth);
router.post("/auth/forgot_password", Controllers.Auth.forgotPassword);

router.post("/auth/reset_password", Controllers.Auth.resetPassword);
router.post("/email-verified", Controllers.User.emailVerified);
router.get("/get-user-info", Controllers.User.getUserInfo);

router.post("/follow", Controllers.Follow.insert);
router.post("/unfollow", Controllers.Follow.delete);
router.post(
  "/set-user-info",
  upload.single("file_attachment"),
  Controllers.User.setUserInfo
);

router.post(
  "/background-update",
  upload.single("file_back"),
  Controllers.User.updateProfileBackground
);

router.get("/get-avatar-url", Controllers.User.getAvatarUrl);
export default router;
