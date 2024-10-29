'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useTranslation } from "react-i18next";

interface CustomDialogProps {
    open: boolean;
    titleLabel: string;
    contentLabel: string;
    contentParams?: { [key: string]: number };
    closeLabel: string;
    confirmLabel: string;
    handleClose: () => void;
    handleConfirm: () => void;
};

export const CustomDialog = ({
    open,
    titleLabel,
    contentLabel,
    contentParams,
    closeLabel,
    confirmLabel,
    handleClose,
    handleConfirm
}: CustomDialogProps) => {
    const { t } = useTranslation();

    return <Dialog
        open={open}
        keepMounted={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            {t(titleLabel)}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {t(contentLabel, contentParams)}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} autoFocus color="primary">{t(closeLabel)}</Button>
            <Button onClick={handleConfirm} color="secondary">{t(confirmLabel)}</Button>
        </DialogActions>
    </Dialog>;
}
