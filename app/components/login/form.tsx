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
import theme from "@/app/theme";
import {styled} from "@mui/system";
import {FormEventHandler} from "react";
import LoadingButton from '@mui/lab/LoadingButton';

const BodyGrid = styled(Grid)(({theme}) => ({
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
}

export const Form = ({correctUserInfo, onLogin, loading, buttonValue}: Props) =>
    (
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
                        color: "secondary.main"
                    }}
                >
                    <strong>
                        CALCULATEUR
                    </strong>
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
                    Mesurons les émissions de CO2 de votre établissement!
                </Typography>
                <p>
                    Utilisez le formulaire de connexion pour accéder à votre tableau de bord, ou demandez à
                    votre
                    <strong> enseignant</strong> de <strong>vous inviter.</strong>
                </p>
            </Grid>
            <Grid item md={6}>
                <Typography variant="h5">
                    <strong>Connexion</strong>
                </Typography>
                <form onSubmit={onLogin}>
                    <FormControl
                        sx={{
                            width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                            marginTop: theme.spacing(3),
                            marginBottom: theme.spacing(1)
                        }}>
                        <OutlinedInput placeholder="Email / username"
                                       defaultValue={"romain.crevecoeur@abc-transitionbascarbone.fr"}
                                       name="username"
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <OutlinedInput placeholder="Password"
                                       defaultValue={"om@XBC4H(hAVyG%s%@AWBVWS"}
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
                        <FormControlLabel control={<Checkbox/>} label="Se souvenir de moi"/>
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
                    <p>Mot de passe oublié ? <CustomLink href="#" underline="none">Le récupérer</CustomLink></p>
                </span>
                <FormControl sx={{
                    width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                    marginTop: theme.spacing(3),
                    marginBottom: theme.spacing(1)
                }}>
                    <StyledButton variant="contained" size="large">S'IDENTIFIER</StyledButton>
                </FormControl>
            </Grid>
        </BodyGrid>
    )
