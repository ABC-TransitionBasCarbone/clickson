'use server'

import { Session } from "@/src/types/Session";
import { SessionCategory } from "@/src/types/SessionCategory";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function getSessionSubCategoriesWithIdSessionCategory(idSessionCategory: string, idLang: number) {
    try {
        const result = await fetch(urlApi + "/session-sub-categories/" + idSessionCategory + "/" + idLang)
        const sessionsSubCategories = await result.json()
        if (sessionsSubCategories.errors) {
            throw new Error("Failed to getSessions " + sessionsSubCategories.errors);
        }
        return sessionsSubCategories as SessionCategory;
    } catch (error) {
        throw (error)
    }
}

export async function getSessionStudent(id: string) {
    try {
        const result = await fetch(urlApi + "/sessions/" + id)
        const session = await result.json()
        return session as Session;
    } catch (error) {
        throw new Error("Failed to getSessions " + error)
    }
}

export async function getSessionsBySchoolId(idSchool: string) {
    try {
        const result = await fetch(urlApi + "/sessions/school/" + idSchool)
        const sessions = await result.json()
        return sessions as Session[];
    } catch (error) {
        throw new Error("Failed to getSessions " + error)
    }
}

export async function modifySession(session: Session) {
    const data = JSON.stringify(session)
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(urlApi + "/sessions", requestOptions)
    const groups = await result.json()
    if (groups.errors) {
        throw new Error("Failed to delete session " + groups.errors)
    }
    return session.id
}

export async function lockedStudentSession(session: Session) {
    session.locked = !session.locked
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(session)
    } as RequestInit;

    const result = await fetch(urlApi + "/sessions", requestOptions)
    const groups = await result.json()
    if (groups.errors) {
        throw new Error("Failed to delete session " + groups.errors)
    }
    return session
}

export async function lockedSessionCategory(idSessionEmissionCategory: string, locked: boolean) {
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
            id: idSessionEmissionCategory,
            locked
        })
    } as RequestInit;

    const result = await fetch(urlApi + "/session-categories", requestOptions)
    const sessionSubCategory = await result.json()
    if (sessionSubCategory.errors) {
        throw new Error("Failed to lock sub category " + sessionSubCategory.errors)
    }
    return sessionSubCategory
}

export async function createSession(sessionName: string, idSchool: string) {
    const data = JSON.stringify({
        "name": sessionName,
        "year": new Date().getFullYear(),
        "idSchool": idSchool
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/sessions", requestOptions)
        return await result.json()
    } catch (error) {
        throw new Error("Failed to createSession " + error)
    }
}

