'use client'

import { FormControl, Stack, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@/src/components/buttons/primaryButton";
import { classes, StyledInputData } from "./styles";
import { EmissionFactor } from "@/src/types/EmissionFactor";
import { useEffect } from "react";
import test from "node:test";

interface DataInputProps {
    titleSelectInput: string;
    idEF: number;
    emissionFactors: EmissionFactor[];
    saving: boolean;
    value: string;
    annualConsumptionText: string;
    setValue: (value: string) => void;
    setIdEF: (idEF: number) => void;
    handleAddData: (idEF: number, value: string) => void;
}

export const DataInput = ({
    titleSelectInput,
    emissionFactors: emissionFactors,
    saving,
    value,
    annualConsumptionText,
    idEF,
    setValue,
    setIdEF,
    handleAddData,
}: DataInputProps) => {
    const { t } = useTranslation();

    const getIdEF = (idEF: number) => (idEF === 0 && emissionFactors[0]) ? emissionFactors[0].id : idEF;

    return <StyledInputData>
        {emissionFactors[0] && <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>{t(titleSelectInput)}</Typography>
                <Select
                    IconComponent={KeyboardArrowDown}
                    value={getIdEF(idEF)}
                    onChange={(id) => setIdEF(id.target.value as number)}
                >
                    {emissionFactors.map((emissionFactor, _index) => (
                        <MenuItem key={_index} value={emissionFactor.id}>{emissionFactor.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>}
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
            <PrimaryButton disabled={saving} onClick={() => idEF !== 0 && handleAddData(idEF, value)}>
                {t('abc-add')}
            </PrimaryButton>
        </Stack>
    </StyledInputData>
};
