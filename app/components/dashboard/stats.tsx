import {Box, Grid} from "@mui/material";
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

import {useTheme} from '@mui/material/styles';

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
    ;
    return (
        <Grid container>
            <StatsGrid item xs={12} md={6} className="stats">
                <span>LE TOTAL</span>
                <InfoWrapper>
                    <Box sx={{
                        color: 'text.primary',
                        marginTop: theme.spacing(2),
                        fontSize: theme.spacing(4),
                        fontWeight: 'medium'
                    }}>299739</Box>
                    <Box sx={{
                        color: 'text.primary',
                        marginTop: '30px',
                        fontSize: theme.spacing(2),
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
                                color: 'info.main',
                                marginTop: theme.spacing(2),
                                fontSize: theme.spacing(2),
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
                                    fontSize: theme.spacing(2),
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
                                    fontSize: theme.spacing(2),
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
                                color: 'warning.main',
                                marginTop: theme.spacing(2),
                                fontSize: theme.spacing(2),
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
                                color: 'secondary.main',
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
