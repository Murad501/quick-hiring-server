import { Router } from "express";
import jobController from "./job.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../../enum/user";

const router = Router();

router.get("/", jobController.getAllJobs);
router.get("/:jobId", jobController.getSingleJob);

router.post("/", auth(USER_ROLE.ADMIN), jobController.createJob);
router.delete("/:jobId", auth(USER_ROLE.ADMIN), jobController.deleteJob);

export const jobRoutes = router;
