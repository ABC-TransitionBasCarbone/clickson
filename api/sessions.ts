'use server'

import { Session } from "@/app/types/Session";
import { User } from "@/app/types/User";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function getSessionsStudentsByGroup(idGroup: string) {
    try {
        const result = await fetch(urlApi + "/sessions?id_group=" + idGroup)
        const sessions = await result.json()
        if (sessions.errors) {
            console.error("Failed to getSessions " + sessions.errors);
        }
        return sessions as Session[];
    } catch (error) {
        console.error("Failed to getSessions " + error);
        return [];
    }
}

export async function getSessionStudent(id: string) {
    try {
        const result = await fetch(urlApi + "/sessions/" + id)
        const sessions = await result.json()
        if (sessions.errors) {
            console.error("Failed to getSessions " + sessions.errors);
        }
        return sessions[0] as Session;
    } catch (error) {
        throw error
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
        throw ("Failed to delete group")
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
            console.error("Failed to createSession" + sessions.errors);
        }
        return sessions
    } catch (error) {
        console.error("Failed to createSession" + error);
        return []
    }
}

