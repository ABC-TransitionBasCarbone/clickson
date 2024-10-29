'use server';


const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;


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
        throw(error);
        throw error
    }
}
