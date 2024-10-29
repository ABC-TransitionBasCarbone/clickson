'use client'

import { Box, Stack } from "@mui/system";
import { StyledContainer } from "./styles";
import { ActivityDataFormDescription } from "./Description";
import { ActivityDataFormHeader } from "./Header";
import { QuestionTypeComponent } from "./QuestionTypeComponents/TableQuestion";
import { getSubCategoriesWithIdSessionCategory } from "@/api/categories";
import { getSessionSubCategoriesWithIdSessionCategory } from "@/api/sessions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Params } from "@/src/types/Params";
import { SubCategory } from "@/src/types/SubCategory";
import { CircularProgress } from "@mui/material";
import { DataToFill } from "@/src/types/DataToFill";

interface ActivityDataFormProps {
    handleConfirm: (idEF: number, value: string) => void;
    dataToFill: DataToFill[];
};

export const ActivityDataForm = ({ handleConfirm, dataToFill }: ActivityDataFormProps) => {
    const params = useParams<Params>()
    const [loading, setLoading] = useState<boolean>(false);

    const [sessionSubCategory, setSessionSubCategory] = useState<SubCategory[]>([]);

    const getSubCategories = async () => {
        setLoading(true)
        const sessionSubCategories = await getSessionSubCategoriesWithIdSessionCategory(params.idsessioncategory)
        let subCategories = await getSubCategoriesWithIdSessionCategory(sessionSubCategories)
        subCategories = subCategories.map(subcategory => ({
            ...subcategory,
            dataToFill: dataToFill.find(header => subcategory.id === header.id)
        }));
        setSessionSubCategory(subCategories)

        setLoading(false)
    }

    useEffect(() => {
        getSubCategories()
    }, []);

    const getQuestionComponent = (category: SubCategory) => {
        return <QuestionTypeComponent category={category} handleConfirm={handleConfirm} />;
    }

    return <>
        {loading ?
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <CircularProgress />
            </Box>
            : <StyledContainer>
                {sessionSubCategory.map(category =>
                    <Stack key={category.id}>
                        <ActivityDataFormHeader category={category.label} />
                        <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: "row" }}>
                            <ActivityDataFormDescription description={category.detail} />
                            <Stack sx={{ marginLeft: "24px !important", flex: 1 }}>
                                {getQuestionComponent(category)}
                            </Stack>
                        </Stack>
                    </Stack>
                )}
            </StyledContainer>}
    </>
};
