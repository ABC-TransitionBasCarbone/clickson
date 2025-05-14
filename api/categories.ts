'use server';

import { Category } from "@/src/types/Category";
import { SessionCategory } from "@/src/types/SessionCategory";
import { SubCategory } from "@/src/types/SubCategory";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function updateSubCategory(subCategory: Category | SubCategory) {
    const url = urlApi + "/emission/sub-categories"
    const data = JSON.stringify({ ...subCategory, idEmissionCategory: subCategory.idEmissionCategory });

    const requestOptions = {
        method: subCategory.id > 0 ? "PUT" : "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(url, requestOptions)
    const subCategories = await result.json()
    if (subCategories.errors) {
        throw new Error("Failed to update emission/sub-categories")
    }
    return subCategories as Category
}

export async function deleteSC(subCategory: SubCategory) {
    const url = urlApi + "/emission/sub-categories/" + subCategory.id
    const data = JSON.stringify(subCategory);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(url, requestOptions)
    const subCategories = await result.json()
    if (subCategories.errors) {
        throw new Error("Failed to update emission/sub-categories")
    }
    return subCategories as Category
}

export async function updateCategory(category: Category | SubCategory) {
    const url = urlApi + "/emission/categories"
    const data = JSON.stringify(category)

    const requestOptions = {
        method: category.id > 0 ? "PUT" : "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    const result = await fetch(url, requestOptions)
    const categories = await result.json()
    if (categories.errors) {
        throw new Error("Failed to update emission/categories")
    }
    return categories as Category
}

export async function getSubCategories(idLanguage: number) {
    const url = urlApi + "/emission/sub-categories/" + idLanguage
    console.log("getSubCategories", url)
    try {
        const result = await fetch(urlApi + "/emission/sub-categories/" + idLanguage);
        return await result.json() as SubCategory[]
    } catch (error) {
        throw error
    }
}

export async function getCategories(idLanguage: number) {
    const url = urlApi + "/emission/categories/" + idLanguage
    try {
        const result = await fetch(url);
        return await result.json() as Category[]
    } catch (error) {
        throw error
    }
}

export async function getCategory(id: number) {
    const url = urlApi + "/emission/categorie/" + id
    try {
        const result = await fetch(url);
        return await result.json() as Category
    } catch (error) {
        throw error
    }
}

export async function getSessionCategories(idSessionStudent: string, categories: Category[]) {
    const url = urlApi + "/session-categories/" + idSessionStudent
    try {
        const result = await fetch(url);
        let sessionCategories = await result.json() as SessionCategory[];
        sessionCategories = sessionCategories.map((sessionCategory, index) => ({ ...sessionCategory, idEmissionCategory: categories[index].id }))

        return sessionCategories
    } catch (error) {
        throw error
    }
}
