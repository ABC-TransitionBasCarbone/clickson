import { School } from "./School";

export interface User {
    user_display_name: string,
    user_email: string,
    role: string,
    school: School
}