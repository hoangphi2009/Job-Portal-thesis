import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { registerCV, updatePersonalDetailsCV, updateProfeExpCV, updateEducationCV, updateSkillCV, deleteCV, getAllCVs, getCVById } from "../controllers/cv.controller.js";
const router = express.Router();

router.post("/register", isAuthenticated, registerCV);
router.get("/get/:cvId", isAuthenticated, getCVById);
router.get('/cvs', isAuthenticated, getAllCVs);
router.put("/update/:cvId", isAuthenticated, updatePersonalDetailsCV);
router.put("/updateProfExp/:cvId", isAuthenticated, updateProfeExpCV);
router.put("/updateEdu/:cvId/", isAuthenticated, updateEducationCV)
router.put('/updateSkill/:cvId/', isAuthenticated, updateSkillCV);
router.delete('/delete/:cvId', isAuthenticated, deleteCV);
export default router;