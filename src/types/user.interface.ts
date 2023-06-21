import {DEPARTMENTS} from "../constants/jobs";

export interface IUser {
    email: string;
    password: string;
    departments: DEPARTMENTS[];
    isAdmin: boolean;
    lastOperationTime?: number;
}