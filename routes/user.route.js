import express from "express";
import {  deleteUserById, getAllRecruiters, getAllStudents, getAllUsers, login, loginByAdmin, logout, register ,registerAdmin,updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
// Route admin
router.route("/login/admin").post(loginByAdmin);
router.route("/register/admin").post(registerAdmin);
router.route("/users").get(isAuthenticated,getAllUsers);
router.route("/students/admin").get(isAuthenticated, getAllStudents);
router.route("/recruiters/admin").get(isAuthenticated, getAllRecruiters);
router.route("/:userId/admin").delete(isAuthenticated, deleteUserById);
export default router;