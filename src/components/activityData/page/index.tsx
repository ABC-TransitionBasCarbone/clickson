'use client'

import { Header } from "../../dashboard/header";
import {  Container } from "@mui/system";
import { ActivityDataForm } from "../Form";

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
