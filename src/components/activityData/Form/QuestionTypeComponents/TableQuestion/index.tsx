import { useEffect, useState } from "react";
import { CustomDialog } from "@/src/components/customDialog";
import { SubCategory } from "@/src/types/SubCategory";
import { DataInput } from "../../DataInput";
import { getEmissionFactorsWithUnitsAndTypes } from "@/api/emissions";
import { EmissionFactor } from "@/src/types/EmissionFactor";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { DataTable } from "../../DataTable";

interface QuestionTypeComponentProps {
    category: SubCategory;
    handleConfirm: (type: string, value: string) => void;
}
export const QuestionTypeComponent = ({ category, handleConfirm }: QuestionTypeComponentProps) => {
    const [saving, setSaving] = useState<boolean>(false)
    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<string>("")
    const [emissionFactors, setEmissionFactors] = useState<EmissionFactor[]>([])
    const [value, setValue] = useState<string>("");

    const getEmissionFactor = async () => {
        const emissionFactors = await getEmissionFactorsWithUnitsAndTypes(category.id)
        setEmissionFactors(emissionFactors)
    }

    useEffect(() => {
        getEmissionFactor()
    }, []);

    const handleClose = () => {
        setType("");
        setValue("");
        setOpen(false);
    };

    const handleAddData = () => { }
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
        <DataInput
            titleSelectInput={category.dataToFill?.titleSelectInput || ""}
            type={type}
            emissionFactors={emissionFactors}
            saving={saving}
            value={value}
            annualConsumptionText={category.dataToFill?.titleAnnualConsumptionInput || ""}
            setValue={setValue}
            setType={setType}
            handleAddData={handleAddData} />
        {loadingData
            ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                <CircularProgress />
            </Box>
            : <DataTable tableHeader={category.dataToFill?.tableHeader || []} data={[]} handleDelete={() => { }} />
        }
    </>
};
