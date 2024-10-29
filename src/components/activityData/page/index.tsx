'use client'

import { Container } from "@mui/system";
import { ActivityDataForm } from "../Form";
import { Header } from "../../dashboard/header";
import { useDataToFill } from "@/src/app/(student)/category/[idsessioncategory]/dataToFill";



export const ActivityDataPage = () => {
    const dataToFill = useDataToFill();

    return <>
        <Header />
        <Container maxWidth="xl">
            <ActivityDataForm dataToFill={dataToFill}/>
        </Container>
    </>
};
