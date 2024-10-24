'use client'

import { Container } from "@mui/system";
import { ActivityDataForm } from "../Form";
import { Header } from "../../dashboard/header";
import { useDataToFill } from "@/src/app/(student)/category/[idsessioncategory]/dataToFill";

interface ActivityDataPageProps {
    handleConfirm: (type: string, value: string) => void;
};

export const ActivityDataPage = ({ handleConfirm }: ActivityDataPageProps) => {
    const { dataToFill } = useDataToFill();

    return <>
        <Header />
        <Container maxWidth="xl">
            <ActivityDataForm handleConfirm={handleConfirm} dataToFill={dataToFill}
            />
        </Container>
    </>
};
