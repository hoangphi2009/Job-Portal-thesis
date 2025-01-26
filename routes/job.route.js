import express from "express"
import { getAllJobsFromDatabase, deleteAnyJobById, deleteJobById, getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.route("/post").post(isAuthenticated, postJob);
router.route("/post/admin").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/gets").get(isAuthenticated, getAllJobsFromDatabase);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/delete/:id").delete(isAuthenticated, deleteJobById);
router.route("/delete/admin/:id").delete(isAuthenticated, deleteAnyJobById);
export default router;