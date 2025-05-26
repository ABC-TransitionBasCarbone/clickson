'use client'

import { routing } from '@/i18n/routing'
import { login, signUp } from '@/services/auth'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button, Link } from '@mui/material'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FormEvent, ReactElement, useEffect, useState } from 'react'
import { Header } from '../../../../src/components/login/header'
import { SignUpForm } from '../../../../src/components/signup/signupform'

export default function SignUp() {
  const theme = useTheme()
  const router = useRouter()
  const t = useTranslations('signup')

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
    const email = formData.get('email')
    const password = formData.get('password')
    const passwordConfirm = formData.get('passwordConfirm')

    if (password !== passwordConfirm) {
      setShowError(true)
      setMessage(<span>{t('passwordMismatch')}</span>)
    }
    const signedUser = await signUp(formData)
    if (signedUser.errors) {
      setShowError(true)
      setMessage(
        <span>
          {t('alreadyExistsAccountPartOne')}&nbsp;
          <Link
            href="/"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            {t('alreadyExistsAccountPartTwo')}
          </Link>
          &nbsp;{t('alreadyExistsAccountPartThree')}
        </span>,
      )
    }
    const connectedUser = await login(
      typeof email === 'string' ? email : '',
      typeof password === 'string' ? password : '',
    )
    if (!connectedUser) {
      setShowError(false)
      setShowSuccess(true)
      setMessage(<span>{t('successfullyCreatedAccount')}</span>)
    }
  }

  useEffect(() => {
    redirectToLogin(showSuccess, message, showError)
  }, [message])

  return (
    <>
      <div>
        <Header />
      </div>
      <Container
        maxWidth="xl"
        sx={{
          marginTop: {
            lg: theme.spacing(15),
            sm: theme.spacing(2),
            xs: theme.spacing(2),
          },
        }}
      >
        <Button
          onClick={() => {
            router.push('/')
          }}
          sx={{ marginBottom: 2 }}
          variant="outlined"
          startIcon={<ArrowBackIosIcon />}
        >
          {t('home')}
        </Button>
        <Divider sx={{ marginTop: theme.spacing(2) }} />
      </Container>
      <Container>
        <SignUpForm
          onSignUp={onSignUp}
          countries={routing.locales}
          showSuccess={showSuccess}
          showError={showError}
          message={message}
          progress={progress}
          loading={showSuccess}
        />
      </Container>
    </>
  )
}
