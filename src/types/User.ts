import { School } from "./School";

export interface User {
    name: string,
    email: string,
    role: string,
    school: School,
    token: string,
}
