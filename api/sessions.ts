'use server'

import { Session } from "@/app/types/Session";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


export async function getSessions(idGroup: number) {
    console.log("🚀 ~ getSessions ~ idGroup:", idGroup)
    const result = await fetch(urlApi + "/sessions/" + idGroup)
    const sessions = await result.json()
    console.log("🚀 ~ getSessions ~ sessions:", sessions)
    if (sessions.errors) {
        console.error("Failed to fetch API");
    }
    return sessions as Session[];
}

export async function createSession(sessionName: string, userEmail: string) {
    const data = JSON.stringify({
        "name": sessionName,
        "year": new Date().getFullYear(),
        "teacher_username": userEmail
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(urlApi + "/sessions", requestOptions)
    const sessions = await result.json()
    if (sessions.errors) {
        console.error("Failed to fetch API");
    }
    return sessions
}

