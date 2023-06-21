import {DEPARTMENTS} from "../constants/jobs";

export interface IJob {
    id: number,
    name: string,
    department: DEPARTMENTS;
    location: string;
    description: string;
    requirements: string[];
    applyUrl: string;
}