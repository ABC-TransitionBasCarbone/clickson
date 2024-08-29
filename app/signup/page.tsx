'use client'

import {Header} from "@/app/components/login/header";
import Container from "@mui/material/Container";
import {SignUpForm} from "@/app/components/signup/signupform";
import {styled} from "@mui/system";
import {Grid, Link, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {FormEvent, ReactElement, useEffect, useState} from "react";
import {getCountries, signUp} from "@/lib";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from "@mui/material/Divider";
import {useRouter} from "next/navigation";

/**
 * Page de création de compte
 * @returns vers le Dashboard
 */
export default function SignUp() {
    const theme = useTheme();
    const router = useRouter();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const CustomContainer = styled(Grid)(({theme}) => ({
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

    const redirectToLogin = (showSuccess: boolean, message: ReactElement|null) => {
        if (showSuccess && message) {
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
                router.push('/');
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
            if (Object.keys(data).length === 0) {
                setShowError(true)
                setMessage(
                    <span>
                        Un compte est déjà associé à cette adresse email, cliquez&nbsp;
                        <Link href="/" sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            textDecoration: 'none'
                        }}>ici pour vous connecter
                        </Link>
                        &nbsp;ou choisissez une autre adresse email.
                    </span>
                )
            } else {
                setShowError(false)
                setShowSuccess(true)
                setMessage(
                    <span>Votre compte a été créé avec succès</span>
                )
            }
        });
    }
    useEffect(() => {
        fetchCountries()
        redirectToLogin(showSuccess, message)
    }, [message]);
    return (
        <>
            <CustomContainer>
                <Header logoPosition="flex-start"/>
            </CustomContainer>
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
                }}/>
                <Divider sx={{marginTop: theme.spacing(2)}}/>
            </Container>
            <Container>
                <SignUpForm onSignUp={onSignUp} countries={countries} showSuccess={showSuccess} showError={showError}
                            message={message} progress={progress}/>
            </Container>
        </>
    );

};
