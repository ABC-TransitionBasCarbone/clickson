'use client'

import { useTranslation } from "react-i18next";
import { CustomDialog } from "../../customDialog";
import { useState } from "react";
import { Button, CircularProgress, Divider, Grid } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { classes, StyledContainer } from "./styles";
import { DataInput } from "./DataInput";
import { DataTable } from "./DataTable";
import { DataToFill } from "@/app/types/DataType";

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
    const [saving, setSaving] = useState<boolean>(false)
    const [loadingData, setLoadingData] = useState<boolean>(false)

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleAddData = () => {}

    const handleClose = () => {
        setType("");
        setValue("");
        setOpen(false);
    };

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
                <h4>{t(`abc-${domain}`).toUpperCase()} - {t(`abc-${data.category}`).toUpperCase()}</h4>
                <Divider className={classes.divider} aria-hidden="true" />
                <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: "row" }}>
                    <Stack sx={{ height: "fit-content", alignItems: "flex-end", justifyContent: "flex-end", width: "200px" }}>
                        <p className={classes.paragraph}>
                            {isExpanded ? data.description : data.description.slice(0, Number(data.description.length*0.50))}
                        </p>
                        <Button onClick={() => setIsExpanded((prev) => !prev)} className={classes.button}>
                            {isExpanded ? t('abc-read-less') : t('abc-read-more')}
                        </Button>
                    </Stack>
                    <Stack sx={{ marginLeft: "24px !important", flex: 1 }}>
                        <DataInput
                            titleSelectInput={data.titleSelectInput}
                            type={type}
                            options={data.options}
                            saving={saving}
                            value={value}
                            annualConsumptionText={data.titleAnnualConsumptionInput}
                            units={data.units}
                            setValue={setValue}
                            setType={setType}
                            handleAddData={handleAddData}
                        />
                        {loadingData
                            ?<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                                    <CircularProgress />
                                </Box>
                            : <DataTable tableHeader={data.tableHeader} data={[]} handleDelete={() => {}} />
                        }
                    </Stack>
                </Stack>
            </>
        )}
    </StyledContainer>;
};