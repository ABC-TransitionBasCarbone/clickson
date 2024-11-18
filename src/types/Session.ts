import { Group } from "./Group";
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
    sessionEmissionCategories: SessionCategory[]
}
