import { AppError } from "../models/app-error.model";
import { User } from "../models/user.model";
import { UserDBService } from "./db/user.db.service";
import { JobService } from "./job.service";

export class UserService {
    private user_db_service: UserDBService;
    private job_service: JobService;
    constructor() {
        this.user_db_service = new UserDBService();
        this.job_service = new JobService();
    }

    public async login(email: string, password: string): Promise<User> {
        try {
            const user = this.user_db_service.login(email, password);
            if (!user) {
                throw new AppError(401, {status: "invalid credentials"});
            }
            const parsed_user = new User(user.email, user.departments, user.isAdmin,user.password, user.lastOperationTime);
            return parsed_user;
        } catch(error) {
            throw error;
        }
    }

    public async getUserJobs(user: User) {
        try {
            const user_jobs = await this.user_db_service.getUserJobs(user);
            return user_jobs;
        } catch (error) {
            throw error;
        }
    }

    public async getUserJob(user: User, job_id: number) {
        try {
            const user_jobs_ids = await this.getUserAllowedJobsIDs(user);
            if (!user_jobs_ids.includes(job_id)) {
                throw new AppError(403, {status: "not allowed"});
            }
            const job = await this.job_service.getJobById(job_id);
            if (!job) {
                throw new AppError(400, {status: "job id does not exist"}); 
            }
            return job;
        } catch (error) {
            throw error;
        }
    }

    public async getUserAllowedJobsIDs(user: User) {
        try {
            const user_jobs = await this.getUserJobs(user);
            const user_jobs_ids = user_jobs.map(job => job.id); 
            return user_jobs_ids;
        } catch (error) {
            throw error;
        }
    }

    public async getUsers() {
        try {
            const users = await this.user_db_service.getUsers();
            return users;
        } catch(error) {
            throw error;
        }
    }
}