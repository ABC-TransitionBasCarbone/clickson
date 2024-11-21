import { Group } from "./Group";
import { School } from "./School";
import { SessionCategory } from "./SessionCategory";

export interface Session {
    id: string,
    idSchool?: string,
    name?: string,
    year: number,
    archived?: boolean,
    deleted?: boolean,
    locked?: boolean,
    groups?: Group[]
    school: School,
    sessionEmissionCategories: SessionCategory[]
}
