import express from "express";
import { getDashboardStats } from "../controllers/summeryController.js";

const router = express.Router();

router.get("/dashboard-stats", getDashboardStats);

export default router;
