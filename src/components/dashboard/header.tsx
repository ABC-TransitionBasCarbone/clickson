import LanguageSwitcher from '@/components/language-switcher/LanguageSwitcher'
import { getUserCookies, logout } from '@/services/auth'
import { User } from '@/types/User'
import { Box, Button, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useState } from 'react'

const BoxHeader = styled(Box)`
  img {
    max-height: 50px;
    padding-left: 15px;
  }
`

const Link = styled('a')`
  text-decoration: none;
`

const UsernameBox = styled('div')(({ theme }) => ({
  a: {
    color: theme.palette.primary.main,
  },
  textAlign: 'right',
  listStyle: 'none',
  marginRight: theme.spacing(1.25),
  p: {
    fontWeight: 'bold',
    fontSize: 12,
    paddingBottom: theme.spacing(1),
  },
  'a:hover': {
    color: theme.palette.secondary.main,
  },
}))

export const Header = () => {
  const t = useTranslations('header')

  const router = useRouter()
  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    fetchUser()
  }, [setUser])

  const fetchUser = async () => {
    const cookies = await getUserCookies()
    if (!cookies) {
      return
    }
    setUser(cookies)
  }
  const onLogout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    logout().then(() => {
      router.push('/')
    })
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid size={3}>
          <Link onClick={() => router.push('/sessions')}>
            <BoxHeader>
              <img src="https://clickson.eu/wp-content/uploads/2021/06/logo-color.png" alt="logo" />
            </BoxHeader>
          </Link>
        </Grid>
        <Grid size={6}>
          <Box sx={{ border: 'none' }}></Box>
        </Grid>
        <Grid size={3}>
          <UsernameBox sx={{ border: 'none' }}>
            <LanguageSwitcher />
            <p>{user?.email}</p>
            {user?.email && (
              <p>
                {t('connectedAs')}: <strong>{user?.role && t(user?.role)}</strong>
              </p>
            )}
            <Link onClick={onLogout}>
              <Button>{t('logout')}</Button>
            </Link>
          </UsernameBox>
        </Grid>
      </Grid>
    </Box>
  )
}
