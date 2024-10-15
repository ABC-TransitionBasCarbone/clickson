import { DataInput } from "../../DataInput";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { CustomDialog } from "@/app/components/customDialog";
import { DataToFill } from "@/app/types/DataToFill";
import { DataTable } from "../../DataTable";
import { SubCategory } from "@/app/types/SubCategory";

interface QuestionTypeComponentProps {
    category: SubCategory;
    handleConfirm: (type: string, value: string) => void;
}
export const QuestionTypeComponent = ({ category, handleConfirm }: QuestionTypeComponentProps) => {
    const [saving, setSaving] = useState<boolean>(false)
    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<string>("")
    const [value, setValue] = useState<string>("");

    const handleClose = () => {
        setType("");
        setValue("");
        setOpen(false);
    };

    const handleAddData = () => {}
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
        {/* <DataInput
            titleSelectInput={category.label}
            type={type}
            options={category.options}
            saving={saving}
            value={value}
            annualConsumptionText={category.titleAnnualConsumptionInput}
            {...(category.units && { units: category.units })}
            setValue={setValue}
            setType={setType}
            handleAddData={handleAddData}
        /> */}
        {/* {loadingData
            ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                    <CircularProgress />
                </Box>
            : <DataTable tableHeader={category.tableHeader} data={[]} handleDelete={() => {}} />
        } */}
    </>
};
