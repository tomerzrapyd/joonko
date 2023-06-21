import { AppError } from "../models/app-error.model";
import { User } from "../models/user.model";

export class UserUtility {
    private constructor() {}

    static validateUserEmail(email: string): boolean {
        try {
            const joonko_email_regex = new RegExp('[A-Za-z0-9._%+-]+@joonko\.co', 'g');
            const result: boolean = joonko_email_regex.test(email);
            return result;
        } catch (error) {
            return false;
        }
    }

    static validateUserAdmin(user: User): boolean {
        try {
            return user?.isAdmin;
        } catch (error) {
            return false;
        }
    }

    static parseUserFromCookie(cookie_value: string): Partial<User> {
        try {
            const user: Partial<User> = JSON.parse(cookie_value);
            return user;
        } catch(error) {
            throw error;
        }
    }
}