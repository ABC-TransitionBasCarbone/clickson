'use client'

import { useEffect, useState } from "react";
import { CustomDialog } from "@/src/components/customDialog";
import { SubCategory } from "@/src/types/SubCategory";
import { DataInput } from "../../DataInput";
import { createEmission, getEmissionByIdSessionSub, getEmissionFactorsWithUnitsAndTypes } from "@/api/emissions";
import { EmissionFactor } from "@/src/types/EmissionFactor";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { DataTable } from "../../DataTable";
import { Emission } from "@/src/types/Emission";

interface QuestionTypeComponentProps {
    category: SubCategory;
}
export const QuestionTypeComponent = ({ category }: QuestionTypeComponentProps) => {
    const [saving, setSaving] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [open, setOpen] = useState(false);
    const [idEF, setIdEF] = useState(0)
    const [emissionFactors, setEmissionFactors] = useState<EmissionFactor[]>([])
    const [emissions, setEmissions] = useState<Emission[]>([])
    const [value, setValue] = useState("");

    const getEmissionFactorsAndEmissions = async () => {
        const emissionFactors = await getEmissionFactorsWithUnitsAndTypes(category.id)
        setEmissionFactors(emissionFactors)

        const emissions = await getEmissionByIdSessionSub(category.idSessionSubCategorie)
        setLoadingData(false)
        setEmissions(emissions.map(emission => ({
            ...emission,
            emissionFactor: emissionFactors.find(ef => ef.id === emission.idEmissionFactor),
        })))
    }

    useEffect(() => {
        setLoadingData(true)
        getEmissionFactorsAndEmissions()
    }, []);

    const handleClose = () => {
        setIdEF(0);
        setValue("");
        setOpen(false);
    };

    const handleAddData = async (idEF: number, value: string) => {
        const emission = await createEmission({
            idEmissionFactor: idEF,
            idSessionSubCategorie: category.idSessionSubCategorie,
            value: parseFloat(value)
        } as Emission)
        setEmissions(emissions.concat(emission))
    }

    return <>
        <CustomDialog
            open={open}
            titleLabel="abc-confirm-title"
            contentLabel="abc-confirm-duplicate"
            contentParams={{ idEF: idEF }}
            closeLabel="abc-yes"
            confirmLabel="abc-no"
            handleClose={handleClose}
        />
        <DataInput
            titleSelectInput={category.dataToFill?.titleSelectInput || ""}
            idEF={idEF}
            emissionFactors={emissionFactors}
            saving={saving}
            value={value}
            annualConsumptionText={category.dataToFill?.titleAnnualConsumptionInput || ""}
            setValue={setValue}
            setIdEF={setIdEF}
            handleAddData={handleAddData} />
        {loadingData
            ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                <CircularProgress />
            </Box>
            : <DataTable tableHeader={category.dataToFill?.tableHeader || []} emissions={emissions} handleDelete={() => { }} />
        }
    </>
};
