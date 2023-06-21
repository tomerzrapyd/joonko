import { AppError } from "../models/app-error.model";
import { User } from "../models/user.model";
import { JobsDBService } from "./db/jobs.db.service";
import { UserDBService } from "./db/user.db.service";

export class JobService {
    private job_db_service: JobsDBService;
    constructor() {
        this.job_db_service = new JobsDBService();
    }

    public async getJobById(job_id: number) {
        try {
            const user_job = await this.job_db_service.getJobById(job_id);
            return user_job;
        } catch (error) {
            throw error;
        }
    }
}