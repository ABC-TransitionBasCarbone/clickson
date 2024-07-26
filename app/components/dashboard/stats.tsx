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

const data = {
    labels: ['Energie', 'Restauration', 'Déplacements', 'Fournitures', 'Immobilisations'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [54434, 225882, 221, 12339, 6863],
            fill: false,
            backgroundColor: ['#0288d1', '#d32f2f', '#2e7d32', '#ed6c02', '#9c27b0'],
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

export const Stats = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={6} className="stats">
                    <span>LE TOTAL</span>
                    <div className="info-wrapper">
                        <Box sx={{
                            color: 'text.primary',
                            marginTop: '15px',
                            fontSize: 32,
                            fontWeight: 'medium'
                        }}>299739</Box>
                        <Box sx={{
                            color: 'text.primary',
                            marginTop: '30px',
                            fontSize: 15,
                            marginLeft: '25px'
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
                                <Box sx={{color: 'info.main', marginTop: '40px', fontSize: 22, fontWeight: 'medium'}}>54434
                                    (kgCO2e)</Box>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="stats-wrapper">
                                <span>Restauration</span>
                                <Box
                                    sx={{color: 'error.main', marginTop: '40px', fontSize: 22, fontWeight: 'medium'}}>225882
                                    (kgCO2e)</Box>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="stats-wrapper">
                                <span>Déplacements</span>
                                <Box
                                    sx={{color: 'success.main', marginTop: '40px', fontSize: 20, fontWeight: 'medium'}}>221
                                    (kgCO2e)</Box>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="stats-wrapper">
                                <span>Fournitures</span>
                                <Box
                                    sx={{color: 'warning.main', marginTop: '40px', fontSize: 20, fontWeight: 'medium'}}>12339
                                    (kgCO2e)</Box>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="stats-wrapper">
                                <span>Immobilisations</span>
                                <Box sx={{
                                    color: 'secondary.main',
                                    marginTop: '40px',
                                    fontSize: 20,
                                    fontWeight: 'medium'
                                }}>6863 (kgCO2e)</Box>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}