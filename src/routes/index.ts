import express, { Router } from "express";
import Controllers from "../controllers";
import jwt from "../services/jwt";
import { storagePath } from "../helpers";
// import * as middlewares from "./middlewares";
// import { userRoles } from "../models/User.model";
import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `images/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req: any, file: any, cb: any) => {
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

router.post("/users", Controllers.User.create);
router.post("/auth/login", Controllers.Auth.login);
router.post("/auth/forgot_password", Controllers.Auth.forgotPassword);
router.post("/follow", Controllers.Follow.insert);
router.post("/unfollow", Controllers.Follow.delete);

router.use(jwt);
//===================== users profile pages ====================//
router.get("/custom/:custom_url", Controllers.User.goProfilePage);
router.get("/contract/:contractAddress", Controllers.Contract.getContractUri);
router.post("/create-nft", Controllers.Contract.createNFT);
router.get("/get-nft/:nftId", Controllers.Contract.getNFT);
router.get("/profile/info", Controllers.Profile.info);
router.get("/get-user-collections", Controllers.Contract.getUserCollections);
router.get("/get-all-collections", Controllers.Contract.getAllCollections);
router.post("/order-finalized", Controllers.Contract.orderFinalized);
router.post("/new-bid-placed", Controllers.Contract.newBidPlaced);
router.post("/order-created", Controllers.Contract.orderCreated);
router.get("/get-orders/:nftId", Controllers.Contract.getOrders);
router.post("/cancel-order", Controllers.Contract.cancelOrder);
router.use("/pusher/auth", Controllers.Pusher.auth);

router.post("/auth/reset_password", Controllers.Auth.resetPassword);
router.post("/email-verified", Controllers.User.emailVerified);
router.get("/get-user-info", Controllers.User.getUserInfo);
router.post("/wallet-connected", Controllers.User.setWalletAddress);

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
router.post("/contract-deployed", Controllers.Contract.saveContractInformation);

export default router;
