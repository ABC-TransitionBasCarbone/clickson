'use client'

import { FormControl, Stack, MenuItem, OutlinedInput, Select, Typography, InputLabel, SelectChangeEvent } from "@mui/material";
import { KeyboardArrowDown, Label } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@/src/components/buttons/primaryButton";
import { classes, StyledInputData } from "./styles";
import { EmissionFactor } from "@/src/types/EmissionFactor";
import { Emission } from "@/src/types/Emission";
import { ChangeEvent, useState } from "react";

interface DataInputProps {
    titleSelectInput: string;
    emissionFactors: EmissionFactor[];
    saving: boolean;
    annualConsumptionText: string;
    handleAddData: (emission: Emission) => void;
}

export const DataInput = ({
    titleSelectInput,
    emissionFactors,
    saving,
    annualConsumptionText,
    handleAddData,
}: DataInputProps) => {
    const { t } = useTranslation();
    const [emission, setEmission] = useState<Emission>({
        emissionFactor: emissionFactors[0],
        value: 0,
    });

    const handleEmissionFactorChange = (event: SelectChangeEvent<number>) => {
        const {
            target: { value: factorId },
        } = event;

        const selectedFactor = emissionFactors.find(factor => factor.id === factorId);
        if (selectedFactor) {
            setEmission(prevEmission => ({
                ...prevEmission,
                emissionFactor: selectedFactor,
            }));
        }
    };

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmission(prevEmission => ({
            ...prevEmission,
            value: Number(event.target.value),
        }));

    };

    return <StyledInputData>

        <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>{t(titleSelectInput)}</Typography>
                <Select
                    IconComponent={KeyboardArrowDown}
                    value={emission.emissionFactor.id}
                    onChange={handleEmissionFactorChange}
                >
                    {emissionFactors.map((emissionFactor) => (
                        <MenuItem key={emissionFactor.id} value={emissionFactor.id}>{emissionFactor.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
        <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>
                    {emissionFactors[0] && `${t(annualConsumptionText)} (${emissionFactors[0].unit})`}
                </Typography>
                <OutlinedInput
                    type='text'
                    name="annual_consumption"
                    value={emission.value}
                    onChange={handleValueChange}
                />
            </FormControl>
        </Stack>
        <Stack className={classes.button}>
            <PrimaryButton disabled={saving} onClick={() => handleAddData(emission)}>
                {t('add')}
            </PrimaryButton>
        </Stack>
    </StyledInputData>
};
