import { DataToFill } from "@/app/types/DataType";
import { DataInput } from "../../DataInput";
import { DataTable } from "../../DataTable";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

interface QuestionTypeComponentProps {
    data: DataToFill;
    type: string;
    value: string;
    setValue: (value: string) => void;
    setType: (type: string) => void;
}
export const QuestionTypeComponent = ({ data, value, type, setValue, setType }: QuestionTypeComponentProps) => {
    const [saving, setSaving] = useState<boolean>(false)
    const [loadingData, setLoadingData] = useState<boolean>(false)

    const handleAddData = () => {}

    return <>
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
            ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                    <CircularProgress />
                </Box>
            : <DataTable tableHeader={data.tableHeader} data={[]} handleDelete={() => {}} />
        }
    </>
};
