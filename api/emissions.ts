'use server';


const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

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
