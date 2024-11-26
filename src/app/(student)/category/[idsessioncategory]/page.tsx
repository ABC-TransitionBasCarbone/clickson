'use client'

import { Container, styled } from "@mui/system";
import { useDataToFill } from "@/src/app/(student)/category/[idsessioncategory]/dataToFill";
import { useRouter } from 'next/navigation';
import { ActivityDataForm } from "@/src/components/activityData/Form";
import { Header } from "@/src/components/dashboard/header";
import { useTranslations } from "next-intl";

export default function Category() {
    const dataToFill = useDataToFill();
    const router = useRouter()
    const t = useTranslations('category');

    const Link = styled('a')`
        text-decoration: none;
        cursor: pointer;
    `
    return <>
        <Header />

        <Container maxWidth="xl">

            <ActivityDataForm dataToFill={dataToFill} />
        </Container>
    </>
};
