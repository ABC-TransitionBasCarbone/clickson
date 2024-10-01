'use server';

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function getCategories(id_language: number) {
    try {
        const result = await fetch(urlApi + "/emission/categories/" + id_language);
        return await result.json();
    } catch (error) {
        console.error(error);
        return { "error": error };
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