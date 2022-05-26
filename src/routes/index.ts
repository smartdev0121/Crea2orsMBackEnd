import express, { Router } from "express";
import Controllers from "../controllers";
import AdminControllers from "../controllers/Admin";
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

router.post("/cr2_apis/users", Controllers.User.create);
router.post("/cr2_apis/auth/login", Controllers.Auth.login);
router.post("/cr2_apis/auth/forgot_password", Controllers.Auth.forgotPassword);
router.post("/cr2_apis/follow", Controllers.Follow.insert);
router.post("/cr2_apis/unfollow", Controllers.Follow.delete);
router.post("/cr2_apis/search", Controllers.Contract.getSearchAsset);
//===========================admin router===============================//
router.post("/cr2_apis/admin/users", AdminControllers.User.createUser);
router.post("/cr2_apis/admin/auth/login", AdminControllers.User.login);

router.use(jwt);
//===================== users profile pages ====================//

router.get("/cr2_apis/custom/:custom_url", Controllers.User.goProfilePage);
router.get("/cr2_apis/email-verify/:email", Controllers.User.emailVerify);
router.get(
  "/cr2_apis/contract/:contractAddress",
  Controllers.Contract.getContractUri
);
router.post("/cr2_apis/create-nft", Controllers.Contract.createNFT);
router.get("/cr2_apis/get-nft/:nftId", Controllers.Contract.getNFT);
router.get("/cr2_apis/profile/info/:walletAddress", Controllers.Profile.info);
router.get(
  "/cr2_apis/get-user-collections",
  Controllers.Contract.getUserCollections
);
router.get(
  "/cr2_apis/get-all-collections",
  Controllers.Contract.getAllCollections
);
router.post("/cr2_apis/order-finalized", Controllers.Contract.orderFinalized);
router.post("/cr2_apis/new-bid-placed", Controllers.Contract.newBidPlaced);
router.post("/cr2_apis/order-created", Controllers.Contract.orderCreated);
router.get("/cr2_apis/get-orders/:nftId", Controllers.Contract.getOrders);
router.get("/cr2_apis/get-user-nfts", Controllers.Contract.getUserNfts);
router.post("/cr2_apis/cancel-order", Controllers.Contract.cancelOrder);
router.use("/pusher/auth", Controllers.Pusher.auth);

router.post("/cr2_apis/auth/reset_password", Controllers.Auth.resetPassword);
router.post("/cr2_apis/email-verified", Controllers.User.emailVerified);
router.get("/cr2_apis/get-user-info", Controllers.User.getUserInfo);
router.post("/cr2_apis/wallet-connected", Controllers.User.setWalletAddress);
router.post(
  "/cr2_apis/set-user-info",
  upload.single("file_attachment"),
  Controllers.User.setUserInfo
);

router.post(
  "/cr2_apis/background-update",
  upload.single("file_back"),
  Controllers.User.updateProfileBackground
);

router.get("/cr2_apis/get-avatar-url", Controllers.User.getAvatarUrl);
router.post(
  "/cr2_apis/contract-deployed",
  Controllers.Contract.saveContractInformation
);
router.get(
  "/cr2_apis/fetch_homepage/:keyword",
  Controllers.Profile.fetchHomepageContent
);
//===========================admin router===============================//

router.get("/cr2_apis/admin/profile/info", AdminControllers.User.getProfile);
router.post(
  "/cr2_apis/admin/collections",
  AdminControllers.Data.fetchCollectionData
);
router.get("/cr2_apis/admin/categories", AdminControllers.Data.getCategories);
router.post("/cr2_apis/admin/new_category", AdminControllers.Data.newCategory);
router.get(
  "/cr2_apis/admin/delete_category/:id",
  AdminControllers.Data.deleteCategory
);
router.post("/cr2_apis/admin/mode_change", AdminControllers.Data.modeChanged);
export default router;
