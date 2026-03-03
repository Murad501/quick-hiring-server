import { Router } from "express";
import jobController from "./job.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../../enum/user";

const router = Router();

router.get("/companies", jobController.getCompanies);
router.get("/categories", jobController.getCategories);
router.get("/", jobController.getAllJobs);
router.get("/admin", auth(USER_ROLE.ADMIN), jobController.adminGetAllJobs);
router.get("/:jobId", jobController.getSingleJob);

router.post("/", auth(USER_ROLE.ADMIN), jobController.createJob);
router.patch(
  "/:jobId/status",
  auth(USER_ROLE.ADMIN),
  jobController.updateJobStatus,
);
router.patch("/:jobId", auth(USER_ROLE.ADMIN), jobController.updateJob);
router.delete("/:jobId", auth(USER_ROLE.ADMIN), jobController.deleteJob);

export const jobRoutes = router;
