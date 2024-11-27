'use server';

import { Emission } from "@/src/types/Emission";
import { Comment } from "@/src/types/Comment";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function createEmission(emission: Emission) {
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(emission)
    } as RequestInit;
    try {
        const emissionToReturn = await fetch(urlApi + "/session-emission", requestOptions)
        return await emissionToReturn.json() as Emission
    } catch (error) {
        throw new Error("Impossible to createEmission : " + error);
    }
}

export async function deleteEmission(emission: Emission) {
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify(emission)
    } as RequestInit;
    try {
        const emissionToReturn = await fetch(urlApi + "/session-emission", requestOptions)
        return await emissionToReturn.json() as Emission
    } catch (error) {
        throw new Error("Impossible to createEmission : " + error);
    }
}

export async function deleteComment(comment: Comment) {
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify(comment)
    } as RequestInit;
    try {
        const commentToReturn = await fetch(urlApi + "/comments", requestOptions)
        return await commentToReturn.json() as Comment
    } catch (error) {
        throw new Error("Impossible to createEmission : " + error);
    }
}
