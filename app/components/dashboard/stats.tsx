"use client"

import {Box, Grid, Popover, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {Doughnut} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ArcElement, ChartOptions
} from 'chart.js';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useTheme} from '@mui/material/styles';
import ExcelJS from "exceljs";
import {fetchExportFile} from "@/app/helpers/export";
import React, {useState} from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

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
export const Stats = () => {
    const theme = useTheme();

    const data = {
        labels: ['Energie', 'Restauration', 'Déplacements', 'Fournitures', 'Immobilisations'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [54434, 225882, 221, 12339, 6863],
                fill: false,
                backgroundColor: [
                    theme.palette.primary.main,
                    theme.palette.error.main,
                    theme.palette.success.main,
                    theme.palette.secondary.main,
                    theme.palette.info.main
                ],
                border: 0
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart',
            },
        }
    }
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
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    <SaveAltIcon sx={{cursor: 'pointer'}} onClick={handleExport}/>
                </Typography>
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
                    <Typography sx={{ p: 1 }}>Télécharger les résultats de la session au format Excel</Typography>
                </Popover>

            </StatsGrid>
            <StatsGrid item xs={12} md={6}>
                <span>LE TOTAL</span>
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
                    <Doughnut data={data} options={options}/>
                </ChartWrapper>

            </StatsGrid>
            <StatsGrid item xs={12} md={6}>
                <Grid container spacing={3} columns={12} sx={{paddingLeft: theme.spacing(3.75)}}>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>Energie</span>
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
                            <span>Restauration</span>
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
                            <span>Déplacements</span>
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
                            <span>Fournitures</span>
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
                            <span>Immobilisations</span>
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
