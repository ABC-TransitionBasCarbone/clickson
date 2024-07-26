'use client'


import '../i18n';
import dynamic from 'next/dynamic';
import {Header} from "@/app/components/dashboard/header";
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import {Box} from "@mui/material";
import Divider from '@mui/material/Divider';
import {Stats} from "@/app/components/dashboard/stats";
const Greetings = dynamic(() => import('../components/greetings').then(module => module.Greetings), { ssr: false });

export default function Dashboard() {

    return (
        <>
            {/*<Greetings />*/}
            <div className="container">
                <Header/>
            </div>
            <Container maxWidth="xl">
                <Box className="dashboard">
                    <a href="#">
                        <HomeIcon fontSize="large"/>
                    </a>
                    <h6>
                        <strong>PROFIL D'ÉMISSIONS (kgCO2e)</strong>
                    </h6>
                    <Divider aria-hidden="true" sx={{ marginTop: '10px' }} />
                    <Stats/>

                </Box>

            </Container>

        </>


    );
};
