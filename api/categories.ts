'use server';

import { Category } from "@/src/types/Category";
import { SessionCategory } from "@/src/types/SessionCategory";
import { SessionSubCategory } from "@/src/types/SessionSubCategory";
import { SubCategory } from "@/src/types/SubCategory";

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

export async function getSubCategories(id: number) {
    try {
        const result = await fetch(urlApi + "/emission/sub-categories/" + id);
        return await result.json();
    } catch (error) {
        return error;
    }
}

export async function getSubCategoriesWithIdSessionCategory(sessionSubCategories: SessionSubCategory[]) {
    if (sessionSubCategories.length === 0) return []
    const requestOptions = {
        headers: myHeaders,
        method: "POST",
        body: JSON.stringify(sessionSubCategories.map(s => s.idEmissionSubCategory))
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/emission/sub-categories", requestOptions);
        const subCategoryToReturn = await result.json()

        return subCategoryToReturn.map((subCategory: SubCategory) => ({
            ...subCategory,
            idSessionSubCategorie: sessionSubCategories.find(s => s.idEmissionSubCategory === subCategory.id)?.id || ""
        })) as SubCategory[]
    } catch (error) {
        throw (error)
    }
}
