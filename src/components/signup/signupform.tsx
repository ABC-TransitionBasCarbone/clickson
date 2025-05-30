import theme from '@/app/theme'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTranslations } from 'next-intl'
import { ChangeEvent, FormEventHandler, ReactElement, useState } from 'react'

const BodyGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
}))

const styleForm = {
  width: '100%',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}

const StyledLoadingButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
}))

interface Props {
  showError?: boolean
  showSuccess?: boolean
  onSignUp: FormEventHandler
  loading?: boolean
  buttonValue?: string
  handleChange?: ChangeEvent<HTMLInputElement>
  countries: readonly ['fr', 'gb', 'es', 'it', 'gr', 'hr', 'hu', 'ro']
  message: ReactElement | null
  progress: number | undefined
}

export const SignUpForm = ({ onSignUp, countries, showError, showSuccess, message, progress, loading }: Props) => {
  const t = useTranslations('signup')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }

  const passwordConfirmPasswordEquals = password === confirmPassword

  return (
    <BodyGrid container spacing={5} columns={16}>
      <Grid size={16}>
        {showError && (
          <FormControl
            sx={{
              width: '100%',
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            }}
          >
            <Alert severity="error">{message}</Alert>
          </FormControl>
        )}
        {showSuccess && (
          <FormControl
            sx={{
              width: '100%',
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            }}
          >
            <Alert severity="success">
              {message}
              <div style={{ paddingBottom: '4px' }}></div>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                }}
              />
            </Alert>
          </FormControl>
        )}
        <form onSubmit={onSignUp}>
          <FormControl sx={styleForm}>
            <TextField placeholder={t('firstName')} name="firstName" label={t('firstName')} />
          </FormControl>
          <FormControl sx={styleForm}>
            <TextField placeholder={t('lastName')} type="text" name="lastName" label={t('lastName')} />
          </FormControl>
          <FormControl sx={styleForm}>
            <TextField placeholder={t('email')} label={t('email')} type="email" name="email" required />
          </FormControl>
          <FormControl sx={styleForm}>
            <TextField
              placeholder={t('password')}
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              label={t('password')}
              required
              error={!passwordConfirmPasswordEquals && confirmPassword !== ''}
            />
          </FormControl>
          <FormControl required sx={styleForm}>
            <TextField
              placeholder={t('confirmPassword')}
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              name="confirm-password"
              label={t('confirmPassword')}
              required
              error={!passwordConfirmPasswordEquals && confirmPassword !== ''}
            />
          </FormControl>
          <FormControl>
            {!passwordConfirmPasswordEquals && confirmPassword !== '' && (
              <Typography color="error">{t('passwordMismatch')}</Typography>
            )}
          </FormControl>
          <FormControl sx={styleForm}>
            <Autocomplete
              id="country-select"
              options={countries}
              autoHighlight
              renderOption={(props, code) => {
                const { key, ...optionProps } = props
                return (
                  <Box key={code} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
                    <img loading="lazy" width="20" src={`https://flagcdn.com/h20/${code}.png`} />

                    {code}
                  </Box>
                )
              }}
              renderInput={(params) => <TextField {...params} label={t('country')} name="state" />}
            />
          </FormControl>
          <FormControl sx={styleForm}>
            <TextField placeholder={t('city')} type="text" name="townName" label={t('city')} />
          </FormControl>
          <FormControl sx={styleForm}>
            <TextField placeholder={t('zipCode')} type="text" name="postalCode" label={t('zipCode')} required />
          </FormControl>
          <FormControl sx={styleForm}>
            <TextField required placeholder={t('school')} type="text" name="schoolName" label={t('school')} />
          </FormControl>
          <FormControl
            sx={{
              width: '100%',
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
              '& .MuiLoadingButton-root.Mui-disabled': {
                bgcolor: theme.palette.secondary.main,
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
              {t('signup')}
            </StyledLoadingButton>
          </FormControl>
        </form>
      </Grid>
    </BodyGrid>
  )
}
