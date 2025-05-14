'use server'

import { cookies } from "next/headers";
import { getSchool } from "./schools";
import { User } from "@/src/types/User";

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
    const email = formData.get('username') == null ? formData.get("email") : formData.get("username");
    const raw = JSON.stringify({
        username: email,
        password: `${formData.get("password")}`,
        rememberMe: rememberMe,
    });
    const requestOptions = {
        headers: myHeaders,
        method: "POST",
        body: raw
    } as RequestInit;

    const result = await fetch(urlApi + "/auth/login", requestOptions)
    const login = await result.json();
    if (login.errors) {
        console.error(new Error(login.errors + " Failed to login wrong password or email"))
        return login
    }
    const school = await getSchool(login.email);
    (await cookies()).set('user', JSON.stringify({ ...login, role: "teacher", school: school }))
    return login;
}

/**
 * Destroy the session
 */
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
