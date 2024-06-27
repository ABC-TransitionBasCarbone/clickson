// "use server";

import { User } from "@/types/user";

export async function getCurrentUser(username: string, password: string) {
  console.log("🚀 ~ getCurrentUser ~ password:", password)
  console.log("🚀 ~ getCurrentUser ~ username:", username)

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "username": username,
    "password": password
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  } as RequestInit;

  const result = await fetch("https://clickson-tau.vercel.app/login", requestOptions)
  console.log("🚀 ~ getCurrentUser ~ result:", result)
  return {} as User;

}