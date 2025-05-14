'use server';

import { Comment } from "../src/types/Comment";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


export async function getComments(idSubCategory: string) {
    const response = await fetch(`${urlApi}/comments/${idSubCategory}`);
    return response.json();

}

export async function createComment(comment: Comment) {
    try {
        const response = await fetch(`${urlApi}/comments`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(comment)
        });
        return await response.json();
    } catch (error) {
        throw new Error('Error creating comment : ' + error);
    }
}
