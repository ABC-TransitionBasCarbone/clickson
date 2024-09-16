'use server';
import { urlApi } from "./lib";

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

export async function getEmissions(id: number) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
        "sub_category_id": id,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/energy/", requestOptions);
        return await result.json();
    } catch (error) {
        console.error(error);
        return { "error": error };
    }
}

export async function addEnergy(formData: FormData) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
        "category_id": formData.get("category_id")?.toString() || "",
        "sub_category_id": formData.get("sub_category_id")?.toString() || "",
        "label": formData.get("label")?.toString() || "",
        "type": formData.get("type")?.toString() || "",
        "value": formData.get("value")?.toString() || "",
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/energy/add", requestOptions);
        return await result.json();
    } catch (error) {
        console.error(error);
        return { "error": error };
    }
}

export async function deleteEnergy(id: any) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
        "id": id
    });

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/energy/delete", requestOptions);
        return await result.json();
    } catch (error) {
        console.error(error);
        return { "error": error };
    }
}

export async function addEnergyComment(formData: FormData) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
        "sub_category_id": formData.get("sub_category_id")?.toString() || "",
        "comment": formData.get("comment")?.toString() || "",
        "created_at": formData.get("created_at")?.toString() || "",
        "craeted_by": formData.get("craeted_by")?.toString() || "",
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/energy/add/comment", requestOptions);
        return await result.json();
    } catch (error) {
        console.error(error);
        return { "error": error };
    }
}
/**
 * Fetch Comments for energy by sub_category_id
 * @param id
 * @returns
 */


export async function getComments(id: number) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
        "sub_category_id": id,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/energy/comments", requestOptions);
        return await result.json();
    } catch (error) {
        console.error(error);
        return { "error": error };
    }
}

export async function getCountries() {
    try {
        const response = await fetch(urlApi + "/countries")
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}