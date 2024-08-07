'use client'


import '../i18n';
import dynamic from 'next/dynamic';
import {Header} from "@/app/components/dashboard/header";
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import {Box} from "@mui/material";
import Divider from '@mui/material/Divider';
import {Stats} from "@/app/components/dashboard/stats";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";

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
`
export default function Dashboard() {
    const theme = useTheme();

    return (
        <>
            <CustomContainer>
                <Header/>
            </CustomContainer>
            <Container maxWidth="xl">
                <DashboardWrapper>
                    <Link href="#">
                        <HomeIcon fontSize="large"/>
                    </Link>
                    <CustomH6>
                        <strong>PROFIL D'ÉMISSIONS (kgCO2e)</strong>
                    </CustomH6>
                    <Divider aria-hidden="true" sx={{ marginTop: theme.spacing(1.25) }} />
                    <Stats/>

                </DashboardWrapper>
            </Container>
        </>
    );
};

