'use server'

import { cookies } from "next/headers";
import { getSchool } from "./schools";
import { User } from "../src/types/User";
import { getWordpressUser } from "@/services/auth";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

/**
 * Verify credentials && get the user
 * @param formData 
 * @returns user
 */
export async function login(formData: FormData) {
    const rememberMe = formData.get("rememberMe") !== null;
    const email = (formData.get('username') && formData.get("email"))?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Error("Impossible to login with this user");
    }

    const wordpressUser = await getWordpressUser(email, password, rememberMe)

    if (!wordpressUser) {
        throw new Error("Impossible to login with this user");
    }

    const school = await getSchool(email);
    (await cookies()).set('user', JSON.stringify({ ...wordpressUser, role: "teacher", school: school }))
    return login;
}

export async function logout() {
    (await cookies()).delete('user');
}

export async function getUserCookies() {
    const userCookies = (await cookies()).get("user")?.value;
    if (!userCookies) return {} as User;
    return JSON.parse(userCookies) as User;
}

export async function signUp(formData: FormData) {
    const raw = JSON.stringify({
        "role": "teacher",
        "email": formData.get("email")?.toString() || "",
        "firstName": formData.get("firstName")?.toString() || "",
        "lastName": formData.get("lastName")?.toString() || "",
        "password": formData.get("password")?.toString() || "",
        "state": formData.get("state")?.toString() || "",
        "schoolName": formData.get("schoolName")?.toString() || "",
        "townName": formData.get("townName")?.toString() || "",
        "postalCode": formData.get("postalCode")?.toString() || "",
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/auth/sign-up", requestOptions)
        return await result.json();
    } catch (error) {
        throw new Error("Impossible to create this user : " + error);
    }
}
