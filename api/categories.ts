'use server';

import { Category } from "@/app/types/Category";
import { SessionCategory } from "@/app/types/SessionCategory";

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
    try {
        const result = await fetch(urlApi + "/session-categories/" + id_session_student);
        return  await result.json() as SessionCategory[];        
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
