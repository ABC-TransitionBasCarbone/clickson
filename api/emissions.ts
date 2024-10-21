'use server';

import { EmissionFactor } from "@/src/types/EmissionFactor";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function getEmissionFactorsWithUnitsAndTypes(idEmissionSubCategorie: number) {
    try {
        const result = await fetch(urlApi + "/emission-factors/" + idEmissionSubCategorie);
        if (!result.ok) {
            throw new Error(`API request failed with status ${result.status}: ${result.statusText}`);
        }
        return await result.json() as EmissionFactor[]
    } catch (error) {
        console.error('Error fetching emission factors:', error);
        throw error
    }
}
