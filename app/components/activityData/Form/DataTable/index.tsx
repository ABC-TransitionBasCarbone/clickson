'use client'

import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import { prepareValueForTranslation } from "@/app/helpers/text";
import { DataType } from "@/app/types/DataType";
import { CancelPresentationOutlined } from "@mui/icons-material";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DataTableProps {
    tableHeader: string[];
    data: DataType[];
    handleDelete: (row: DataType) => void;
}

export const DataTable = ({ tableHeader, data, handleDelete }: DataTableProps) => {
    const { t } = useTranslation();
    const [totalValues, setTotalValues] = useState<number>(0);
    const [totalUncertainty, setTotalUncertainty] = useState<number>(0);
    
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
            {data.map((row, _index) => (
                <TableRow key={_index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{prepareValueForTranslation(row.type)}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                    <TableCell align="right">{row.emission}</TableCell>
                    <TableCell align="right">{row.uncertainty}</TableCell>
                    <TableCell align="right">
                        <ConfirmationDialog
                            title={t("abc-confirm-title")}
                            description={t("abc-confirm-delete")}
                            response={()=> { handleDelete(row) }}
                        >
                            {(showDialog: any) => (
                                <IconButton onClick={showDialog} >
                                    <CancelPresentationOutlined sx={{color: "red"}}/>
                                </IconButton>
                            )}
                            {/* TODO comprendre le code ci dessus */}
                        </ConfirmationDialog>
                    </TableCell>
                </TableRow>
            ))}
            {data.length > 0 ?(
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
