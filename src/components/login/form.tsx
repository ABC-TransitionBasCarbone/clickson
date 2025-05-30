'use client'

import theme from '@/app/theme'
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FormEventHandler, MouseEventHandler } from 'react'

const resetUrl = process.env.NEXT_PUBLIC_CLICKSON_RESET_PASSWORD_URL

const BodyGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
}))

const styleFormControl = {
  width: { xs: '100%', sm: '100%', md: '35ch', lg: '35ch' },
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),
}

const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  },
}))

const StyledLoadingButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  },
}))

const CustomLink = styled(Link)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}))

interface Props {
  correctUserInfo: boolean
  onLogin: FormEventHandler
  loading: boolean
  buttonValue: string
  goToSignUp: MouseEventHandler
}

export const LoginForm = ({ correctUserInfo, onLogin, loading, buttonValue, goToSignUp }: Props) => {
  const t = useTranslations('login')
  const router = useRouter()

  return (
    <BodyGrid sx={{ marginTop: 2 }} container spacing={5} columns={16}>
      <Grid size={10}>
        <Typography
          variant="h2"
          sx={{
            marginBottom: theme.spacing(3),
            fontSize: {
              xs: 30,
              sm: 30,
              md: 30,
            },
            color: 'primary.main',
          }}
        >
          <strong>Clicks On </strong>
        </Typography>
        <Typography
          variant="h1"
          sx={{
            marginBottom: theme.spacing(3),
            fontSize: {
              xs: 50,
              sm: 50,
              md: 60,
              lg: 80,
            },
            color: 'secondary.main',
            fontWeight: 700,
            textTransform: 'Uppercase',
          }}
        >
          {t('calculator')}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            marginBottom: theme.spacing(3),
            fontSize: {
              xs: 22,
              sm: 30,
              md: 42,
            },
            fontWeight: 500,
          }}
        >
          {t('calculatorSubText')}
        </Typography>
        <p>{t('calculatorSmallText')}</p>
      </Grid>
      <Grid size={6}>
        <Typography variant="h5" sx={{ fontWeight: '700' }}>
          {t('login')}
        </Typography>
        <form onSubmit={onLogin}>
          <FormControl sx={styleFormControl}>
            <OutlinedInput placeholder={t('email')} name="email" />
          </FormControl>
          <FormControl sx={styleFormControl}>
            <OutlinedInput placeholder={t('password')} type="password" name="password" />
          </FormControl>
          <FormControl
            sx={{
              width: { xs: '100%', sm: '100%', md: '35ch', lg: '35ch' },
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
              '& .MuiLoadingButton-root.Mui-disabled': {
                bgcolor: 'black',
                color: 'white',
              },
            }}
          >
            <StyledLoadingButton
              size="large"
              color="primary"
              loading={loading}
              loadingPosition="start"
              variant="contained"
              type="submit"
            >
              {buttonValue}
            </StyledLoadingButton>
          </FormControl>
          {!correctUserInfo && (
            <Alert severity="error" variant="filled" sx={styleFormControl}>
              {t('invalidCredentials')}
            </Alert>
          )}
          <FormControl sx={styleFormControl}>
            <FormControlLabel control={<Checkbox name="rememberMe" />} label={t('rememberMe')} />
          </FormControl>
        </form>
        <Typography>
          {t('forgotPassword')}{' '}
          <Link onClick={() => router.push(resetUrl || '')} underline="none">
            {t('restorePassword')}
          </Link>
        </Typography>
        <FormControl sx={styleFormControl}>
          <StyledButton variant="contained" size="large" onClick={goToSignUp}>
            {t('signup')}
          </StyledButton>
        </FormControl>
      </Grid>
    </BodyGrid>
  )
}
