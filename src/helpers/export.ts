"use client";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function fetchExportFile() {
    try {

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
        } as RequestInit;
    
        const response = await fetch(urlApi + '/report/file', requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch the file : ${response.statusText}`);
        }
        return await response.arrayBuffer()
    } catch (error) {
        throw new Error(`Failed to fetch the file : ${error}`);
    }
}
