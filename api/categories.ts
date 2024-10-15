'use server';

import { Category } from "@/app/types/Category";
import { SessionCategory } from "@/app/types/SessionCategory";
import { SubCategory } from "@/app/types/SubCategory";

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

export async function getSubCategoriesWithIdSessionCategory(id: string[]) {
    const requestOptions = {
        headers: myHeaders,
        method: "POST",
        body: JSON.stringify([id])
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/emission/sub-categories", requestOptions);
        return await result.json() as SubCategory[]
    } catch (error) {
        throw (error)
    }
}
