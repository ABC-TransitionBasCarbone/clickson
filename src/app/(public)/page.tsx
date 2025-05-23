'use client'

import { login } from "../../../api/auth";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Container from "@mui/material/Container";
import { Header } from '../../components/login/header';
import { Form } from '../../components/login/form'
import { Footer } from '../../components/login/footer'
import { useTranslations } from 'next-intl'

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [correctUserInfo, setCorrectUserInfo] = useState(true)
    const t = useTranslations('login');
    const [buttonValue, setButtonValue] = useState(t('loginButton'))
    const bValue = t('loginButton');

    useEffect(() => {
        setButtonValue(bValue);
    }, [bValue]);

    const onLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setButtonValue(t('loginPending'))
        const formData = new FormData(event.currentTarget)
        const user = await login(formData)
        if (!user.errors) {
            router.push("/sessions")
        } else {
            setLoading(false);
            setButtonValue(t('login'))
            setCorrectUserInfo(false);
        }
    }

    const goToSignUp = () => {
        router.push("/sign-up");
    }

    return <>
        <Header />
        <Container >
            <Form correctUserInfo={correctUserInfo} onLogin={onLogin} loading={loading} buttonValue={buttonValue} goToSignUp={goToSignUp} />
        </Container >
        <Footer />
    </>
}

