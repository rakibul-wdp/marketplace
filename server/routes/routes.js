import express from "express";
import { auctionItem } from "../controllers/auctionController";
import { addItemList, allProduct } from "../controllers/itemController";
import {
  getUser,
  login,
  logout,
  refreshToken,
  signUp,
  verifyToken,
} from "../controllers/userController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

router.post("/additem", addItemList);
router.get("/allitemlist", allProduct);

router.post("/auctionitem", auctionItem);
router.get("/allauctionitem", allAuctionItemem);

export default router;
