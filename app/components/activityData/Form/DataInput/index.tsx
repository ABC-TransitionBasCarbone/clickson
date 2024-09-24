'use client'

import { FormControl, Grid, MenuItem, OutlinedInput, Select } from "@mui/material";
import { StyledInputData } from "./styles";
import { KeyboardArrowDown, Label } from "@mui/icons-material";
import { classes } from "./styles";
import { useTranslation } from "react-i18next";
import { Option } from "@/app/models/Select/Option";
import { PrimaryButton } from "@/app/components/buttons/primaryButton";

interface DataInputProps {
    titleSelectInput: string;
    type: string;
    options: Option[];
    saving: boolean;
    value: string;
    annualConsumptionText: string;
    units?: Map<string, string> | null,
    setValue: (value: string) => void;
    setType: (type: string) => void;
    handleAddData: () => void;
}
export const DataInput = ({
    titleSelectInput,
    type,
    options,
    saving,
    value,
    annualConsumptionText,
    units,
    setValue,
    setType,
    handleAddData,
}: DataInputProps) => {
    const { t } = useTranslation();

   return <StyledInputData container>
    <Grid container xs={12} sm={4} paddingLeft={2} paddingRight={2}>
        <FormControl className={classes.form}>
                <Label className={classes.label} >{t(titleSelectInput)}</Label>
                <Select
                    IconComponent={KeyboardArrowDown}
                    value={type}
                    onChange={(text)=> setType(text.target.value)}
                >
                    {options.map((option, _index) => (
                        <MenuItem key={_index} value={option.value}>{option.title}</MenuItem>
                    ))}
                </Select>
        </FormControl>
    </Grid>
    <Grid container xs={12} sm={4} paddingLeft={2} paddingRight={2}>
        <FormControl className={classes.form}>
                <Label className={classes.label}>
                    {!units ? t(annualConsumptionText) : `${t(annualConsumptionText)} ${units ? type.length > 0 ? "("+units.get(type)+")" : "" : ""}`}
                    titleSelectInput
                </Label>
                <OutlinedInput 
                    placeholder=""
                    type='text'
                    name="annual_consumption"
                    value={value}
                    onChange={(text) => setValue(text.target.value)}
                />
        </FormControl>
    </Grid>
    <Grid container xs={12} sm={4} paddingLeft={2} paddingRight={2} alignItems={'self-start'} justifyContent={'center'}>
        <PrimaryButton disabled={saving} onClick={handleAddData}>
            {t('abc-add')}
        </PrimaryButton>
    </Grid>
</StyledInputData>
};
