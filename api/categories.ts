'use server';

import { Category } from "@/app/types/Category";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function getCategories(id_language: number) {
    try {
        const result = await fetch(urlApi + "/emission/categories/" + id_language);
        return await result.json() as Category[]
    } catch (error) {
        throw error
    }

}
export async function getSessionCategories(id_session_student: string) {
    console.log("🚀 ~ getSessionCategories ~ id_session_student:", id_session_student)
    try {
        const result = await fetch(urlApi + "/session-categories/" + id_session_student);
        const test =  await result.json() as Category[];
        console.log("🚀 ~ getSessionCategories ~ test:", test)

        return test
        
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
