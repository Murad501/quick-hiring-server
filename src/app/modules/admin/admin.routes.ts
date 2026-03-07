import { Router } from "express";
import adminController from "./admin.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../../enum/user";

const router = Router();

router.get("/overview", auth(USER_ROLE.ADMIN), adminController.getOverviewStats);

export const adminRoutes = router;
