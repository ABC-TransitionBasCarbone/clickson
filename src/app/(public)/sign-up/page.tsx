'use client'

import { Header } from "../../../../src/components/login/header";
import Container from "@mui/material/Container";
import { SignUpForm } from "../../../../src/components/signup/signupform";
import { Button, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { login, signUp } from "../../../../api/auth";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl'

export default function SignUp() {
    const theme = useTheme()
    const router = useRouter()
    const t = useTranslations('signup')

    const [countries, setCountries] = useState<Country[]>([])
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [message, setMessage] = useState<ReactElement | null>(null)
    const [progress, setProgress] = useState(0)

    const redirectToLogin = (showSuccess: boolean, message: ReactElement | null, showError: boolean) => {
        if (showSuccess && message && !showError) {
            setProgress(0)
            const totalTime = 3000
            const intervalTime = 100

            let currentProgress = 0
            const interval = setInterval(() => {
                currentProgress += (intervalTime / totalTime) * 100
                setProgress(currentProgress)

                if (currentProgress >= 100) {
                    clearInterval(interval)
                }
            }, intervalTime)

            setTimeout(() => {
                router.push('/sessions')
            }, totalTime)

            return () => clearInterval(interval)
        }
    }
    const onSignUp = async (event: FormEvent<HTMLFormElement>) => {
        setShowSuccess(false)
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        if (formData.get("password") !== formData.get("passwordConfirm")) {
            setShowError(true)
            setMessage(<span>{t('passwordMismatch')}</span>)
        }
        const signedUser = await signUp(formData)
        if (signedUser.errors) {
            setShowError(true)
            setMessage(
                <span>
                    {t('alreadyExistsAccountPartOne')}&nbsp;
                    <Link href="/" sx={{
                        color: 'black',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}>{t('alreadyExistsAccountPartTwo')}
                    </Link>
                    &nbsp;{t('alreadyExistsAccountPartThree')}
                </span>
            )
        }
        const connectedUser = await login(formData)
        if (!connectedUser.errors) {
            setShowError(false)
            setShowSuccess(true)
            setMessage(
                <span>{t('successfullyCreatedAccount')}</span>
            )
        }
    }

    useEffect(() => {
        redirectToLogin(showSuccess, message, showError)
    }, [message])

    return <>
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
            <Button onClick={() => { router.push('/') }} sx={{ marginBottom: 2 }} variant="outlined" startIcon={<ArrowBackIosIcon />}>
                {t('home')}
            </Button>
            <Divider sx={{ marginTop: theme.spacing(2) }} />
        </Container>
        <Container>
            <SignUpForm onSignUp={onSignUp} countries={countries} showSuccess={showSuccess} showError={showError}
                message={message} progress={progress} loading={showSuccess} />
        </Container>
    </>
}
