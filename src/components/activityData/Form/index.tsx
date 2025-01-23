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
import { Button, CircularProgress, Typography } from "@mui/material";
import { DataToFill } from "@/src/types/DataToFill";
import { SessionSubCategory } from "@/src/types/SessionSubCategory";
import { useTranslations } from "next-intl";
import HomeIcon from '@mui/icons-material/Home';
import { getGroup } from "@/api/groups";
import { School } from "@/src/types/School";
import { getSchoolById } from "@/api/schools";
import { getLocale } from "@/src/i18n/locale";
import { routing } from "@/src/i18n/routing";
import { getCategories, getCategory, getSubCategories } from "@/api/categories";

interface ActivityDataFormProps {
    dataToFill: DataToFill[];
};

export const ActivityDataForm = ({ dataToFill }: ActivityDataFormProps) => {
    const params = useParams<UrlParams>()
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [school, setSchool] = useState<School>();
    const [labelCategory, setLabelCategory] = useState("");
    const t = useTranslations('category');

    const [sessionSubCategories, setSessionSubCategories] = useState<SessionSubCategory[]>([]);

    const getCategoryData = async () => {
        setLoading(true)
        const locale = await getLocale()
        const idLang = routing.locales.findIndex(l => l === locale) + 1
        const subCategories = await getSubCategories(idLang)

        const sessionCategory = await getSessionSubCategoriesWithIdSessionCategory(params.idsessioncategory)

        console.log("subCategories ", subCategories)
        setLabelCategory(sessionCategory.emissionCategory.label)

        setSessionSubCategories(sessionCategory.sessionEmissionSubCategories.map((subcategory) => ({
            ...subcategory,
            // emissionSubCategory: subCategories[subcategory.idEmissionSubCategory - 1],
            locked: sessionCategory.locked,
            dataToFill: dataToFill.find(header => subcategory.idEmissionSubCategory === header.id)
        })))

        console.log("sessionCategory ", sessionCategory)
        getSchool()
        setLoading(false)
    }

    const getSchool = async () => {
        const group = await getGroup(params.idgroup)
        setSchool(await getSchoolById(group.idSchool))
    }

    useEffect(() => {
        getCategoryData()
    }, []);

    return loading ?
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <CircularProgress />
        </Box>
        : <StyledContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Button onClick={() => router.push("/dashboard/" + params.idgroup)} variant="outlined" startIcon={<HomeIcon />}>
                    {t('home')}
                </Button>
                <Typography variant="h4" sx={{ marginLeft: 2 }}>{labelCategory}</Typography>
            </Box>
            {sessionSubCategories.map(category =>
                <Stack key={category.id}>
                    <ActivityDataFormHeader category={category.emissionSubCategory.label} />
                    <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: "row" }}>
                        <ActivityDataFormDescription description={category.emissionSubCategory.detail} />
                        <Stack sx={{ marginLeft: "24px !important", flex: 1 }}>
                            <QuestionTypeComponent
                                schoolYear={school?.establishmentYear}
                                sessionSubCategoryProp={category} />
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </StyledContainer>
};
