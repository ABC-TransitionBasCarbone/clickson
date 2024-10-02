import { DataToFill } from "@/app/types/DataType";
import { DataInput } from "../../DataInput";
import { DataTable } from "../../DataTable";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { CustomDialog } from "@/app/components/customDialog";

interface QuestionTypeComponentProps {
    data: DataToFill;
    handleConfirm: (type: string, value: string) => void;
}
export const QuestionTypeComponent = ({ data, handleConfirm }: QuestionTypeComponentProps) => {
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
        <DataInput
            titleSelectInput={data.titleSelectInput}
            type={type}
            options={data.options}
            saving={saving}
            value={value}
            annualConsumptionText={data.titleAnnualConsumptionInput}
            {...(data.units && { units: data.units })}
            setValue={setValue}
            setType={setType}
            handleAddData={handleAddData}
        />
        {loadingData
            ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                    <CircularProgress />
                </Box>
            : <DataTable tableHeader={data.tableHeader} data={[]} handleDelete={() => {}} />
        }
    </>
};
