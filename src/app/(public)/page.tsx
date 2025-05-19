'use client'

import { login } from '@/services/auth'
import Container from '@mui/material/Container'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { Footer } from '../../components/login/footer'
import { LoginForm } from '../../components/login/form'
import { Header } from '../../components/login/header'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [correctUserInfo, setCorrectUserInfo] = useState(true)
  const t = useTranslations('login')
  const [buttonValue, setButtonValue] = useState(t('loginButton'))
  const bValue = t('loginButton')

  useEffect(() => {
    setButtonValue(bValue)
  }, [bValue])

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setButtonValue(t('loginPending'))
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string | null
    const password = formData.get('password') as string | null

    if (!email || !password) {
      setLoading(false)
      setButtonValue(t('login'))
      setCorrectUserInfo(false)
      return
    }

    const user = await login(email, password)

    if (!user?.email) {
      setLoading(false)
      setButtonValue(t('login'))
      setCorrectUserInfo(false)
      return
    }
    router.push('/sessions')
  }

  const goToSignUp = () => {
    router.push('/sign-up')
  }

  return (
    <>
      <Header />
      <Container>
        <LoginForm
          correctUserInfo={correctUserInfo}
          onLogin={onLogin}
          loading={loading}
          buttonValue={buttonValue}
          goToSignUp={goToSignUp}
        />
      </Container>
      <Footer />
    </>
  )
}
