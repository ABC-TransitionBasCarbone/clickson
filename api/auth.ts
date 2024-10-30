'use server'

import { cookies } from "next/headers";
import { getSchool } from "./schools";

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
    if (email == null || formData.get("password") == null) {
        return { "error": "invalid credential" };
    }
    return getCurrentUser(`${email}`, `${formData.get("password")}`, rememberMe);
}

export async function getCurrentUser(username: string, password: string, rememberMe: boolean) {
    const raw = JSON.stringify({
        username: username,
        password: password,
        rememberMe: rememberMe,
    });

    const requestOptions = {
        headers: myHeaders,
        method: "POST",
        body: raw
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/auth/login", requestOptions)
        const login = await result.json();
        if (login.errors) {
            throw("Failed to fetch API");
            return login;
        }
        const school = await getSchool(login.user_email)
        cookies().set('user', JSON.stringify({ ...login, role: "teacher", school: school }))
        return login;
    } catch (error) {
        return error;
    }
}

/**
 * Destroy the session
 */
export async function logout() {
    cookies().delete('user');
}

export async function getUserCookies() {
    const userCookies = cookies().get("user")?.value;
    if (!userCookies) return {};
    return JSON.parse(userCookies);
}

export async function signUp(formData: FormData) {
    const raw = JSON.stringify({
        "role": "teacher",
        "email": formData.get("email")?.toString() || "",
        "first_name": formData.get("first_name")?.toString() || "",
        "last_name": formData.get("last_name")?.toString() || "",
        "password": formData.get("password")?.toString() || "",
        "state": formData.get("state")?.toString() || "",
        "school_name": formData.get("school")?.toString() || "",
        "town_name": formData.get("city")?.toString() || "",
        "postal_code": formData.get("zip_code")?.toString() || "",
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    } as RequestInit;
    console.log("🚀 ~ signUp ~ requestOptions:", requestOptions)
    try {
        const result = await fetch(urlApi + "/auth/sign-up", requestOptions)
        return await result.json();
    } catch (error) {
        throw(error);
    }
}

export async function getAuthenticatedUserData(username: string) {
    const data = JSON.stringify({
        "username": username
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/auth/current", requestOptions)
        const response = await result.json();
        if (response) {
            return response
        }
        throw("Failed to fetch API");
    } catch (error) {
        return error;
    }
}
