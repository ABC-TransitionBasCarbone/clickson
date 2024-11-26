'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useTranslations } from 'next-intl'

interface CustomDialogProps {
    open: boolean;
    titleLabel: string;
    contentLabel: string;
    contentParams?: { [key: string]: number };
    closeLabel: string;
    confirmLabel: string;
    handleClose: () => void;
};

export const CustomDialog = ({
    open,
    titleLabel,
    contentLabel,
    contentParams,
    closeLabel,
    handleClose,
}: CustomDialogProps) => {
    const t = useTranslations('category');

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
            {/* <Button onClick={handleConfirm} color="secondary">{t(confirmLabel)}</Button> */}
        </DialogActions>
    </Dialog>;
}
