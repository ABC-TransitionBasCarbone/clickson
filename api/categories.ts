'use server';

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function getCategories() {
    try {
        const result = await fetch(urlApi + "/emission/categories");
        return await result.json();
    } catch (error) {
        console.error(error);
        return { "error": error };
    }
}

export async function getSubCategories(id: number) {
    try {
        const result = await fetch(urlApi + "/emission/sub-categories/" + id);
        const response = await result.json();

        if (response.data) {
            return response.data;
        }
        console.error("Failed to fetch API");
        return [];
    } catch (error) {
        return error;
    }
}
