import {Request, Response, NextFunction} from "express";
import { UserUtility } from "../utilities/user.utility";
import { UserDBService } from "../services/db/user.db.service";
import { AppError } from "../models/app-error.model";
import { User } from "../models/user.model";
import { CustomRequest } from "../models/custom-request";

export const validateUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        console.log('validateUser - start');
        const cookie = req.cookies['_user_session'];
        if (!cookie) {
            console.log('validateUser - User is unauthorized');
            throw new AppError(401, {status: "unauthorized"});
        }
        const cookie_user = UserUtility.parseUserFromCookie(cookie);
        const user_db_service = new UserDBService();
        const user = await user_db_service.getUserByEmail(cookie_user.email);
        if (!user) {
            console.log('validateUser - User is unauthorized');
            throw new AppError(401, {status: "unauthorized"});
        }
        console.log('validateUser - User is valid');
        console.log('validateUser - end');
        req.user = user;
        next();
    } catch (error: any) {
        res.status(error.errorcode).send(error.payload);
    }
}