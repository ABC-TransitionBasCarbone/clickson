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

const CustomH6 = styled('h6')`
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 500;
    margin-top: 1rem;
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

    const labels = [t('energy'), t('foodService'), t('travel'), t('supplies'), t('fixedAssets')];
    const [excelData, setExcelData] = useState<number[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        document.title = `${session.name}`;
        if (excelData.length > 0) { return }
        session.sessionEmissionCategories.forEach((category, index) => {
            category.sessionEmissionSubCategories.forEach((subCategory) => {
                const subTotal = subCategory.sessionEmissions.reduce((acc, emission) => {
                    return acc + Number(emission.total)
                }, 0)
                excelData[index] = (excelData[index] || 0) + subTotal;

            });
        });

        setExcelData(excelData);
        setTotal(excelData.reduce((acc, value) => { return acc + value }))

    }, [excelData]);


    const handleExport = async () => {
        try {
            const arrayBuffer = await fetchExportFile();
            if (!arrayBuffer) {
                throw new Error('Failed to fetch the file');
            }

            const workbook = new ExcelJS.Workbook();

            await workbook.xlsx.load(arrayBuffer);

            const worksheet = workbook.getWorksheet('SummaryAndProfile');
            if (!worksheet) {
                throw new Error(`Sheet not found`);
            }

            worksheet.getCell('B6').value = excelData[0];
            worksheet.getCell('B7').value = excelData[1];
            worksheet.getCell('B8').value = excelData[2];
            worksheet.getCell('B9').value = excelData[3];
            worksheet.getCell('B10').value = excelData[4];

            worksheet.getCell('B11').value = total;
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

    return (total > 0 &&
        <Grid container>
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
            <StatsGrid item xs={12} md={6}>
                <InfoWrapper>
                    <DownloadButton onClick={handleExport}>
                        {t("download")} <Download sx={{ cursor: 'pointer' }} />
                    </DownloadButton>
                </InfoWrapper>



                <ChartWrapper>
                    <PieChart data={excelData} labels={labels} />
                </ChartWrapper>

            </StatsGrid>
            <StatsGrid item xs={12} md={6}>
                <Grid container spacing={3} columns={12} sx={{ paddingLeft: theme.spacing(3.75) }}>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>{t("energy")}</span>
                            <Box sx={{
                                color: 'primary.main',
                                marginTop: theme.spacing(1),
                            }}
                            >
                                {Math.round(excelData[0])} ({t('unit')})
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <StatsWrapper>
                            <span>{t("foodService")}</span>
                            <Box
                                sx={{
                                    color: 'error.main',
                                    marginTop: theme.spacing(1),
                                }}
                            >
                                {Math.round(excelData[1])} ({t('unit')})
                            </Box>
                        </StatsWrapper>
                    </Grid>
                    <Grid item xs={6}>
                        <StatsWrapper>
                            <span>{t("travel")}</span>
                            <Box
                                sx={{
                                    color: 'success.main',
                                    marginTop: theme.spacing(1),
                                }}
                            >
                                {Math.round(excelData[2])} ({t('unit')})
                            </Box>
                        </StatsWrapper>
                    </Grid>
                    <Grid item xs={6}>
                        <StatsWrapper>
                            <span>{t("supplies")}</span>
                            <Box sx={{
                                color: 'secondary.main',
                                marginTop: theme.spacing(1),
                            }}
                            >
                                {Math.round(excelData[3])} ({t('unit')})
                            </Box>
                        </StatsWrapper>
                    </Grid>
                    <Grid item xs={6}>
                        <StatsWrapper>
                            <span>{t("fixedAssets")}</span>
                            <Box sx={{
                                color: 'info.main',
                                marginTop: theme.spacing(1),
                            }}
                            >
                                {Math.round(excelData[4])} ({t('unit')})
                            </Box>
                        </StatsWrapper>
                    </Grid>
                </Grid>
            </StatsGrid>
        </Grid>
    )
}
