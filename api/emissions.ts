'use server';

import { Emission } from "@/src/types/Emission";
import { EmissionFactor } from "@/src/types/EmissionFactor";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function getEmissionFactorsWithUnitsAndTypes(idEmissionSubCategory: number) {
    try {
        const result = await fetch(urlApi + "/emission-factors/" + idEmissionSubCategory);
        if (!result.ok) {
            throw new Error(`API request failed with status ${result.status}: ${result.statusText}`);
        }
        const emissionFactors = await result.json() as EmissionFactor[]
        return emissionFactors.map(emissionFactor =>
            ({ ...emissionFactor, uncertainty: parseFloat(emissionFactor.uncertainty?.toString() || "0") }))
    } catch (error) {
        throw new Error('Error fetching emission factors: ' + error);
    }
}

export async function getEmissionByIdSessionSub(idSessionEmissionSubCategorie: string) {
    try {
        const result = await fetch(urlApi + "/session-emission/" + idSessionEmissionSubCategorie);
        if (!result.ok) {
            throw new Error(`API request failed with status ${result.status}: ${result.statusText}`);
        }
        const emissions = await result.json()

        return emissions.map((emission: any) => ({
            ...emission,
            idEmissionFactor: emission.id_emission_factor,
            idSessionSubCategorie: emission.id_session_emission_sub_categorie,
            value: parseFloat(emission.value)
        })) as Emission[]

    } catch (error) {
        throw new Error('Error fetching emission factors: ' + error);
    }
}

export async function createEmission(emission: Emission) {
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
            idSessionEmissionSubCategorie: emission.idSessionSubCategorie,
            idEmissionFactor: emission.emissionFactor.id,
            value: emission.value
        })
    } as RequestInit;
    try {
        const emissionToReturn = await fetch(urlApi + "/session-emission", requestOptions)
        return await emissionToReturn.json() as Emission
    } catch (error) {
        throw new Error("Impossible to createEmission : " + error);
    }
}
