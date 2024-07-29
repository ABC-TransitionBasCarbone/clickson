import {useEffect, useState} from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export const Stats = () => {
    const [chartColors, setChartColors] = useState({
        energie: '',
        restauration: '',
        deplacements: '',
        fournitures: '',
        immobilisations: ''
    });

    useEffect(() => {
        const root = getComputedStyle(document.documentElement);
        setChartColors({
            energie: root.getPropertyValue('--abc-blue').trim(),
            restauration: root.getPropertyValue('--abc-red').trim(),
            deplacements: root.getPropertyValue('--abc-green').trim(),
            fournitures: root.getPropertyValue('--abc-orange').trim(),
            immobilisations: root.getPropertyValue('--abc-violet').trim(),
        });
    }, []);

    const data = {
        labels: ['Energie', 'Restauration', 'Déplacements', 'Fournitures', 'Immobilisations'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [54434, 225882, 221, 12339, 6863],
                fill: false,
                backgroundColor: [
                    chartColors.energie,
                    chartColors.restauration,
                    chartColors.deplacements,
                    chartColors.fournitures,
                    chartColors.immobilisations
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
                        marginTop: 'var(--totalco2margintop)',
                        fontSize: 'var(--totalco2value)',
                        fontWeight: 'var(--secteursfontweight)'
                    }}>299739</Box>
                    <Box sx={{
                        color: 'text.primary',
                        marginTop: '30px',
                        fontSize: 'var(--totalco2label)',
                        marginLeft: 'var(--totalco2marginleft)'
                    }}>kgCO2e</Box>
                </div>
                <div className="chart">
                    <Doughnut data={data} options={options}/>
                </div>

            </Grid>
            <Grid item xs={12} md={6} className="stats">
                <Grid container spacing={3} columns={12} sx={{paddingLeft: '30px'}}>
                    <Grid item xs={6}>
                        <div className="stats-wrapper">
                            <span>Energie</span>
                            <Box sx={{
                                color: 'info.main',
                                marginTop: 'var(--secteursmargintop)',
                                fontSize: 'var(--secteursfontsize)',
                                fontWeight: 'var(--secteursfontweight)'}}
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
                                    marginTop: 'var(--secteursmargintop)',
                                    fontSize: 'var(--secteursfontsize)',
                                    fontWeight: 'var(--secteursfontweight)'}}
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
                                    marginTop: 'var(--secteursmargintop)',
                                    fontSize: 'var(--secteursmargintop)',
                                    fontWeight: 'var(--secteursfontweight)'}}
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
                                marginTop: 'var(--secteursmargintop)',
                                fontSize: 'var(--secteursmargintop)',
                                fontWeight: 'var(--secteursfontweight)'}}
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
                                marginTop: 'var(--secteursmargintop)',
                                fontSize: 'var(--secteursmargintop)',
                                fontWeight: 'var(--secteursfontweight)'}}
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
