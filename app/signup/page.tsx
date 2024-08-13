'use client'

import {Header} from "@/app/components/login/header";
import Container from "@mui/material/Container";
import {SignUpForm} from "@/app/components/signup/signupform";
import {styled} from "@mui/system";
import {Grid, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {FormEvent, useEffect, useState} from "react";
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
    const [correctUserInfo, setCorrectUserInfo] = useState(true)
    const [message, setMessage] = useState("")


    const fetchCountries = async () => {
        const data = await getCountries();
        setCountries(data);
    };

    const onSignUp = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        signUp(formData).then(data => {

            if(data.message) {
                setCorrectUserInfo(false)
                setMessage("Cette adresse email est déjà enregistré, veuillez choisir une autre.")
            } else if(data.error) {
                setCorrectUserInfo(false)
                setMessage(data.error)
            }
        });
    }
    useEffect(() => {
        fetchCountries()
    }, []);
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
                <ArrowBackIosIcon onClick={() => {router.back()}} sx={{
                    cursor: 'pointer'
                }}/>
                <Divider sx={{marginTop: theme.spacing(2)}}/>
            </Container>
            <Container>
                <SignUpForm onSignUp={onSignUp} countries={countries} correctUserInfo={correctUserInfo} message={message}/>
            </Container>
        </>
    );

};
