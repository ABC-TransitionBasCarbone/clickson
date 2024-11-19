'use server';

import { Emission } from "@/src/types/Emission";

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
