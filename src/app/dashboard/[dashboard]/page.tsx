'use client'

import '../../i18n';
import { Header } from "@/src/components/dashboard/header";
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import { Box, Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Stats } from "@/src/components/dashboard/stats";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { useEffect, useState } from 'react';
import { CategoryItem } from '../../../components/dashboard/Category';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import { getCategories, getSessionCategories } from '@/api/categories';
import Establishment from '@/src/components/establishment/Establishment';
import { Category } from '@/app/types/Category';
import { useParams } from 'next/navigation'
import { Params } from '@/app/types/Params';
import { getSessionStudent } from '@/api/sessions';
import { getLanguages } from '@/api/languages';

const borderColors = [
    "#1c82b8",
    "#11990F",
    "#ff4040",
    "#ffae42",
    "#800080"
]

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


export default function Dashboard() {
    const { t, i18n } = useTranslation();
    const params = useParams<Params>()

    const theme = useTheme();

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [idSessionStudent, setIdSessionStudent] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const idLanguage = await getLanguages(i18n.language);
            let categories = await getCategories(idLanguage);
            const sessionCategories = await getSessionCategories(params.dashboard, categories);

            const studentSession = await getSessionStudent(sessionCategories[0].id_session_student || "")
            setIdSessionStudent(studentSession.id_group || "");

            categories = categories.map(c =>
            ({
                ...c,
                id_session_emission_categorie: sessionCategories.filter(sessionCategorie =>
                    sessionCategorie.id_emission_categorie === c.id)[0]?.id
            }))

            setCategories(categories);
            setLoadingCategories(false);
        } catch (error) {
            console.error(error);
            setLoadingCategories(false);
        }
    }

    return (
        <>
            <div>
                <CustomContainer>
                    <Header />
                </CustomContainer>
            </div>
            <Container maxWidth="xl">
                <DashboardWrapper>


                    <Establishment />
                    <Link href={"/groups/" + idSessionStudent}>
                        <HomeIcon fontSize="large" />
                    </Link>
                    <CustomH6>
                        <strong>{t('abc-emission-profile')} (kgCO2e)</strong>
                    </CustomH6>

                    <Divider aria-hidden="true" sx={{ marginTop: theme.spacing(1.25) }} />
                    <Stats />
                    <Grid container marginTop={4} marginBottom={6} sx={{ alignItems: "center", flexDirection: "column" }}>
                        <CustomH3>
                            {t("abc-calculators-markers")}
                        </CustomH3>
                        <DividerSmall />
                        <Paragraph>
                            {t("abc-click-marker-start")} <strong>{t("abc-data-gathering")}</strong>
                        </Paragraph>
                    </Grid>
                    {loadingCategories ? (
                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                            <CircularProgress />
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

