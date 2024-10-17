'use client'

import { FormControl, Stack, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import {  KeyboardArrowDown } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Option } from "@/src/models/Select/Option";
import { PrimaryButton } from "@/src/components/buttons/primaryButton";
import { classes, StyledInputData } from "./styles";

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

    return <StyledInputData>
    <Stack className={classes.input}>
        <FormControl className={classes.form}>
            <Typography className={classes.label}>{t(titleSelectInput)}</Typography>
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
    </Stack>
    <Stack className={classes.input}>
        <FormControl className={classes.form}>
                <Typography className={classes.label}>
                    {units ? `${t(annualConsumptionText)} ${units ? type.length > 0 ? "("+units.get(type)+")" : "" : ""}` : t(annualConsumptionText)}
                </Typography>
                <OutlinedInput
                    type='text'
                    name="annual_consumption"
                    value={value}
                    onChange={(text) => setValue(text.target.value)}
                />
        </FormControl>
    </Stack>
    <Stack className={classes.button}>
        <PrimaryButton disabled={saving} onClick={handleAddData}>
            {t('abc-add')}
        </PrimaryButton>
    </Stack>
</StyledInputData>
};
