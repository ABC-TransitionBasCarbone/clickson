'use client'

import { Header } from "@/src/components/login/header";
import Container from "@mui/material/Container";
import { SignUpForm } from "@/src/components/signup/signupform";
import { Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { login, signUp } from "@/api/auth";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getCountries } from "@/api/countries";

/**
 * Page de création de compte
 * @returns vers le Dashboard
 */
export default function SignUp() {
    const theme = useTheme();
    const router = useRouter();

    const [countries, setCountries] = useState<Country[]>([]);
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState<ReactElement | null>(null);
    const [progress, setProgress] = useState(0);

    const { t } = useTranslation();

    const redirectToLogin = (showSuccess: boolean, message: ReactElement | null, showError: boolean) => {
        if (showSuccess && message && !showError) {
            setProgress(0);
            const totalTime = 3000;
            const intervalTime = 100;

            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += (intervalTime / totalTime) * 100;
                setProgress(currentProgress);

                if (currentProgress >= 100) {
                    clearInterval(interval);
                }
            }, intervalTime);

            setTimeout(() => {
                router.push('/sessions');
            }, totalTime);

            return () => clearInterval(interval);
        }
    }
    const fetchCountries = async () => {
        const data = await getCountries();
        setCountries(data);
    };

    const onSignUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const signedUser = await signUp(formData)

        if (signedUser.errors) {
            setShowError(true)
            setShowSuccess(false)
            setMessage(
                <span>
                    {t('abc-already-exists-account-part-one')}&nbsp;
                    <Link href="/" sx={{
                        color: 'black',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}>{t('abc-already-exists-account-part-two')}
                    </Link>
                    &nbsp;{t('abc-already-exists-account-part-three')}
                </span>
            )
        }
        else {
            const connectedUser = await login(formData)
            if (!connectedUser.errors) {
                setShowError(false)
                setShowSuccess(true)
                setMessage(
                    <span>{t('abc-successfully-created-account')}</span>
                )
            }
        }
    }

    useEffect(() => {
        fetchCountries()
        redirectToLogin(showSuccess, message, showError)
    }, [message]);

    return (
        <>
            <div>
                <Header logoPosition="flex-start" />
            </div>
            <Container maxWidth="xl" sx={{
                marginTop: {
                    lg: theme.spacing(15),
                    sm: theme.spacing(2),
                    xs: theme.spacing(2),
                }
            }}>
                <ArrowBackIosIcon onClick={() => {
                    router.back()
                }} sx={{
                    cursor: 'pointer'
                }} />
                <Divider sx={{ marginTop: theme.spacing(2) }} />
            </Container>
            <Container>
                <SignUpForm onSignUp={onSignUp} countries={countries} showSuccess={showSuccess} showError={showError}
                    message={message} progress={progress} loading={showSuccess} />
            </Container>
        </>
    );

};
