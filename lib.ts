'use server'


import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function login(formData: FormData) {
    // Verify credentials && get the user

  const login = await getCurrentUser(formData.get("username")?.toString() || "", formData.get("password")?.toString() || "")

    if(!login.errors){
        // Create the session
        const expires = new Date(Date.now() + 3600 * 1000);
        let session = "";

        // Save the session in a cookie
        if (formData.get("keepSession")) {
            session = await encrypt({ login });
            cookies().set("session", session, { httpOnly: true });
        } else {
            session = await encrypt({ login, expires });
            cookies().set("session", session, { expires, httpOnly: true });
        }

    }

    return login;
}


export async function getCurrentUser(username: string, password: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": username,
        "password": password
    });

    const requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow"
    } as RequestInit;
    try {
        const result = await fetch(urlApi + "/auth/login", requestOptions)
        const login = await result.json();

        if (!login) {
            console.error("Failed to fetch API");
        }
        return login;
    } catch (error) {
        return error;
    }
}


export async function logout() {
    // Destroy the session
    cookies().set("session", "", {expires: new Date(0)});
}


export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("1 hour")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

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

export async function getCountries() {
    try {
        const response = await fetch(urlApi + "/countries")
        return await response.json();
    } catch (error) {
        console.error(error);
    }
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
