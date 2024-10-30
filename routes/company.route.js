import express from "express"
import { registerCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, updateCompany);
export default router;