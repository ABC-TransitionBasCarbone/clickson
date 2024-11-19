'use client'

import { login, logout } from "@/api/auth";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Container from "@mui/material/Container";
import { Header } from '../../components/login/header';
import { Form } from '../../components/login/form'
import { Footer } from '../../components/login/footer'
import { useTranslation } from "react-i18next";
import { getLanguages } from "@/api/languages";
import { Language } from "@/src/types/Language";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [correctUserInfo, setCorrectUserInfo] = useState(true)
    const { t } = useTranslation();
    const [buttonValue, setButtonValue] = useState(t('abc-login-button'))
    const bValue = t('abc-login-button');

    const [languages, setLanguages] = useState<Language[]>([])
    const test = async () => {
        const lang = await getLanguages("fr")
        console.log("🚀 ~ test ~ lang:", lang)
        setLanguages(lang)
    }

    useEffect(() => {
        setButtonValue(bValue);
        test()
    }, [bValue]);

    const onLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setButtonValue(t('abc-login-pending'))
        const formData = new FormData(event.currentTarget)
        login(formData).then(result => {
            if (!result.errors) {
                router.push("/sessions")
            } else {
                setLoading(false);
                setButtonValue(t('abc-login'))
                setCorrectUserInfo(false);
            }
        });
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
                {languages.map((lang) => { return <div key={lang.code}>{lang.name}</div> })}
                <Header logoPosition="flex-end" />
            </div>
            <Container>
                <Form correctUserInfo={correctUserInfo} onLogin={onLogin} loading={loading} buttonValue={buttonValue} goToSignUp={goToSignUp} />
            </Container>
            <Footer />
        </>
    );
}

