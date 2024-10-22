import express from "express"
import { register, login, logout, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAutthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// router.post("/profile/update", isAuthenticated, updateProfile);
router.route("/proflie/update").post(isAuthenticated, updateProfile);
export default router;