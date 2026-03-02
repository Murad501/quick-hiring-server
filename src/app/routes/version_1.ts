import { Router } from "express";
import { userRoutes } from "../modules/users/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { jobRoutes } from "../modules/jobs/job.routes";
import { applicationRoutes } from "../modules/applications/application.routes";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/jobs",
    route: jobRoutes,
  },
  {
    path: "/applications",
    route: applicationRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
