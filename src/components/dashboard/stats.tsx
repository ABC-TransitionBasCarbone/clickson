"use client"

import { Box, Grid, Popover, Typography, Button, Divider } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import ExcelJS from "exceljs";
import { fetchExportFile } from "@/src/helpers/export";
import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl'
import PieChart from "@/src/components/charts/PieChart";
import { Download } from '@mui/icons-material';
import { Session } from '@/src/types/Session';
import { backgroundColors } from "@/src/constants/colors";

const StatsGrid = styled(Grid)`
    margin-top: 30px;
`;

const InfoWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: left;
`

const ChartWrapper = styled('div')`
    padding: 0 80px 0 0;
    max-width: 500px;
`

const StatsWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;
`

const DownloadButton = styled(Button)(({ theme }) => ({
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    minWidth: 150,
    minHeight: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }
}));

interface Props {
    session: Session,
}

export const Stats = ({ session }: Props) => {
    const theme = useTheme();
    const t = useTranslations('dashboard');

    const labels = [
        t('energy'),
        t('foodService'),
        t('travel'),
        t('supplies'),
        t('fixedAssets')];
    const [totalCategories, setTotalCategories] = useState<number[]>([]);
    const [totalSubCategories, setTotalSubCategorie] = useState<number[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        document.title = `${session.name}`;
        if (totalCategories.length > 0) { return }
        let idSubCategory = 0
        session.sessionEmissionCategories.forEach((category, cIndex) => {
            category.sessionEmissionSubCategories.forEach((subCategory, scIndex) => {
                const subTotal = subCategory.sessionEmissions.reduce((acc, emission) => {
                    return acc + Number(emission.total)
                }, 0)
                totalCategories[cIndex] = (totalCategories[cIndex] || 0) + subTotal;
                idSubCategory++
                subCategory.sessionEmissions.forEach((emission) => {
                    totalSubCategories[idSubCategory] = (totalSubCategories[idSubCategory] || 0) + Number(emission.total);
                })
            });
        });

        console.log("session : ", session)

        setTotalSubCategorie(totalSubCategories);
        setTotalCategories(totalCategories);
        setTotal(totalCategories.reduce((acc, value) => { return acc + value }))
    }, [totalCategories]);

    const handleExport = async () => {
        try {
            const arrayBuffer = await fetchExportFile();
            if (!arrayBuffer) {
                throw new Error('Failed to fetch the file');
            }

            const workbook = new ExcelJS.Workbook();

            await workbook.xlsx.load(arrayBuffer);
            const synthese = workbook.getWorksheet("Synthèse & Profil");

            if (!synthese) {
                throw new Error(`synthese not found`);
            }

            // Fill total emissions by categories   
            totalCategories.forEach((data, index) => {
                synthese.getCell(`B${6 + index}`).value = data;
            });

            // Fill total emissions by sub categories   
            totalSubCategories.forEach((data, index) => {
                synthese.getCell(`C${13 + index}`).value = data;
            });

            const buffer = await workbook.xlsx.writeBuffer();

            const blob = new Blob([buffer], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'clickson_report.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            throw ('Error:' + error);
        }
    };

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return <Grid container>
        <Typography sx={{ marginTop: 5 }} variant="h5" >{t('emissionsProfil')}   ({t('unit')}) de {session.name}</Typography>
        <Divider aria-hidden="true" sx={{ marginTop: theme.spacing(1) }} />
        <StatsGrid item xs={12} sx={{
            display: 'flex',
            justifyContent: 'flex-end',
        }}>
            <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none' }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>{t("downloadExcel")}</Typography>
            </Popover>

        </StatsGrid>
        {total > 0 &&
            <StatsGrid item xs={12} md={6}>
                <InfoWrapper>
                    <DownloadButton onClick={handleExport}>
                        {t("download")} <Download sx={{ cursor: 'pointer' }} />
                    </DownloadButton>
                </InfoWrapper>
                <ChartWrapper>
                    <PieChart data={totalCategories} labels={labels} />
                </ChartWrapper>
            </StatsGrid>
        }
        <StatsGrid item xs={12} md={6}>
            <Grid container spacing={3} columns={12} sx={{ paddingLeft: theme.spacing(3.75) }}>
                {
                    labels.map((label, index) => (<Grid key={index} item xs={6}>
                        <StatsWrapper>
                            <span>{label}</span>
                            <Box sx={{
                                color: backgroundColors[index],
                                marginTop: theme.spacing(1),
                            }}
                            >
                                {Math.round(totalCategories[index])} ({t('unit')})
                            </Box>
                        </StatsWrapper>
                    </Grid>
                    ))
                }
            </Grid>
        </StatsGrid>
    </Grid>
}
