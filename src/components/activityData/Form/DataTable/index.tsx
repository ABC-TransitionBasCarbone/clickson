'use client'

import ConfirmationDialog from "@/src/components/ConfirmationDialog";
import { Emission } from "@/src/types/Emission";
import { CancelPresentationOutlined } from "@mui/icons-material";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DataTableProps {
    tableHeader: string[];
    emissions: Emission[];
    handleDelete: (row: Emission) => void;
}

export const DataTable = ({ tableHeader, emissions, handleDelete }: DataTableProps) => {
    const { t } = useTranslation();
    const [totalValues, setTotalValues] = useState<number>(0);
    const [totalUncertainty, setTotalUncertainty] = useState<number>(0);

    useEffect(() => {
        const values = emissions.reduce((acc, emission) => acc + emission.value, 0)
        console.log("🚀 ~ useEffect ~ emissions:", emissions)
        console.log("🚀 ~ useEffect ~ values:", values)
        setTotalValues(emissions.reduce((acc, emission) => acc + emission.value, 0));
        setTotalUncertainty(emissions.reduce((acc, emission) => acc + (emission.emissionFactor?.uncertainty || 0), 0));
    }, [emissions]);

    return <TableContainer>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    {tableHeader.map((val, _index) => (
                        <TableCell align={_index == 0 ? "left" : "right"} key={_index}>{val}</TableCell>
                    ))}
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {emissions.map((emission, _index) => (
                    <TableRow key={_index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{emission.emissionFactor?.type}</TableCell>
                        <TableCell align="right">{emission.value}</TableCell>
                        <TableCell align="right">{emission.emissionFactor?.label}</TableCell>
                        <TableCell align="right">{emission.emissionFactor?.uncertainty}</TableCell>
                        <TableCell align="right">
                            <ConfirmationDialog
                                title={t("abc-confirm-title")}
                                description={t("abc-confirm-delete")}
                                response={() => { handleDelete(emission) }}
                            >
                                {(showDialog: any) => (
                                    <IconButton onClick={showDialog} >
                                        <CancelPresentationOutlined sx={{ color: "red" }} />
                                    </IconButton>
                                )}
                                {/* TODO comprendre le code ci dessus */}
                            </ConfirmationDialog>
                        </TableCell>
                    </TableRow>
                ))}
                {emissions.length > 0 ? (
                    <TableRow >
                        <TableCell><strong>{t('abc-total-value')}</strong></TableCell>
                        <TableCell align="right"><strong>{totalValues}</strong></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"><strong>{totalUncertainty}</strong></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                ) : null}
            </TableBody>

        </Table>
    </TableContainer>
};
