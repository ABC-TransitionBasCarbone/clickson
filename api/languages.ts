'use server';

import { Language } from "@/src/types/Language";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function getLanguages(language_code: string) {
    try {
        const result = await fetch(urlApi + "/languages/" + language_code)
        return await result.json() as Language[]
    } catch (error) {
        throw new Error("Impossible to fetch languages : " + error);
    }
}
