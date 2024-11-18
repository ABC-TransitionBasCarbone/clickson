import {
    Alert, Box,
    CircularProgress,
    FormControl,
    Grid, LinearProgress,
    TextField, Typography
} from "@mui/material";
import theme from "@/src/app/theme";
import { styled } from "@mui/system";
import { ChangeEvent, FormEventHandler, ReactElement, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { Autocomplete } from "@mui/material";
import { useTranslation } from "react-i18next";

const BodyGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
}));

interface Props {
    showError?: boolean,
    showSuccess?: boolean,
    onSignUp: FormEventHandler,
    loading?: boolean,
    buttonValue?: string,
    handleChange?: ChangeEvent<HTMLInputElement>,
    countries: Country[],
    message: ReactElement | null,
    progress: number | undefined,
}

export const SignUpForm = ({ onSignUp, countries, showError, showSuccess, message, progress }: Props) => {
    const { t } = useTranslation();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const passwordConfirmPasswordEquals = password === confirmPassword;
    return (
        <BodyGrid container spacing={5} columns={16}>
            <Grid item md={16}>
                {showError && (
                    <FormControl sx={{
                        width: '100%',
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1)
                    }}>
                        <Alert severity="error">
                            {message}
                        </Alert>
                    </FormControl>
                )}
                {showSuccess && (
                    <FormControl sx={{
                        width: '100%',
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1)
                    }}>
                        <Alert severity="success">
                            {message}
                            <div style={{ paddingBottom: '4px' }}></div>
                            <LinearProgress variant="determinate" value={progress} sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                borderBottomLeftRadius: 4,
                                borderBottomRightRadius: 4
                            }} />
                        </Alert>
                    </FormControl>
                )}
                <form onSubmit={onSignUp}>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(3),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder={t('abc-first-name')}
                            name="firstName"
                            label={t('abc-first-name')}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder={t('abc-last-name')}
                            type="text"
                            name="lastName"
                            label={t('abc-last-name')}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder={t('abc-email')}
                            type="email"
                            name="email"
                            label={t('abc-email')}

                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder={t('abc-password')}
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            label={t('abc-password')}
                            error={!passwordConfirmPasswordEquals && confirmPassword !== ''}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder={t('abc-confirm-password')}
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            name="confirm-password"
                            label={t('abc-confirm-password')}
                            error={!passwordConfirmPasswordEquals && confirmPassword !== ''}
                        />
                    </FormControl>
                    <FormControl>
                        {!passwordConfirmPasswordEquals && confirmPassword !== '' && (
                            <Typography color="error">
                                {t('abc-password-mismatch')}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <Autocomplete
                            id="country-select"
                            options={countries}
                            autoHighlight
                            getOptionLabel={(country) => country.nameFr}
                            renderOption={(props, country) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="20"
                                            srcSet={country.flag}
                                            src={country.flag}
                                            alt={country.nameFr}
                                        />
                                        {country.nameFr}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t('abc-country')}
                                    name="state"
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder={t('abc-city')}
                            type="text"
                            name="townName"
                            label={t('abc-city')}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder={t('abc-zip-code')}
                            type="text"
                            name="postalCode"
                            label={t('abc-zip-code')}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder={t('abc-school')}
                            type="text"
                            name="schoolName"
                            label={t('abc-school')}
                        />
                    </FormControl>
                    {(progress && (progress < 50)) ? <CircularProgress /> : <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1),
                            '& .MuiLoadingButton-root.Mui-disabled': {
                                bgcolor: theme.palette.secondary.main,
                                color: 'white',
                            }
                        }}>
                        <StyledLoadingButton
                            size="large"
                            color="primary"
                            loading={false}
                            loadingPosition="start"
                            variant="contained"
                            type="submit"
                        >
                            <span>{t('abc-signup')}</span>
                        </StyledLoadingButton>
                    </FormControl>
                    }

                </form>
            </Grid>
        </BodyGrid>
    )
}
