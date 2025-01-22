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
import { getGroup } from "@/api/groups";
import { School } from "@/src/types/School";
import { getSchoolById } from "@/api/schools";
import { getLocale } from "@/src/i18n/locale";
import { routing } from "@/src/i18n/routing";
import { getSubCategories } from "@/api/categories";

interface ActivityDataFormProps {
    dataToFill: DataToFill[];
};

export const ActivityDataForm = ({ dataToFill }: ActivityDataFormProps) => {
    const params = useParams<UrlParams>()
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [school, setSchool] = useState<School>();
    const t = useTranslations('category');

    const [sessionSubCategories, setSessionSubCategories] = useState<SessionSubCategory[]>([]);

    const getCategoryData = async () => {
        setLoading(true)
        const sessionCategory = await getSessionSubCategoriesWithIdSessionCategory(params.idsessioncategory)
        const locale = await getLocale()
        const idLang = routing.locales.findIndex(l => l === locale) + 1
        const subCategories = await getSubCategories(idLang)

        setSessionSubCategories(sessionCategory.sessionEmissionSubCategories.map((subcategory, index) => ({
            ...subcategory,
            emissionSubCategory: subCategories[subcategory.idEmissionSubCategory - 1],
            locked: sessionCategory.locked,
            dataToFill: dataToFill.find(header => subcategory.idEmissionSubCategory === header.id)
        })))
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
            <Button onClick={() => router.push("/dashboard/" + params.idgroup)} sx={{ marginBottom: 2 }} variant="outlined" startIcon={<HomeIcon />}>
                {t('home')}
            </Button>

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
