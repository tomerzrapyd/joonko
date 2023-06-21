import { Response, NextFunction} from "express";
import { UserUtility } from "../utilities/user.utility";
import { AppError } from "../models/app-error.model";
import { CustomRequest } from "../models/custom-request";

export const validateUserAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        console.log('validateUserAdmin - start');
        const user = req.user;
        const is_admin: boolean = UserUtility.validateUserAdmin(user);
        if (!is_admin) {
            console.log('validateUserAdmin - User is not admin');
            throw new AppError(403, {status: "not allowed"});
        }
        console.log('validateUserAdmin - User is admin');
        console.log('validateUserAdmin - end');
        next();
    } catch (error: any) {
        res.status(error.errorcode).send(error.payload);
    }
}