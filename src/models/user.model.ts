import { DEPARTMENTS } from "../constants/jobs"
import { IUser } from "../types/user.interface";

export class User implements Partial<IUser> {
    constructor(
        public email: string, 
        public departments: Array<DEPARTMENTS>, 
        public readonly isAdmin: boolean, 
        public password?: string, 
        public lastOperationTime?: number) {}
}