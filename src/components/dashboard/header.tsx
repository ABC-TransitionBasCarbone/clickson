import { Grid, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { MouseEvent, useEffect, useState } from "react";
import { getUserCookies, logout } from "@/api/auth";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/src/components/language-switcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { User } from "@/src/types/User";

const BoxHeader = styled(Box)`
    img {
        max-height: 50px;
        padding-left: 15px;
    }
`;

const Link = styled('a')`
    text-decoration: none;
`;

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
        color: theme.palette.secondary.main
    }
}));

export const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>({} as User);
    const { t } = useTranslation();
    useEffect(() => {
        fetchCookies();
    }, [setUser]);

    const fetchCookies = async () => {
        const cookies = await getUserCookies();
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
    return <Box sx={{ width: '100%' }}>
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
                <Box sx={{ border: 'none' }}></Box>
            </Grid>
            <Grid item sm={3}>
                <UsernameBox sx={{ border: 'none' }}>
                    <LanguageSwitcher />
                    <p>{user?.user_email}</p>
                    <p>{t('abc-connected-as')}: <strong>{user?.role}</strong></p>
                    <Link href="" onClick={onLogout}>
                        <Button>{t('abc-logout')}</Button>
                    </Link>
                </UsernameBox>
            </Grid>
        </Grid>
    </Box>
}
