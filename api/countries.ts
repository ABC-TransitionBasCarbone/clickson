'use server';
const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function getCountries() {
    try {
        const response = await fetch(urlApi + "/countries")
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
