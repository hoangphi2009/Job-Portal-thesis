import express from "express"
import { registerCompany, getCompany, getCompanyById, updateCompany, deleteCompanyById, getAllCompanies } from "../controllers/company.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get('/companies/all',isAuthenticated, getAllCompanies);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.delete("/delete/:id", isAuthenticated, deleteCompanyById);
export default router;