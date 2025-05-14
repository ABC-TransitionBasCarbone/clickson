'use server'

import { School } from "@/src/types/School";
import { getUserCookies } from "./auth";
import { cookies } from "next/headers";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function getSchoolById(id: string) {
    try {
        const result = await fetch(urlApi + "/school?id=" + id)
        const school = await result.json();
        return school as School;
    } catch (error) {
        throw new Error("Failed to getSchool : " + error);

    }
}

export async function getSchool(adminEmail: string) {
    try {
        const result = await fetch(urlApi + "/school/" + adminEmail)
        const school = await result.json();
        return school as School;
    } catch (error) {
        throw new Error("Failed to getSchool : " + error);

    }
}

export async function editSchool(formData: FormData, school: School | undefined | null) {
    school = {
        ...school,
        "name": formData.get("name")?.toString(),
        "studentCount": Number(formData.get("studentCount")),
        "staffCount": Number(formData.get("staffCount")),
        "establishmentYear": Number(formData.get("establishmentYear")),
        "adress": formData.get("adress")?.toString()
    }
    const data = JSON.stringify(school)
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: data
    } as RequestInit;

    try {
        await fetch(urlApi + "/school", requestOptions)

        const userSession = await getUserCookies();
        (await cookies()).set('user', JSON.stringify({ ...userSession, school: school }))
        return school;
    } catch (error) {
        throw new Error("Failed to editSchool : " + error);
    }
}

