'use client'

import { useState } from "react";
import { CustomDialog } from "@/src/components/customDialog";
import { DataInput } from "../../DataInput";
import { createEmission } from "@/api/emissions";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { DataTable } from "../../DataTable";
import { Emission } from "@/src/types/Emission";
import { SessionSubCategory } from "@/src/types/SessionSubCategory";

interface QuestionTypeComponentProps {
    sessionSubCategory: SessionSubCategory;
}

export const QuestionTypeComponent = ({ sessionSubCategory }: QuestionTypeComponentProps) => {
    const [saving, setSaving] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddData = async (emission: Emission) => {
        setLoadingData(true)
        setSaving(true)
        const emissionData = await createEmission({ ...emission, idSessionSubCategorie: sessionSubCategory.id })
        sessionSubCategory.sessionEmissions = sessionSubCategory.sessionEmissions.concat({ ...emissionData, ...emission })
        setSaving(false)
        setLoadingData(false)
    }

    return <>
        <CustomDialog
            open={open}
            titleLabel="abc-confirm-title"
            contentLabel="abc-confirm-duplicate"
            closeLabel="abc-yes"
            confirmLabel="abc-no"
            handleClose={handleClose}
        />
        <DataInput
            titleSelectInput={sessionSubCategory.dataToFill?.titleSelectInput || ""}
            emissionFactors={sessionSubCategory.emissionSubCategories.emissionFactors}
            saving={saving}
            annualConsumptionText={sessionSubCategory.dataToFill?.titleAnnualConsumptionInput || ""}
            handleAddData={handleAddData} />
        {loadingData
            ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                <CircularProgress />
            </Box>
            : <DataTable tableHeader={sessionSubCategory.dataToFill?.tableHeader || []} emissions={sessionSubCategory.sessionEmissions} handleDelete={() => { }} />
        }
    </>
};
