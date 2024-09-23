'use server'

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const secretKey = process.env.SECRET_KEY;

const key = new TextEncoder().encode(secretKey);

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function login(formData: FormData) {
    // Verify credentials && get the user
    const rememberMe = formData.get("rememberMe") !== null;
    const email = formData.get('username') == null ? formData.get("email") : formData.get("username");
    if (email == null || formData.get("password") == null) {
        return { "error": "invalid credential" };
    }
    return getCurrentUser(`${email}`, `${formData.get("password")}`, rememberMe);
}


export async function getCurrentUser(username: string, password: string, rememberMe: boolean) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username: username,
        password: password,
        rememberMe: rememberMe,
    });

    const requestOptions = {
        headers: myHeaders,
        method: "POST",
        body: raw,
        redirect: "follow"
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/auth/login", requestOptions)
        const login = await result.json();
        if (login.errors) {
            console.error("Failed to fetch API");
            return login;
        }
        cookies().set('user', JSON.stringify(login))
        return login;
    } catch (error) {
        return error;
    }
}


export async function logout() {
    // Destroy the session
    cookies().delete('user');
}


export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1 hour")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession() {
    const session = cookies().get("user")?.value;
    if (!session) return {};
    return JSON.parse(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return {};

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 3600 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,

        expires: parsed.expires,
    });
    return res;
}


export async function signUp(formData: FormData) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": formData.get("email")?.toString() || "",
        "username": formData.get("email")?.toString() || "",
        "first_name": formData.get("first_name")?.toString() || "",
        "last_name": formData.get("last_name")?.toString() || "",
        "password": formData.get("password")?.toString() || "",
        "confirm-password": formData.get("confirm-password")?.toString() || "",
        "state": formData.get("state")?.toString() || "",
        "school": formData.get("school")?.toString() || "",
        "city": formData.get("city")?.toString() || "",
        "zip_code": formData.get("zip_code")?.toString() || "",
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
        console.error(error);
    }
}

export async function getAuthenticatedUserData(username: string | undefined) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
        "username": username
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/auth/current", requestOptions)
        const response = await result.json();
        if (response) {
            return response
        }
        console.error("Failed to fetch API");
        return [];
    } catch (error) {
        return error;
    }
}

export async function editSchool(formData: FormData, username: string | undefined) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
        "username": username,
        "acf": {
            "school": formData.get("school")?.toString() || "",
            "number_of_students": formData.get("number_of_students")?.toString() || "",
            "number_of_staff": formData.get("number_of_staff")?.toString() || "",
            "construction_year": formData.get("construction_year")?.toString() || "",
            "school_address": formData.get("school_address")?.toString() || ""
        }
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    } as RequestInit;

    try {
        const result = await fetch(urlApi + "/auth/modify-user", requestOptions)
        return await result.json();
    } catch (error) {
        console.error(error);
        return { "error": error }
    }
}
