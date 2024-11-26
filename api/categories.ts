'use server';

import { Category } from "@/src/types/Category";
import { SessionCategory } from "@/src/types/SessionCategory";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function getCategories(idLanguage: number) {
    try {
        const result = await fetch(urlApi + "/emission/categories/" + idLanguage);
        return await result.json() as Category[]
    } catch (error) {
        throw error
    }
}

export async function getSessionCategories(idSessionStudent: string, categories: Category[]) {
    try {
        const result = await fetch(urlApi + "/session-categories/" + idSessionStudent);
        let sessionCategories = await result.json() as SessionCategory[];
        sessionCategories = sessionCategories.map((sessionCategory, index) => ({ ...sessionCategory, idEmissionCategorie: categories[index].id }))

        return sessionCategories
    } catch (error) {
        throw error
    }
}
