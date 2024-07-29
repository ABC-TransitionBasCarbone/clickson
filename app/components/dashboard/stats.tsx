import {Box, Grid} from "@mui/material";
import {Doughnut} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ArcElement
} from 'chart.js';

import { useTheme } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

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
                    theme.palette.abcBlue.main,
                    theme.palette.abcRed.main,
                    theme.palette.abcGreen.main,
                    theme.palette.abcOrange.main,
                    theme.palette.abcViolet.main
                ],
                border: 0
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart',
            },
        },
    };
    return (
        <Grid container>
            <Grid item xs={12} md={6} className="stats">
                <span>LE TOTAL</span>
                <div className="info-wrapper">
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
                </div>
                <div className="chart">
                    <Doughnut data={data} options={options}/>
                </div>

            </Grid>
            <Grid item xs={12} md={6} className="stats">
                <Grid container spacing={3} columns={12} sx={{paddingLeft: theme.spacing(3.75)}}>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>Energie</span>
                            <Box sx={{
                                color: 'info.main',
                                marginTop: theme.spacing(2),
                                fontSize: theme.spacing(2),
                                fontWeight: 'medium'}}
                            >
                                54434 (kgCO2e)
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>Restauration</span>
                            <Box
                                sx={{
                                    color: 'error.main',
                                    marginTop: theme.spacing(2),
                                    fontSize: theme.spacing(2),
                                    fontWeight: 'medium'}}
                            >
                                225882 (kgCO2e)
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>Déplacements</span>
                            <Box
                                sx={{
                                    color: 'success.main',
                                    marginTop: theme.spacing(2),
                                    fontSize: theme.spacing(2),
                                    fontWeight: 'medium'}}
                            >
                                221 (kgCO2e)
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>Fournitures</span>
                            <Box sx={{
                                color: 'warning.main',
                                marginTop: theme.spacing(2),
                                fontSize: theme.spacing(2),
                                fontWeight: 'medium'}}
                            >
                                12339 (kgCO2e)
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>Immobilisations</span>
                            <Box sx={{
                                color: 'secondary.main',
                                marginTop: theme.spacing(2),
                                fontSize: theme.spacing(2),
                                fontWeight: 'medium'}}
                            >
                                6863 (kgCO2e)
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
