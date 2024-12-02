'use client'

import { Box, Stack } from "@mui/system";
import { StyledContainer } from "./styles";
import { ActivityDataFormDescription } from "./Description";
import { ActivityDataFormHeader } from "./Header";
import { QuestionTypeComponent } from "./QuestionTypeComponents/TableQuestion";
import { getSessionSubCategoriesWithIdSessionCategory } from "@/api/sessions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UrlParams } from "@/src/types/UrlParams";
import { Button, CircularProgress } from "@mui/material";
import { DataToFill } from "@/src/types/DataToFill";
import { SessionSubCategory } from "@/src/types/SessionSubCategory";
import { useTranslations } from "next-intl";
import HomeIcon from '@mui/icons-material/Home';

interface ActivityDataFormProps {
    dataToFill: DataToFill[];
};

export const ActivityDataForm = ({ dataToFill }: ActivityDataFormProps) => {
    const params = useParams<UrlParams>()
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const t = useTranslations('category');

    const [sessionSubCategories, setSessionSubCategories] = useState<SessionSubCategory[]>([]);

    const getSubCategories = async () => {
        setLoading(true)
        const sessionCategory = await getSessionSubCategoriesWithIdSessionCategory(params.idsessioncategory)

        setSessionSubCategories(sessionCategory.sessionEmissionSubCategories.map(subcategory => ({
            ...subcategory,
            locked: sessionCategory.locked,
            dataToFill: dataToFill.find(header => subcategory.idEmissionSubCategory === header.id)
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
            <Button onClick={() => router.back()} sx={{ marginBottom: 2 }} variant="outlined" startIcon={<HomeIcon />}>
                {t('home')}
            </Button>

            {sessionSubCategories.map(category =>
                <Stack key={category.id}>
                    <ActivityDataFormHeader category={category.emissionSubCategory.label} />
                    <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: "row" }}>
                        <ActivityDataFormDescription description={category.emissionSubCategory.detail} />
                        <Stack sx={{ marginLeft: "24px !important", flex: 1 }}>
                            <QuestionTypeComponent sessionSubCategoryProp={category} />
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </StyledContainer>
};
