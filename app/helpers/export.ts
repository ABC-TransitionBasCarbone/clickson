"use client";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL
export async function fetchExportFile() {
    try {
        const response = await fetch(urlApi+'/report/file');
        if (!response.ok) {
            throw new Error(`Failed to fetch the file: ${response.statusText}`);
        }
        return await response.arrayBuffer()
    } catch (error) {
        console.error('Error:', error);
    }
}