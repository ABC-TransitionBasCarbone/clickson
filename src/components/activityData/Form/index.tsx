'use client'

import { Box, Stack } from "@mui/system";
import { StyledContainer } from "./styles";
import { ActivityDataFormDescription } from "./Description";
import { ActivityDataFormHeader } from "./Header";
import { QuestionTypeComponent } from "./QuestionTypeComponents/TableQuestion";
import { getSessionSubCategoriesWithIdSessionCategory } from "@/api/sessions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UrlParams } from "@/src/types/UrlParams";
import { CircularProgress } from "@mui/material";
import { DataToFill } from "@/src/types/DataToFill";
import { SessionSubCategory } from "@/src/types/SessionSubCategory";

interface ActivityDataFormProps {
    dataToFill: DataToFill[];
};

export const ActivityDataForm = ({ dataToFill }: ActivityDataFormProps) => {
    const params = useParams<UrlParams>()
    const [loading, setLoading] = useState<boolean>(false);

    const [sessionSubCategories, setSessionSubCategories] = useState<SessionSubCategory[]>([]);

    const getSubCategories = async () => {
        setLoading(true)
        const sessionSubCategoriesData = await getSessionSubCategoriesWithIdSessionCategory(params.idsessioncategory)
        setSessionSubCategories(sessionSubCategoriesData.map(subcategory => ({
            ...subcategory,
            dataToFill: dataToFill.find(header => subcategory.idEmissionSubCategorie === header.id)
        })))
        setLoading(false)
    }

    useEffect(() => {
        getSubCategories()
    }, []);

    return loading ?
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <CircularProgress />
        </Box>
        : <StyledContainer>
            {sessionSubCategories.map(category =>
                <Stack key={category.id}>
                    <ActivityDataFormHeader category={category.emissionSubCategories.label} />
                    <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: "row" }}>
                        <ActivityDataFormDescription description={category.emissionSubCategories.detail} />
                        <Stack sx={{ marginLeft: "24px !important", flex: 1 }}>
                            <QuestionTypeComponent sessionSubCategory={category} />
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </StyledContainer>
};
