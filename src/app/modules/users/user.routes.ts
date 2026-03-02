import { Router } from "express";
import userController from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../../enum/user";

const router: Router = Router();

router.route("/me").get(auth(USER_ROLE.ADMIN), userController.getMe);

export { router as userRoutes };
