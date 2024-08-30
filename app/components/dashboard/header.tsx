import {Grid, Box} from "@mui/material";

import eng from '../../public/eng.png';
import fra from '../../public/fra.png';
import esp from '../../public/esp.png';
import ita from '../../public/ita.png';

import Image, {StaticImageData} from 'next/image'
import {styled} from "@mui/system";
import {MouseEvent, useEffect, useState} from "react";
import {getSession, logout} from "@/lib";
import {useRouter} from "next/navigation";


const BoxHeader = styled(Box)`
    img {
        max-height: 50px;
        padding-left: 15px;
    }
`;

const Link = styled('a')`
    text-decoration: none;
`;

const LanguageMenu = styled('ul')`
    li {
        display: inline-block;
        padding-left: 10px;
        margin-top: 10px;
        margin-bottom: 14px;
    }
`;

const UsernameBox = styled('div')(({theme}) => ({
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
        color: theme.palette.secondary.main
    }
}));

interface User {
    user_display_name: string,
    user_email: string,
    role: string,
    state: string,
    school: string,
    city: string,
    zip_code: string
}
export const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        city: "",
        role: "",
        school: "",
        state: "",
        user_display_name: "",
        user_email: "",
        zip_code: ""
    });
    useEffect(() => {
        fetchCookies();
    }, [setUser]);

    const fetchCookies = async () => {
        const cookies = await getSession();
        if (!cookies) {
            return
        }
        setUser(cookies);
    }
    const onLogout = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        logout().then(() => {
            router.push('/')
        })
    }
    const languages: StaticImageData[] = [eng, fra, ita, esp];
    return (
        <Box sx={{width: '100%'}}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item sm={3}>
                    <BoxHeader>
                        <img
                            src="https://calculator.clickson.eu/wp-content/themes/co2calc-child/images/logo.png"
                            alt="logo"
                        />
                    </BoxHeader>
                </Grid>
                <Grid item sm={6}>
                    <Box sx={{border: 'none'}}></Box>
                </Grid>
                <Grid item sm={3}>
                    <UsernameBox sx={{border: 'none'}}>
                        <LanguageMenu>
                            {languages.map((language, id) => (
                                <li key={id}>
                                    <Link href=""><Image src={language} alt="languages" width={16} height={11}/></Link>
                                </li>
                            ))}
                        </LanguageMenu>
                        <p>{user.user_email}</p>
                        <p>Connecté en tant que: <strong>{user.role}</strong></p>
                        <Link href="" onClick={onLogout}>Se déconnecter</Link>
                    </UsernameBox>
                </Grid>
            </Grid>
        </Box>
    )
}
