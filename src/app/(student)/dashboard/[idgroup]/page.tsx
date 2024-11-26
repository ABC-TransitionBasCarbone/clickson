'use client'

import { Header } from "@/src/components/dashboard/header";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Container from '@mui/material/Container';
import { Box, Button, Grid } from "@mui/material";
import { Stats } from "@/src/components/dashboard/stats";
import { styled } from "@mui/system";
import { useEffect, useState } from 'react';
import { CategoryItem } from '../../../../components/dashboard/Category';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslations } from 'next-intl'
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
    border-radius: 5px;
`;

export default function Dashboard() {
    const t = useTranslations('dashboard');
    const params = useParams<UrlParams>()
    const router = useRouter();

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [session, setSession] = useState<Session>({} as Session);

    useEffect(() => {
        fetchGroup();
    }, []);

    function filterWithRights(c: Category, rights: number[]) {
        // TODO This function is used to filter the categories that the user has the right to see
        return true;
    }

    const fetchGroup = async () => {
        setLoadingCategories(true);
        const group = await getGroup(params.idgroup);
        console.log("🚀 ~ fetchGroup ~ group:", group)
        console.log("🚀 ~ fetchGroup ~ group:", group.sessionStudent.sessionEmissionCategories)

        setCategories(
            group.sessionStudent.sessionEmissionCategories.map(sc => ({
                ...sc.emissionCategory,
                locked: sc.locked,
                idSessionEmissionCategory: sc.id
            }))
        );

        setSession(group.sessionStudent);
        setLoadingCategories(false);
    }

    return (session.id ?
        <>
            <Header />
            <Container maxWidth="xl">
                <DashboardWrapper>
                    <Button onClick={() => { router.back() }} sx={{ marginBottom: 2 }} variant="outlined" startIcon={<ArrowBackIosIcon />}>
                        {t('accueil')}
                    </Button>

                    <Establishment school={session.school} />
                    <Stats session={session} />

                    {session.locked ? t("locked") :
                        <Grid container marginBottom={6} sx={{ alignItems: "center", flexDirection: "column" }}>
                            <CustomH3>
                                {t("calculatorsMarkers")}
                            </CustomH3>
                            <DividerSmall />
                            <Paragraph>
                                {t("clickMarkerStart")} <strong>{t("dataGathering")}</strong>
                            </Paragraph>
                        </Grid>}
                    {session.locked || loadingCategories ? (
                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                            <CircularProgress />
                        </Box>) :
                        (
                            <Grid container>
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
        </> : <CircularProgress />
    );
};
