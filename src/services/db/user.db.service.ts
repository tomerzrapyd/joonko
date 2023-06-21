import { USERS } from "../../constants/users";
import { User } from "../../models/user.model";
import { JobsDBService } from "./jobs.db.service";

export class UserDBService {
    private jobs_db_service: JobsDBService
    constructor() {
        this.jobs_db_service = new JobsDBService();
    }

    login(email: string, password: string) {
        try {
            const user = USERS.find(user => {
                if (user.email === email && user.password === password) {
                    return true;
                }
                return false;
            });
            return user;
        } catch(error) {
            throw error;
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = USERS.find(user => {
                if (user.email === email) {
                    return true;
                }
                return false;
            });
            const {password, ...user_without_password} = user
            return user_without_password;
        } catch(error) {
            throw error;
        }
    }

    async getUsers() {
        try {
            return USERS.map(user => {
                const {password, ...user_without_password} = user;
                return user_without_password;
            });
        } catch(error) {
            throw error;
        }
    }

    public async getUserJobs(user: User) {
        try {
            const jobs = await this.jobs_db_service.getUserJobsByDepartment(user);
            return jobs;
        } catch (error) {
            throw error;
        }
    }
}