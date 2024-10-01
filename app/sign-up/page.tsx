'use client'

import { Header } from "@/app/components/login/header";
import Container from "@mui/material/Container";
import { SignUpForm } from "@/app/components/signup/signupform";
import { styled } from "@mui/system";
import { Grid, Link, useMediaQuery } from "@mui/material";
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
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const CustomContainer = styled(Grid)(({ theme }) => ({
        position: isSmallScreen ? 'relative' : 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1030,
        backgroundColor: 'white'
    }));


    interface Country {
        country: {
            name_en: string;
            name_fr: string;
            flag: string;
        };
    }

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
                router.push('/groups');
            }, totalTime);

            return () => clearInterval(interval);
        }
    }
    const fetchCountries = async () => {
        const data = await getCountries();
        setCountries(data);
    };

    const onSignUp = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        signUp(formData).then(data => {
            if (data.errors) {
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
            } else {
                login(formData).then(result => {
                    if (!result.errors) {
                        setShowError(false)
                        setShowSuccess(true)
                        setMessage(
                            <span>{t('abc-successfully-created-account')}</span>
                        )
                    }

                })
            }
        });
    }
    useEffect(() => {
        fetchCountries()
        redirectToLogin(showSuccess, message, showError)
    }, [message]);
    return (
        <>
            <div>
                <CustomContainer>
                    <Header logoPosition="flex-start" />
                </CustomContainer>
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
                    message={message} progress={progress} />
            </Container>
        </>
    );

};
