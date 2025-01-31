import express from "express";
import { getStockDetails } from "../controllers/stockController.js";

const router = express.Router();

router.get("/stock-details", getStockDetails);

export default router;
