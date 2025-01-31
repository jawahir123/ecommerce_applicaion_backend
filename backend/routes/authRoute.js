
import express from "express";
import {
  deleteUser,
  login,
  getProfile,
  registerUser,
  updateUser,
  getAllUsers,
} from "../controllers/authController.js";
import { adminOnly, protect } from "../middlewares/authMidWare.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/",adminOnly,getAllUsers)
router.get("/profile", protect, getProfile);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
