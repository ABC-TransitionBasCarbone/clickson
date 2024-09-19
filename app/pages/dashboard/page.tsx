'use client'


import '../../i18n';
import {Header} from "@/app/components/dashboard/header";
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import {Box, Grid} from "@mui/material";
import Divider from '@mui/material/Divider';
import {Stats} from "@/app/components/dashboard/stats";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";
import { useEffect, useState } from 'react';
import {getSession} from '@/api/lib';
import { Category } from '../../models/Category/Category';
import { CategoryItem } from '../../components/dashboard/Category';
import CircularProgress from '@mui/material/CircularProgress';
import {useTranslation} from "react-i18next";
import { getCategories } from '@/api/postgres';
import {UserAdditionalInfos} from "@/app/types/UserAdditionalInfos";

const CustomContainer = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background-color: white;
`

const DashboardWrapper = styled(Box)`
    max-width: 100%;
    margin-top: 60px;
    min-height: calc(100vh - 290px);
    padding-top: 60px;
    padding-bottom: 80px;
    a {
        color: #6d6d6d;
    }
    a:hover {
        color: black;
    }
`

const Link = styled('a')`
    text-decoration: none;
`

const CustomH6 = styled('h6')`
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 500;
`

const CustomH3 = styled('h3')`
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    position: relative;
    padding-bottom: 30px;
    font-weight: 600;
    text-align: center
`;

const Paragraph = styled("p")`
    font-family: "Open Sans", sans-serif;
    color: #000;
    font-weight: 300;
    font-size: 18px;
    padding-bottom: 30px;
    text-align: center;
`;

const DividerSmall = styled("hr")`
    display: inline-block;
    background: #f79e0f;
    border: 0;
    width: 40px;
    height: 3px;
    margin-bottom: 20px;
    border-radius: 5px;
`;

interface User {
    state: string,
    school: string,
    city: string,
    zip_code: string
}

export default function Dashboard() {
     // Default language
    const { t } = useTranslation();

    const theme = useTheme();

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<User>({
        city: "",
        school: "",
        state: "",
        zip_code: ""
    });
    const fetchCookies = async () => {
        const cookies = await getSession();
        if (!cookies) {
            return
        }
        setUser(cookies);
    }
    const [userData, setUserData] = useState<UserAdditionalInfos | null>({
        city: "",
        construction_year: "",
        number_of_staff: "",
        number_of_student: "",
        school: "",
        school_address: "",
        state: "",
        zip_code: ""
    });
    useEffect(()=> {
        fetchCookies()
        fetchCategories();
    }, [setUser]);

    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            // TODO add language https://stackoverflow.com/questions/62242963/get-current-language-next-i18next
            const res = await getCategories();

            setCategories(res.map((c:any) => new Category(c.id, c.label, c.detail)));
            setLoadingCategories(false);
        } catch (error) {
            console.error(error);
            setLoadingCategories(false);
        }
    }

    const borderColors = [
        "#1c82b8",
        "#11990F",
        "#ff4040",
        "#ffae42",
        "#800080"
    ]

    return (
        <>
            <CustomContainer>
                <Header/>
            </CustomContainer>
            <Container maxWidth="xl">
                <DashboardWrapper>
                    <Link href="/accueil">
                        <HomeIcon fontSize="large"/>
                    </Link>
                    <CustomH6>
                        <strong>{t('abc-emission-profile')} (kgCO2e)</strong> | {user.school} {user.city ? " - " + user.city : ""}
                    </CustomH6>

                    <Divider aria-hidden="true" sx={{marginTop: theme.spacing(1.25)}}/>
                    <Stats/>
                    <Grid container marginTop={4} marginBottom={6} sx={{alignItems: "center", flexDirection: "column"}}>
                        <CustomH3>
                            {t("abc-calculators-markers")}
                        </CustomH3>
                        <DividerSmall/>
                        <Paragraph>
                            {t("abc-click-marker-start")} <strong>{t("abc-data-gathering")}</strong>
                        </Paragraph>
                    </Grid>
                    {loadingCategories ? (
                            <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", height: "20"}}>
                                <CircularProgress/>
                            </Box>) :
                        (
                            <Grid container marginTop={2}>
                                {categories.map((c, _index) => (
                                    <CategoryItem
                                        key={_index}
                                        category={c}
                                        borderColor={categories.length < 6 ? borderColors[_index] : ""}
                                    />
                                ))}
                            </Grid>
                        )
                    }

                </DashboardWrapper>
            </Container>
        </>
    );
};

