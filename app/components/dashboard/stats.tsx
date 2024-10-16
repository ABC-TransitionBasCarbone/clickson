"use client"

import {Box, Grid, Popover, Typography, Button} from "@mui/material";
import {styled} from "@mui/system";

import {useTheme} from '@mui/material/styles';
import ExcelJS from "exceljs";
import {fetchExportFile} from "@/app/helpers/export";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {convertToPercentage} from "@/app/helpers/helpers";
import PieChart from "@/app/components/charts/PieChart";
import { Download } from '@mui/icons-material';


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

const DownloadButton = styled(Button)(({theme}) => ({
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

export const Stats = () => {
    const theme = useTheme();
    const {t} = useTranslation();

    const labels = [t("abc-energy"), t("abc-food-service"), t('abc-travel'), t('abc-supplies'), t('abc-fixed-assets')];
    const data = convertToPercentage([54434, 225882, 221, 12339, 6863])


    const handleExport = async () => {
        try {
            const arrayBuffer = await fetchExportFile();

            if (!arrayBuffer) {
                throw new Error('Failed to fetch the file');
            }

            const workbook = new ExcelJS.Workbook();

            await workbook.xlsx.load(arrayBuffer);

            const worksheet = workbook.getWorksheet('Summary and profile');
            if (!worksheet) {
                throw new Error(`Sheet not found`);
            }

            const energy = 54434;
            const foodService = 225882;
            const travel = 221;
            const supplies = 12339;
            const fixedAssets = 6893;

            const total = energy + foodService + travel + supplies + fixedAssets;
            worksheet.getCell('B6').value = energy;
            worksheet.getCell('B7').value = foodService;
            worksheet.getCell('B8').value = travel;
            worksheet.getCell('B9').value = supplies;
            worksheet.getCell('B10').value = fixedAssets;

            worksheet.getCell('B11').value = total;
            const buffer = await workbook.xlsx.writeBuffer();

            const blob = new Blob([buffer], {type: 'application/octet-stream'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'clickson_report.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Grid container>
            <StatsGrid item xs={12} sx={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <DownloadButton
                    onClick={handleExport}
                >
                 {t("abc-download")} <Download sx={{cursor: 'pointer'}} />
                </DownloadButton>
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
                    <Typography sx={{ p: 1 }}>{t("abc-download-excel")}</Typography>
                </Popover>

            </StatsGrid>
            <StatsGrid item xs={12} md={6}>
                <span>{t('abc-total')}</span>
                <InfoWrapper>
                    <Box sx={{
                        color: 'text.primary',
                        marginTop: theme.spacing(2),
                        fontSize: 32,
                        fontWeight: 'medium'
                    }}>299739</Box>
                    <Box sx={{
                        color: 'text.primary',
                        marginTop: '30px',
                        fontSize: 16,
                        marginLeft: theme.spacing(2)
                    }}>kgCO2e</Box>
                </InfoWrapper>
                <ChartWrapper>
                    <PieChart data={data} labels={labels} />
                </ChartWrapper>

            </StatsGrid>
            <StatsGrid item xs={12} md={6}>
                <Grid container spacing={3} columns={12} sx={{paddingLeft: theme.spacing(3.75)}}>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>{t("abc-energy")}</span>
                            <Box sx={{
                                color: 'primary.main',
                                marginTop: theme.spacing(2),
                                fontSize: 16,
                                fontWeight: 'medium'
                            }}
                            >
                                54434 (kgCO2e)
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <StatsWrapper>
                            <span>{t("abc-food-service")}</span>
                            <Box
                                sx={{
                                    color: 'error.main',
                                    marginTop: theme.spacing(2),
                                    fontSize: 16,
                                    fontWeight: 'medium'
                                }}
                            >
                                225882 (kgCO2e)
                            </Box>
                        </StatsWrapper>
                    </Grid>
                    <Grid item xs={6}>
                        <StatsWrapper>
                            <span>{t("abc-travel")}</span>
                            <Box
                                sx={{
                                    color: 'success.main',
                                    marginTop: theme.spacing(2),
                                    fontSize: 16,
                                    fontWeight: 'medium'
                                }}
                            >
                                221 (kgCO2e)
                            </Box>
                        </StatsWrapper>
                    </Grid>
                    <Grid item xs={6}>
                        <StatsWrapper>
                            <span>{t("abc-supplies")}</span>
                            <Box sx={{
                                color: 'secondary.main',
                                marginTop: theme.spacing(2),
                                fontSize: 16,
                                fontWeight: 'medium'
                            }}
                            >
                                12339 (kgCO2e)
                            </Box>
                        </StatsWrapper>
                    </Grid>
                    <Grid item xs={6}>
                        <StatsWrapper>
                            <span>{t("abc-fixed-assets")}</span>
                            <Box sx={{
                                color: 'info.main',
                                marginTop: theme.spacing(2),
                                fontSize: theme.spacing(2),
                                fontWeight: 'medium'
                            }}
                            >
                                6863 (kgCO2e)
                            </Box>
                        </StatsWrapper>
                    </Grid>
                </Grid>
            </StatsGrid>
        </Grid>
    )
}
