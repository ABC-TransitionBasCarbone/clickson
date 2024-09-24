'use client'

import { useTheme } from "@mui/material/styles";
import { CustomDialog } from "../../customDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "../../dashboard/header";
import { CircularProgress, Divider } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DataToFill } from "@/app/types/DataType";
import { ActivityDataForm } from "../Form";

interface ActivityDataPageProps {
    domain: string;
    category: string;
    description: string;
    dataToFill: DataToFill[];
    handleConfirm: (type: string, value: string) => void;
};

export const ActivityDataPage = ({ domain, category, description, dataToFill, handleConfirm }: ActivityDataPageProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    return <>
        <Header/>
        <Container maxWidth="xl">
            {loading ? 
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "80vh" }}>
                    <CircularProgress />
                </Box>
                : <ActivityDataForm
                    domain={domain}
                    category={category}
                    description={description}
                    dataToFill={dataToFill}
                    handleConfirm={handleConfirm} />
            }
        </Container>
    </>
};