'use client'

import {  Container } from "@mui/system";
import { ActivityDataForm } from "../Form";
import { Header } from "../../dashboard/header";

interface ActivityDataPageProps {
    handleConfirm: (type: string, value: string) => void;
};

export const ActivityDataPage = ({ handleConfirm }: ActivityDataPageProps) => {

    return <>
        <Header />
        <Container maxWidth="xl">
            <ActivityDataForm handleConfirm={handleConfirm} />
        </Container>
    </>
};
