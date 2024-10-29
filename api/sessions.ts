'use server'

import { Session } from "@/src/types/Session";
import { SessionSubCategory } from "@/src/types/SessionSubCategory";
import { User } from "@/src/types/User";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function getSessionSubCategoriesWithIdSessionCategory(idSessionCategory: string) {
    try {
        const result = await fetch(urlApi + "/session-sub-categories/" + idSessionCategory)
        const sessionsSubCategories = await result.json()
        if (sessionsSubCategories.errors) {
            throw ("Failed to getSessions " + sessionsSubCategories.errors);
        }
        return sessionsSubCategories as SessionSubCategory[];
    } catch (error) {
        throw (error)
    }
}

export async function getSessionsStudentsByGroup(idGroup: string) {
    try {
        const result = await fetch(urlApi + "/sessions?id_group=" + idGroup)
        const sessions = await result.json()
        if (sessions.errors) {
            throw ("Failed to getSessionsStudentsByGroup " + sessions.errors);
        }
        return sessions as Session[];
    } catch (error) {
        throw ("Failed to getSessionsStudentsByGroup " + error)
    }
}

export async function getSessionStudent(id: string) {
    try {
        const result = await fetch(urlApi + "/sessions/" + id)
        const sessions = await result.json()
        if (sessions.errors) {
            throw ("Failed to getSessions " + sessions.errors);
        }
        return sessions[0] as Session;
    } catch (error) {
        throw ("Failed to getSessions " + error)
    }
}

export async function archiveStudentSession(session: Session) {
    session = {
        ...session,
        "archived": true
    }
    const data = JSON.stringify(session)
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(urlApi + "/sessions", requestOptions)
    const groups = await result.json()
    if (groups.errors) {
        throw ("Failed to delete group " + groups.errors)
    }
    return session.id
}

export async function createSession(sessionName: string, user: User, idGroup: string) {
    const data = JSON.stringify({
        "name": sessionName,
        "year": new Date().getFullYear(),
        "id_school": user.school.id,
        "id_group": idGroup,
        "progress": 0
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/sessions", requestOptions)
        const sessions = await result.json()
        if (sessions.errors) {
            throw ("Failed to createSession" + sessions.errors);
        }
        return sessions
    } catch (error) {
        throw ("Failed to createSession " + error)
    }
}

