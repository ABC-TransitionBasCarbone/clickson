'use client'

import { useState } from "react";
import { Header } from "../../dashboard/header";
import { CircularProgress } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DataToFill } from "@/app/types/DataType";
import { ActivityDataForm } from "../Form";

interface ActivityDataPageProps {
    domain: string;
    dataToFill: DataToFill[];
    handleConfirm: (type: string, value: string) => void;
};

export const ActivityDataPage = ({ domain, dataToFill, handleConfirm }: ActivityDataPageProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    return <>
        <Header />
        <Container maxWidth="xl">
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "80vh" }}>
                    <CircularProgress />
                </Box>
                : <ActivityDataForm
                    domain={domain}
                    dataToFill={dataToFill}
                    handleConfirm={handleConfirm} />
            }
        </Container>
    </>
};
