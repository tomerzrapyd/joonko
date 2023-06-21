import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserUtility } from "../utilities/user.utility";
import { AppError } from "../models/app-error.model";
import { CustomRequest } from "../models/custom-request";

export class UserController {
    private user_service: UserService;
    constructor() {
        this.user_service = new UserService();
    }
    async getUsers(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const users = await this.user_service.getUsers();
            res.status(200).send({users, status: "success"});
        } catch (error) {
            res.status(500).send({status: 'unexpected error'});
        }
    }

    async getJob(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const job_id_str: string = `${req?.query?.id}`;
            const job_id = parseInt(job_id_str);
            const job = await this.user_service.getUserJob(user, job_id);
            res.status(200).send({job, status: "success"});
        } catch (error: any) {
            res.status(error.errorcode).send(error.payload);
        }
    }

    async getJobs(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const user_jobs = await this.user_service.getUserJobs(user);
            res.status(200).send({jobs: user_jobs, status: "success"})
        } catch (error) {
            res.status(500).send({status: 'unexpected error'});
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;

            const is_valid_email: boolean = UserUtility.validateUserEmail(email);
            if (!is_valid_email) {
                throw new AppError(401, {status: "invalid credentials"});
            }
            await this.user_service.login(email, password);
            res.cookie('_user_session', JSON.stringify({email}), { maxAge: 900000, httpOnly: true });
            res.status(200).send({status: "success"});
        } catch(error: any) {
            res.status(error.errorcode).send(error.payload);
        }
    }
}