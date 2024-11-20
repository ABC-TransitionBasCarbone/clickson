"use client"
import {
    Alert,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Link,
    OutlinedInput,
    Typography
} from "@mui/material";
import theme from "@/src/app/theme";
import {styled} from "@mui/system";
import {FormEventHandler, MouseEventHandler} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import {useTranslation} from "react-i18next";

const BodyGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
}));

const StyledButton = styled(Button)(({theme}) => ({
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    }
}));

const StyledLoadingButton = styled(LoadingButton)(({theme}) => ({
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
}));

const CustomLink = styled(Link)(({theme}) => ({
    '&:hover': {
        color: theme.palette.secondary.main
    }
}))

interface Props {
    correctUserInfo: boolean,
    onLogin: FormEventHandler,
    loading: boolean,
    buttonValue: string,
    goToSignUp: MouseEventHandler,
}


export const Form = ({correctUserInfo, onLogin, loading, buttonValue, goToSignUp}: Props) => {
    const {t} = useTranslation();
    return (
        <BodyGrid container spacing={5} columns={16}>
            <Grid item md={10}>
                <Typography variant="h2" sx={{
                    marginBottom: theme.spacing(3),
                    fontSize: {
                        xs: 30,
                        sm: 30,
                        md: 30,
                    },
                    color: "primary.main"
                }}>
                    <strong>
                        Clicks On
                    </strong>
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
                        color: "secondary.main",
                        fontWeight: 700,
                        textTransform: "Uppercase"
                    }}
                >
                    {t('abc-calculator')}
                </Typography>
                <Typography variant="h3" sx={{
                    marginBottom: theme.spacing(3),
                    fontSize: {
                        xs: 22,
                        sm: 30,
                        md: 42,
                    },
                    fontWeight: 500
                }}>
                    {t('abc-calculator-sub-text')}
                </Typography>
                <p>
                    {t('abc-calculator-small-text')}
                </p>
            </Grid>
            <Grid item md={6}>
                <Typography variant="h5" sx={{fontWeight: "700"}}>
                    {t('abc-login')}
                </Typography>
                <form onSubmit={onLogin}>
                    <FormControl
                        sx={{
                            width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                            marginTop: theme.spacing(3),
                            marginBottom: theme.spacing(1)
                        }}>
                        <OutlinedInput placeholder={t('abc-email') + " / " + t('abc-username')}
                                       name="username"
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <OutlinedInput placeholder={t('abc-password')}
                                       type="password"
                                       name="password"
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
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
                            loading={loading}
                            loadingPosition="start"
                            variant="contained"
                            type="submit"
                        >
                            <span>{buttonValue}</span>
                        </StyledLoadingButton>
                    </FormControl>

                    <FormControl
                        sx={{
                            width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <FormControlLabel control={<Checkbox name="rememberMe"/>} label={t('abc-remember-me')}/>
                    </FormControl>
                    {!correctUserInfo && (
                        <FormControl sx={{
                            width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                            <Alert
                                severity="error"
                                variant="filled"
                                sx={{xs: '100%', sm: '100%', md: '35ch', lg: '35ch'}}
                            >
                                Connexion échoué, merci de vérifier votre adresse email ou mot de passe !
                            </Alert>
                        </FormControl>
                    )}
                </form>
                <span>
                    <p>{t('abc-forgot-password')} <CustomLink href="#" underline="none">{t('abc-restore-password')}</CustomLink></p>
                </span>
                <FormControl sx={{
                    width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                    marginTop: theme.spacing(3),
                    marginBottom: theme.spacing(1)
                }}>
                    <StyledButton variant="contained" size="large" onClick={goToSignUp}>{t('abc-signup')}</StyledButton>
                </FormControl>
            </Grid>
        </BodyGrid>
    )
}


