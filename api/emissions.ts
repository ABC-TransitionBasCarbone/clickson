'use server';

import { Emission } from "../src/types/Emission";
import { Comment } from "../src/types/Comment";
import { Category } from "../src/types/Category";
import { EmissionFactor } from "../src/types/EmissionFactor";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function createEmissionFactor(emissionFactor: EmissionFactor) {
    const data = JSON.stringify(emissionFactor)

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(urlApi + "/emission-factors", requestOptions)
    const emissionFactorData = await result.json()
    if (emissionFactorData.errors) {
        throw new Error("Failed to create EmissionFactor")
    }
    return emissionFactorData as EmissionFactor
}

export async function deleteEmissionFactor(emissionFactor: EmissionFactor) {
    const data = JSON.stringify(emissionFactor)

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(urlApi + "/emission-factors", requestOptions)
    const emissionFactorData = await result.json()
    if (emissionFactorData.errors) {
        throw new Error("Failed to delete EmissionFactor")
    }
    return emissionFactorData as EmissionFactor
}

export async function updateEmissionFactor(emissionFactor: EmissionFactor) {
    const data = JSON.stringify(emissionFactor)

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(urlApi + "/emission-factors", requestOptions)
    const emissionFactorData = await result.json()
    if (emissionFactorData.errors) {
        throw new Error("Failed to update EmissionFactor")
    }
    return emissionFactorData as EmissionFactor
}

export async function getEmissionFactors() {
    try {
        const categories = await fetch(urlApi + "/emission-factors")
        const emissionFactors = await categories.json()
        return emissionFactors as Category[]
    } catch (error) {
        throw new Error("Impossible to getEmissionFactors : " + error);
    }
}

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
