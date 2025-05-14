'use server'

import { Group } from "../src/types/Group";
import { Session } from "../src/types/Session";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function getGroup(groupId: String): Promise<Group> {
    try {
        const result = await fetch(urlApi + "/groups/" + groupId)
        const group = await result.json()
        return group as Group
    } catch (error) {
        throw ("Failed to get group" + error);
    }
}

export async function deleteGroupInDatabase(group: Group) {
    return updateGroup({
        ...group,
        "deleted": true
    })
}

export async function updateGroup(group: Group) {
    const data = JSON.stringify(group)
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(urlApi + "/groups", requestOptions)
    const groups = await result.json()
    if (groups.errors) {
        throw new Error("Failed to update group")
    }
    return group.id
}

export async function createGroup(groupName: string, session: Session) {
    if (!session.idSchool) {
        throw ("Failed to create group: session.idSchool is null")
    }

    const data = JSON.stringify({
        "name": groupName,
        "year": new Date().getFullYear(),
        "idSchool": session.idSchool,
        "idSessionStudent": session.id
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/groups", requestOptions)
        const group = await result.json()
        if (group.errors) {
            throw ("Failed to create group" + group.errors);
        }
        return group as Group

    } catch (error) {
        throw ("Failed to create group" + error);

    }
}
