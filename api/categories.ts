'use server';

import { Category } from "@/app/types/Category";
import { SessionCategory } from "@/app/types/SessionCategory";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function getCategories(idLanguage: number) {
    try {
        const result = await fetch(urlApi + "/emission/categories/" + idLanguage);
        return await result.json() as Category[]
    } catch (error) {
        throw error
    }

}
export async function getSessionCategories(id_session_student: string, idLanguage: number) {
    const categories = await getCategories(idLanguage)

    try {
        const result = await fetch(urlApi + "/session-categories/" + id_session_student);
        let sessionCategories = await result.json() as SessionCategory[];
        sessionCategories = sessionCategories.map((sessionCategory, index) => ({ ...sessionCategory, id_emission_categorie: categories[index].id }))

        return sessionCategories
    } catch (error) {
        throw error
    }
}

export async function getSubCategories(id: number) {
    try {
        const result = await fetch(urlApi + "/emission/sub-categories/" + id);
        return await result.json();
    } catch (error) {
        return error;
    }
}
