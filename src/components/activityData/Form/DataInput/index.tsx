'use client'

import { FormControl, Stack, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@/src/components/buttons/primaryButton";
import { classes, StyledInputData } from "./styles";
import { EmissionFactor } from "@/src/types/EmissionFactor";
import { useEffect } from "react";

interface DataInputProps {
    titleSelectInput: string;
    type: string;
    emissionFactors: EmissionFactor[];
    saving: boolean;
    value: string;
    annualConsumptionText: string;
    setValue: (value: string) => void;
    setType: (type: string) => void;
    handleAddData: () => void;
}

export const DataInput = ({
    titleSelectInput,
    emissionFactors: emissionFactors,
    saving,
    value,
    annualConsumptionText,
    type,
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
                    onChange={(text) => setType(text.target.value)}
                >
                    {emissionFactors[0] && emissionFactors.map((emissionFactor, _index) => (
                        <MenuItem key={_index} value={emissionFactor.value}>{emissionFactor.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
        <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>
                    {`${t(annualConsumptionText)} `} {emissionFactors[0] && ('(' + emissionFactors[0]?.unit + ')')}
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
