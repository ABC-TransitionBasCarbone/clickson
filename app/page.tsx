'use client'

import {getSession, login, logout} from "@/lib";
import {FormEvent, useEffect, useState} from "react";
import {useRouter} from 'next/navigation'
import {Grid, useMediaQuery} from "@mui/material";
import Container from "@mui/material/Container";
import { styled} from "@mui/system";
import {Header} from './components/login/header';
import {Form} from './components/login/form'
import {Footer} from './components/login/footer'
import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";

export default function Page() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const CustomContainer = styled(Grid)(({theme}) => ({
        position: isSmallScreen ? 'relative' : 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1030,
        backgroundColor: 'white'

    }));
    const router = useRouter();
    const [session, setSession] = useState({})
    const [loading, setLoading] = useState(false)
    const [correctUserInfo, setCorrectUserInfo] = useState(true)
    const {t} = useTranslation();
    const [buttonValue, setButtonValue] = useState(t('abc-login-button'))
    const bValue = t('abc-login-button');

    useEffect(() => {
        setButtonValue(bValue);
    }, [bValue]);

    const onLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setButtonValue(t('abc-login-pending'))
        const formData = new FormData(event.currentTarget)
        login(formData).then(result => {
            if (!result.errors) {
                router.push("/accueil")
            } else {
                setLoading(false)
                setButtonValue("Se Connecter")
                setCorrectUserInfo(false);

            }
        });
    }

    const goToSignUp = () => {
        router.push("/signup");
    }

    const onResetPassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        logout();
        setSession({})
    }

    return (
        <>
            <CustomContainer>
                <Header logoPosition="flex-end"/>
            </CustomContainer>
            <Container>
                <Form correctUserInfo={correctUserInfo} onLogin={onLogin} loading={loading} buttonValue={buttonValue} goToSignUp={goToSignUp}/>
            </Container>
            <Footer/>
        </>
    );
}

