'use server'

import { Group } from "@/src/types/Group";


const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


export async function getGroups(adminEmail: string) {
    const result = await fetch(urlApi + "/groups/" + adminEmail)
    const groups = await result.json()
    if (groups.errors) {
        console.error("Failed to fetch API");
    }
    return groups as Group[];
}

export async function deleteGroup(group: Group) {
    group = {
        ...group,
        "deleted": true
    }
    const data = JSON.stringify(group)
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(urlApi + "/groups", requestOptions)
    const groups = await result.json()
    if (groups.errors) {
        throw ("Failed to delete group")
    }
    return group.id
}

export async function createGroup(groupName: string, userEmail: string, idSchool: string) {
    const data = JSON.stringify({
        "name": groupName,
        "year": new Date().getFullYear(),
        "teacher_username": userEmail,
        "id_school": idSchool
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/groups", requestOptions)
        const groups = await result.json()
        if (groups.errors) {
            console.error("Failed to create group" + groups.errors);
        }
        return groups

    } catch (error) {
        console.error("Failed to create group" + error);

    }
}
