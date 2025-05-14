'use client'

import { Box, Stack } from "@mui/system";
import { StyledContainer } from "./styles";
import { ActivityDataFormDescription } from "./Description";
import { ActivityDataFormHeader } from "./Header";
import { QuestionTypeComponent } from "./QuestionTypeComponents/TableQuestion";
import { getSessionSubCategoriesWithIdSessionCategory } from "../../../../api/sessions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UrlParams } from "../../../types/UrlParams";
import { Button, CircularProgress, Typography } from "@mui/material";
import { DataToFill } from "../../../types/DataToFill";
import { SessionSubCategory } from "../../../types/SessionSubCategory";
import { useTranslations } from "next-intl";
import HomeIcon from '@mui/icons-material/Home';
import { getGroup } from "../../../../api/groups";
import { School } from "../../../types/School";
import { getSchoolById } from "../../../../api/schools";
import { getLocale } from "../../../i18n/locale";
import { routing } from "../../../i18n/routing";
interface ActivityDataFormProps {
    dataToFill: DataToFill[];
};

export const ActivityDataForm = ({ dataToFill }: ActivityDataFormProps) => {
    const params = useParams<UrlParams>()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(true)
    const [school, setSchool] = useState<School>()
    const [labelCategory, setLabelCategory] = useState("")
    const t = useTranslations('category')

    const [sessionSubCategories, setSessionSubCategories] = useState<SessionSubCategory[]>([])

    const getCategoryData = async () => {
        setLoading(true)
        const locale = await getLocale()
        const idLang = routing.locales.findIndex(l => l === locale) + 1

        const sessionCategory = await getSessionSubCategoriesWithIdSessionCategory(params.idsessioncategory, idLang)
        setLabelCategory(sessionCategory.emissionCategory.label)

        setSessionSubCategories(sessionCategory.sessionEmissionSubCategories.map((subcategory) => ({
            ...subcategory,
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
    }, [])

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
}
