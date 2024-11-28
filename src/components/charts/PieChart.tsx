import {Pie} from "react-chartjs-2";
import React, {useRef, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ArcElement, ChartOptions, ChartData
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import 'chartjs-plugin-annotation';
import {Checkbox, Grid } from "@mui/material";
import {styled} from "@mui/system";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

type PieChartProps = {
    data: number[];
    labels: string[];
};

const BodyGrid = styled(Grid)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
}));

const PieChart: React.FC<PieChartProps> = ({data, labels}) => {
    const theme = useTheme();
    const chartRef = useRef<any>(null);
    const [visibleData, setVisibleData] = useState(data);
    const [hiddenIndices, setHiddenIndices] = useState<Set<number>>(new Set());

    const total = data.reduce((sum, value) => sum + value, 0);
    const minVisiblePercentage = 100 / data.length / 10; // Example: Hide data less than 2%

    const backgroundColors = [
        theme.palette.primary.main,
        theme.palette.error.main,
        theme.palette.success.main,
        theme.palette.secondary.main,
        theme.palette.info.main
    ];

    const handleLabelClick = (index: number) => {
        setHiddenIndices(prevIndices => {
            const newIndices = new Set(prevIndices);
            if (newIndices.has(index)) {
                newIndices.delete(index);
            } else {
                newIndices.add(index);
            }
            return newIndices;
        });
    };

    const chartData: ChartData<'pie', number[], string> = {
        labels: visibleData.map((_, index) => labels[data.indexOf(visibleData[index])]),
        datasets: [
            {
                data: data.map((value, index) => (hiddenIndices.has(index) ? 0 : value)),
                backgroundColor: visibleData.map((_, index) => backgroundColors[data.indexOf(visibleData[index])]),
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Chart',
            },
            datalabels: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => {
                        const value: any = tooltipItem.raw;
                        const percentage = (value / total) * 100;
                        return `${tooltipItem.label}: ${percentage.toFixed(2)}%`;
                    },
                },
            },
        },
    };
    return (
        <BodyGrid container spacing={0} columns={12}>
            <Grid item xs={8}>
                <Pie data={chartData} options={options} ref={chartRef}/>
            </Grid>
            <Grid item xs={4} sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                {labels.map((label, index) => (
                    <Grid
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            fontSize: '14px',
                            lineHeight: '1.2',
                        }}

                    >
                        <Checkbox onChange={() => handleLabelClick(index)}/>
                        <Grid
                            style={{
                                minWidth: '30px',
                                height: '10px',
                                backgroundColor: backgroundColors[index],
                                marginRight: theme.spacing(1),
                            }}
                        >

                        </Grid>
                        <span style={{textDecoration: hiddenIndices.has(index) ? 'line-through' : 'none'}}>
                        <strong>{label}</strong><p>{((data[index] / total) * 100).toFixed(2)}%</p>
                    </span>
                    </Grid>
                ))}
            </Grid>
        </BodyGrid>
    )
};

export default PieChart;
