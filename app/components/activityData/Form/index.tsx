'use client'

import { useTranslation } from "react-i18next";
import { CustomDialog } from "../../customDialog";
import { useState } from "react";
import { Stack } from "@mui/system";
import { StyledContainer } from "./styles";
import { DataToFill } from "@/app/types/DataType";
import { ActivityDataFormDescription } from "./Description";
import { ActivityDataFormHeader } from "./Header";
import { QuestionTypeComponent } from "./QuestionTypeComponents/TableQuestion";

interface ActivityDataFormProps {
    domain: string;
    dataToFill: DataToFill[];
    handleConfirm: (type: string, value: string) => void;
};

export const ActivityDataForm = ({ domain, dataToFill, handleConfirm }: ActivityDataFormProps) => {
    const { t } = useTranslation();

    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<string>("")
    const [value, setValue] = useState<string>("");

    const handleClose = () => {
        setType("");
        setValue("");
        setOpen(false);
    };

    const getQuestionComponent = (data: DataToFill) => {
        if (data.type === "table") return <QuestionTypeComponent data={data} value={value} type={type} setValue={setValue} setType={setType} />;
        return <></>;
    }

    return <StyledContainer>
        <CustomDialog
            open={open}
            titleLabel="abc-confirm-title"
            contentLabel="abc-confirm-duplicate"
            contentParams={{ type }}
            closeLabel="abc-yes"
            confirmLabel="abc-no"
            handleClose={handleClose}
            handleConfirm={() => handleConfirm(type, value)}
        />
        {dataToFill.map((data) => 
            <>
                <ActivityDataFormHeader domain={domain} category={data.category} />
                <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: "row" }}>
                    <ActivityDataFormDescription description={data.description} />
                    <Stack sx={{ marginLeft: "24px !important", flex: 1 }}>
                        {getQuestionComponent(data)}
                    </Stack>
                </Stack>
            </>
        )}
    </StyledContainer>;
};
