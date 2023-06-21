import {IUser} from "../types/user.interface";
import {DEPARTMENTS} from "./jobs";
export const USERS: IUser[] = [
    {
        email: 'a@joonko.co',
        password: '123456',
        departments: [DEPARTMENTS.RND],
        isAdmin: false
    },
    {
        email: 'b@joonko.co',
        password: '1234567',
        departments: [DEPARTMENTS.MARKETING],
        isAdmin: false
    },
    {
        email: 'c@joonko.co',
        password: '1234578',
        departments: [DEPARTMENTS.PRODUCT],
        isAdmin: false
    },
    {
        email: 'd@joonko.co',
        password: '12345789',
        departments: [DEPARTMENTS.PRODUCT, DEPARTMENTS.MARKETING, DEPARTMENTS.RND],
        isAdmin: true
    }
]