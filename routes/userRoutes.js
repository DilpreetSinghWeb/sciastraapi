import express from "express";
import { submitDetails, verifyOtp } from "../controllers/userController.js";

const router = express.Router();
router.post("/submit-details", submitDetails);
router.post("/verify-otp", verifyOtp);

export default router;
