'use client'

import { login, logout } from "@/api/auth";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Container from "@mui/material/Container";
import { Header } from '../../components/login/header';
import { Form } from '../../components/login/form'
import { Footer } from '../../components/login/footer'
import { useTranslation } from "react-i18next";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [correctUserInfo, setCorrectUserInfo] = useState(true)
    const { t } = useTranslation();
    const [buttonValue, setButtonValue] = useState(t('abc-login-button'))
    const bValue = t('abc-login-button');

    useEffect(() => {
        setButtonValue(bValue);
    }, [bValue]);

    const onLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setButtonValue(t('abc-login-pending'))
        const formData = new FormData(event.currentTarget)
        const user = await login(formData)
        console.log("🚀 ~ onLogin ~ user:", user)

        if (!user.errors) {
            router.push("/sessions")
        } else {
            setLoading(false);
            setButtonValue(t('abc-login'))
            setCorrectUserInfo(false);
        }
    }

    const goToSignUp = () => {
        router.push("/sign-up");
    }

    const onResetPassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        logout();
    }

    return (
        <>
            <div>
                <Header logoPosition="flex-end" />
            </div>
            <Container>
                <Form correctUserInfo={correctUserInfo} onLogin={onLogin} loading={loading} buttonValue={buttonValue} goToSignUp={goToSignUp} />
            </Container>
            <Footer />
        </>
    );
}

