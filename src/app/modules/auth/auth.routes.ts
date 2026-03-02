import { Router } from "express";
import authController from "./auth.controller";

const router: Router = Router();

router.post("/login", authController.login);
router.route("/logout").post(authController.logOut);

export { router as authRoutes };
