import express from "express";
import History from "../models/History.js";
import { getHistory, updateStatus } from "../controllers/history.js";
import { verifyToken } from "../utils/verifyToken.js";
import mongoose from 'mongoose';

const router = express.Router();

// Route to get booking history for a specific user
router.get("/history", getHistory );

// Route to update payment status
router.post("/update-payment-status", updateStatus);

export default router;
