'use client'

import { Container, styled } from "@mui/system";
import { ActivityDataForm } from "../Form";
import { Header } from "../../dashboard/header";
import { useDataToFill } from "@/src/app/(student)/category/[idsessioncategory]/dataToFill";
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';

export const ActivityDataPage = () => {
    const dataToFill = useDataToFill();
    const router = useRouter()

    const Link = styled('a')`
        text-decoration: none;
        cursor: pointer;
    `
    return <>
        <Header />

        <Container maxWidth="xl">
            <Link onClick={router.back}>
                <HomeIcon fontSize="large" />
            </Link>
            <ActivityDataForm dataToFill={dataToFill} />
        </Container>
    </>
};
