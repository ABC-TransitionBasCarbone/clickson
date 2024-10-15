'use client'

import { Stack } from "@mui/system";
import { StyledContainer } from "./styles";
import { DataToFill } from "@/app/types/DataType";
import { ActivityDataFormDescription } from "./Description";
import { ActivityDataFormHeader } from "./Header";
import { QuestionTypeComponent } from "./QuestionTypeComponents/TableQuestion";
import { getSubCategoriesWithIdSessionCategory } from "@/api/categories";
import { getSessionSubCategoriesWithIdSessionCategory } from "@/api/sessions";
import { Params } from "@/app/types/Params";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubCategory } from "@/app/types/SubCategory";

interface ActivityDataFormProps {
    domain: string;
    dataToFill: DataToFill[];
    handleConfirm: (type: string, value: string) => void;
};

export const ActivityDataForm = ({ domain, dataToFill, handleConfirm }: ActivityDataFormProps) => {
    const params = useParams<Params>()
    const [sessionSubCategory, setSessionSubCategory] = useState<SubCategory[]>([]);

    const getSubCategories = async () => {
        const sessionSubCategories = await getSessionSubCategoriesWithIdSessionCategory(params.idsessioncategory)
        const idEmissionSubCategories = sessionSubCategories.map(s => s.id_emission_sub_categorie)
        const sessionSubCategory = await getSubCategoriesWithIdSessionCategory(idEmissionSubCategories)
        setSessionSubCategory(sessionSubCategory)
    }

    useEffect(() => {
        getSubCategories()
    }, []);

    const getQuestionComponent = (category: SubCategory) => {
        return <QuestionTypeComponent category={category} handleConfirm={handleConfirm} />;
    }

    return <StyledContainer>
        {sessionSubCategory.map(categorie =>
            <Stack key={categorie.id}>
                <ActivityDataFormHeader domain={domain} category={categorie.label} />
                <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: "row" }}>
                    <ActivityDataFormDescription description={categorie.detail} />
                    <Stack sx={{ marginLeft: "24px !important", flex: 1 }}>
                        {getQuestionComponent(categorie)}
                    </Stack>
                </Stack>
            </Stack>)}
    </StyledContainer>;
};
