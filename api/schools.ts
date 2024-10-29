'use server'

import { School } from "@/src/types/School";
import { getUserCookies } from "./auth";
import { cookies } from "next/headers";

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function getSchool(adminEmail: string) {
    try {
        const result = await fetch(urlApi + "/school/" + adminEmail)
        const school = await result.json();
        if (school.errors) {
            console.error("Failed to getSchool" + school.errors);
        }
        return school as School;
    } catch (error) {
        console.error("Failed to getSchool" + error);

    }
}

export async function editSchool(formData: FormData, school: School | undefined | null) {
    school = {
        ...school,
        "name": formData.get("name")?.toString(),
        "student_count": Number(formData.get("student_count")),
        "staff_count": Number(formData.get("staff_count")),
        "establishment_year": Number(formData.get("establishment_year")),
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
        
        const userSession = await getUserCookies()
        cookies().set('user', JSON.stringify({ ...userSession, school: school }))

        return school;
    } catch (error) {
        console.error(error);
        return school
    }
}

