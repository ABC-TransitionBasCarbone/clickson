import { Session } from "./Session";

export interface Group {
    id: string,
    idSchool: string,
    idSession: string,
    name: string,
    year?: number,
    progress?: number,
    archived: boolean,
    deleted: boolean,
    rights: number[],
    sessionStudent: Session,
}
