'use server';

import { EmissionFactor } from "@/src/types/EmissionFactor";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function getEmissionFactors(idEmissionSubCategorie: string) {
    try {
        const result = await fetch(urlApi + "/emission/categories/" + idEmissionSubCategorie);
        return await result.json() as EmissionFactor[]
    } catch (error) {
        throw error
    }
}

