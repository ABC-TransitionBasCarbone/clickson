'use client'

import '../../../i18n';
import { Header } from "@/src/components/dashboard/header";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Container from '@mui/material/Container';
import { Box, Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Stats } from "@/src/components/dashboard/stats";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { useEffect, useState } from 'react';
import { CategoryItem } from '../../../../components/dashboard/Category';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import Establishment from '@/src/components/establishment/Establishment';
import { useParams, useRouter } from 'next/navigation'
import { Category } from '@/src/types/Category';
import { UrlParams } from '@/src/types/UrlParams';
import { getGroup } from '@/api/groups';
import { Session } from '@/src/types/Session';

const borderColors = [
    "#1c82b8",
    "#11990F",
    "#ff4040",
    "#ffae42",
    "#800080"
]

const DashboardWrapper = styled(Box)`
    max-width: 100%;
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
    const { t } = useTranslation();
    const params = useParams<UrlParams>()
    const router = useRouter();

    const theme = useTheme();

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [session, setSession] = useState<Session>({} as Session);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoadingCategories(true);
        const group = await getGroup(params.idgroup);
        setCategories(group.sessionStudent.sessionEmissionCategories.map(sc => ({
            ...sc.emissionCategory,
            idSessionEmissionCategory: sc.id
        })));
        setSession(group.sessionStudent);
        setLoadingCategories(false);
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <Container maxWidth="xl">
                <DashboardWrapper>

                    <ArrowBackIosIcon onClick={() => {
                        router.back()
                    }} sx={{
                        cursor: 'pointer'
                    }} />

                    <Establishment />

                    {session.id && <Stats session={session} />}
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

