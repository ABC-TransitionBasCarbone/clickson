'use server'


import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const urlApi = process.env.NEXT_PUBLIC_CLICKSON_API_URL;

export async function login(formData: FormData) {
  // Verify credentials && get the user

  const login = await getCurrentUser(formData.get("username")?.toString() || "", formData.get("password")?.toString() || "")

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ login, expires });
  console.log("🚀 ~ login ~ session:", session)

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
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
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  } as RequestInit;

  const result = await fetch(urlApi + "/login", requestOptions)
  const login = await result.json();

  if (login.errors) {
    console.error(login.errors);
    throw new Error("Failed to fetch API");
  }

  return login;
}


export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}


export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
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
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}


