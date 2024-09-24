'use client'

import { useTranslation } from "react-i18next";
import { CustomDialog } from "../../customDialog";
import { useState } from "react";
import { Button, CircularProgress, Divider, Grid } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { classes } from "./styles";
import { DataInput } from "./DataInput";
import { DataTable } from "./DataTable";
import { DataToFill } from "@/app/types/DataType";

interface ActivityDataFormProps {
    domain: string;
    category: string;
    description: string;
    dataToFill: DataToFill[];
    handleConfirm: (type: string, value: string) => void;
};

export const ActivityDataForm = ({ domain, category, description, dataToFill, handleConfirm }: ActivityDataFormProps) => {
    const theme = useTheme();
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

    return <>
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
        <h4>{t(`abc-${domain}`).toUpperCase()} - {t(`abc-${category}`).toUpperCase()}</h4>
        <Divider className={classes.divider} aria-hidden="true" />
        <Grid container spacing={2} marginTop={2}>
            <Grid container xs={12} sm={2} height={"fit-content"} alignItems={"flex-start"} justifyContent={"flex-end"}>
                <p className={classes.paragraph}>
                    {isExpanded ? description : description.slice(0, Number(description.length*0.50))}
                </p>
                <Button onClick={() => setIsExpanded((prev) => !prev)} className={classes.button}>
                    {isExpanded ? t('abc-read-less') : t('abc-read-more')}
                </Button>
            </Grid>
            {dataToFill.map((data) => 
                <>
                    <Grid container xs={12} sm={10} paddingLeft={2}>
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
                    </Grid>
                    <Grid container>
                        {loadingData
                            ?<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                                    <CircularProgress />
                                </Box>
                            : <DataTable tableHeader={data.tableHeader} data={[]} handleDelete={() => {}} />
                        }
                    </Grid>
                </>
            )}
        </Grid>
    </>;
};