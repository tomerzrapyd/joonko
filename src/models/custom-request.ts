import { Request } from "express";
import { User } from "./user.model";

interface RequestWithUser extends Request {
    user?: User;
}
export type CustomRequest = RequestWithUser & Request;