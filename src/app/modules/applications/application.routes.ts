import { Router } from "express";
import applicationController from "./application.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../../enum/user";
import validateRequest from "../../middleware/validateRequest";
import { ApplicationValidation } from "./application.validation";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.ADMIN),
  applicationController.getAllApplications,
);
router.post(
  "/",
  validateRequest(ApplicationValidation.createApplicationZodSchema),
  applicationController.applyForJob,
);
router.patch(
  "/:applicationId/status",
  auth(USER_ROLE.ADMIN),
  validateRequest(ApplicationValidation.updateApplicationStatusZodSchema),
  applicationController.updateApplicationStatus,
);

export const applicationRoutes = router;
