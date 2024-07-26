'use client'

import { getSession, login, logout } from "@/lib";
import { FormEvent, useEffect, useState } from "react";
import { redirect } from 'next/navigation'
import {Button} from "@mui/material";

export default function Page() {
  const [session, setSession] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCookies();
  }, [setSession]);

  const fetchCookies = async () => {
    setLoading(true)

    const cookies = await getSession();
    setLoading(false)

    if (!cookies) { return }
    setSession(cookies);
    console.log("🚀 ~ fetchCookies ~ cookies:", cookies)
  }

  const onLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    login(formData);
    fetchCookies();
    console.log("🚀 ~ onLogin ~ dashboard:", "dashboard")

    redirect("dashboard")

  }

  const onLogout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    logout();
    setSession({})
  }
  const onResetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    logout();
    setSession({})
  }

  return (
    loading ?
      (<pre>Chargement</pre>)
      :
      (<section>
        <form onSubmit={onLogin}>
          <input name="username" type="username" defaultValue={"romain.crevecoeur@abc-transitionbascarbone.fr"} />
          <br />
          <input name="password" type="password" defaultValue={"om@XBC4H(hAVyG%s%@AWBVWS"} />
          <br />
          <Button variant="contained" type="submit">Login</Button>
        </form>
        <form onSubmit={onLogout}>
          <button type="submit">Logout</button>
        </form>
        <form onSubmit={onResetPassword}>
          <button type="submit">Reset Password</button>
        </form>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </section>)
  );
}
