'use server'


import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {User} from "@/app/types/User";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function login(formData: FormData) {
    // Verify credentials && get the user
    const rememberMe = formData.get("rememberMe") !== null;
    const email = formData.get('username') == null ? formData.get("email") : formData.get("username");
    if(email == null || formData.get("password") == null) {
        console.log("invalid credential");
        return {"error": "invalid credential"};
    }
    return await getCurrentUser(
        `${email}`, `${formData.get("password")}`, rememberMe
    );
}


export async function getCurrentUser(username: string, password: string, rememberMe: boolean) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username: username,
        password: password,
        rememberMe: rememberMe,
    });

    console.log("raw: ",raw);
    const requestOptions = {
        headers: myHeaders,
        method: "POST",
        body: raw,
        redirect: "follow"
    } as RequestInit;

    console.log(requestOptions)
    try {
        const result = await fetch(urlApi + "/auth/login", requestOptions)
        const login = await result.json();
        console.log("login: ",login);
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

export async function getSession(): Promise<User | null> {
    const session = cookies().get("user")?.value;

    if (!session) {
        return null; // Return null if no session is found
    }

    try {
        return JSON.parse(session); // Parse the JSON string into an object
    } catch (error) {
        console.error('Error parsing cookies:', error);
        return null; // Handle parse error and return null
    }
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

export async function getCategories() {
    try {
        const result = await fetch(urlApi + "/emission/categories")
        return await result.json();
    } catch (error) {
        console.error(error);
        return {"error" : error}
    }
}

export async function getSubCategories(id: number) {
    try {
        const result = await fetch(urlApi + "/emission/sub-categories/"+id)
        const response = await result.json();

        if (response.data) {
            return response.data
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
        const result = await fetch(urlApi + "/energy/", requestOptions)
        return await result.json();
    } catch (error) {
        console.error(error);
        return {"error" : error}
    }
}

export async function AddEnergy(formData: FormData) {
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
        const result = await fetch(urlApi + "/energy/add", requestOptions)
        return await result.json();
    } catch (error) {
        console.error(error);
        return {"error" : error}
    }
}

export async function DeleteEnergy(id: any) {
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
        const result = await fetch(urlApi + "/energy/delete", requestOptions)
        return await result.json();
    } catch (error) {
        console.error(error);
        return {"error" : error}
    }
}

export async function AddEnergyComment(formData: FormData) {
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
        const result = await fetch(urlApi + "/energy/add/comment", requestOptions)
        return await result.json();
    } catch (error) {
        console.error(error);
        return {"error" : error}
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
        const result = await fetch(urlApi + "/energy/comments", requestOptions)
        return await result.json();
    } catch (error) {
        console.error(error);
        return {"error" : error}
    }
}

export const editSchool = async (formData: FormData, username: string | undefined) => {
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
        return {"error" : error}
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



