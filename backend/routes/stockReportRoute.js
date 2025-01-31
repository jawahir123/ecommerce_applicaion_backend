import express from "express";
import { getStockReport } from "../controllers/stockReportConrtoller.js";

const router = express.Router();

router.get("/reports/stock", getStockReport);

export default router;