
import { OPEN_JOBS } from "../../constants/jobs";
import { User } from "../../models/user.model";

export class JobsDBService {
    constructor() {

    }

    public async getUserJobsByDepartment(user: User) {
        try {
            const user_department_jobs = OPEN_JOBS.filter(job => {
                if (user?.departments?.includes(job.department)) {
                    return true;
                }
                return false;
            });
            return user_department_jobs;
        } catch (error) {
            throw error;
        }
    }

    public async getJobById(job_id: number) {
        try {
            const job = OPEN_JOBS.find(job => {
                if (job.id === job_id) {
                    return true;
                }
                return false;
            });
            return job;
        } catch(error) {
            throw error;
        }
    }
}