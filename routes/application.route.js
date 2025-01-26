import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getAllApplicantsByAdmin, getApplicants, getAppliedByAdmin, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applyJob);
router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/gets", isAuthenticated, getAllApplicantsByAdmin);
router.get("/gets/admin/applied", isAuthenticated, getAppliedByAdmin);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
export default router;