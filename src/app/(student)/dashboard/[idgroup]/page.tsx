'use client'

import { Header } from "@/src/components/dashboard/header";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Container from '@mui/material/Container';
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
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
import { User } from "@/src/types/User";
import { getUserCookies } from "@/api/auth";
import { backgroundColors } from "@/src/constants/colors";

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
    const [user, setUser] = useState<User>({} as User);

    useEffect(() => {
        getUser();
        fetchGroup();
    }, []);

    const getUser = async () => {
        const cookies = await getUserCookies();
        if (!cookies) {
            return
        }
        setUser(cookies);
    }

    const fetchGroup = async () => {
        setLoadingCategories(true);
        const group = await getGroup(params.idgroup);
        setCategories(
            group.sessionStudent.sessionEmissionCategories
                .filter(sc =>
                    group.rights.length === 0 || group.rights.includes(sc.emissionCategory.id) || group.rights.includes(sc.emissionCategory.id + 5))
                .map((sc, index) => ({
                    ...sc.emissionCategory,
                    id: index,
                    locked: sc.locked,
                    idSessionEmissionCategory: sc.id
                }))
        )

        setSession(group.sessionStudent);
        setLoadingCategories(false);
    }

    return session.id ?
        <>
            <Header />
            <Container maxWidth="xl">
                <DashboardWrapper>
                    {user.email && <Button onClick={() => { router.back() }} sx={{ marginBottom: 2 }} variant="outlined" startIcon={<ArrowBackIosIcon />}>
                        {t('home')}
                    </Button>}

                    <Establishment school={session.school} />
                    <Stats session={session} />

                    {session.locked ? t("locked") :
                        <Grid container marginBottom={6} sx={{ alignItems: "center", flexDirection: "column" }}>
                            <Typography variant="h4">{t("calculatorsMarkers")}</Typography>
                            <DividerSmall />
                            <Typography>{t("clickMarkerStart")} <strong>{t("dataGathering")}</strong></Typography>
                        </Grid>}
                    {session.locked || loadingCategories ? (
                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                            <CircularProgress />
                        </Box>) :
                        (<Grid container>
                            {categories.map((c, i) => (
                                <CategoryItem
                                    key={i}
                                    category={c}
                                    idGroup={params.idgroup}
                                    user={user}
                                    borderColor={backgroundColors[i]}
                                />
                            ))}
                        </Grid>)
                    }
                </DashboardWrapper>
            </Container>
        </> : <CircularProgress />
};
