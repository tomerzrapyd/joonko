import {Router, Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/user.controller";
import { validateUser } from "../middlewares/validate-user.middleware";
import { validateUserAdmin } from "../middlewares/validate-admin-user.middleware";

const router = Router();
const user_controller = new UserController();
// policies
const internal_route_policy = [validateUser];
const internal_route_admin_policy = [validateUser, validateUserAdmin];
// GET
router.get('/', ...internal_route_admin_policy, user_controller.getUsers.bind(user_controller));

router.get('/job/', ...internal_route_policy, user_controller.getJob.bind(user_controller));

router.get('/jobs', ...internal_route_policy ,user_controller.getJobs.bind(user_controller));

// POST
router.post('/login', user_controller.login.bind(user_controller));

export default router;