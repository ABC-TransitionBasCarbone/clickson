'use client'

import { Container } from "@mui/system";
import { useDataToFill } from "../../../../../../src/app/(student)/category/[idgroup]/[idsessioncategory]/dataToFill";
import { ActivityDataForm } from "../../../../../../src/components/activityData/Form";
import { Header } from "../../../../../../src/components/dashboard/header";

export default function Category() {
    const dataToFill = useDataToFill();

    return <>
        <Header />
        <Container maxWidth="xl">
            <ActivityDataForm dataToFill={dataToFill} />
        </Container>
    </>
};
