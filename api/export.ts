"use client";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL

export async function fetchExportFile() {

    try {
        const requestOptions = {
            method: "PUT",
        } as RequestInit;


        const response = await fetch(urlApi + 'report/file', requestOptions);
        if (!response.ok) {
            throw new Error(`Response not OK : ${response.statusText}`);
        }
        return await response.arrayBuffer()
    } catch (error) {
        throw new Error(`Failed to fetch the file : ${error}`);
    }
}
