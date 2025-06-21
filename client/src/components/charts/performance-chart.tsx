import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PerformanceChartProps {
  data: Array<{ month: string; value: number }>;
  className?: string;
}

export function PerformanceChart({ data, className }: PerformanceChartProps) {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Campaign Performance',
        data: data.map(d => d.value),
        borderColor: 'hsl(221, 83%, 53%)',
        backgroundColor: 'hsla(221, 83%, 53%, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'hsl(221, 83%, 53%)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'hsl(220, 26%, 14%)',
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(210, 40%, 98%)',
        borderColor: 'hsl(217, 32%, 17.5%)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(217, 32%, 17.5%)',
        },
        ticks: {
          color: 'hsl(215, 20%, 65%)',
        }
      },
      x: {
        grid: {
          color: 'hsl(217, 32%, 17.5%)',
        },
        ticks: {
          color: 'hsl(215, 20%, 65%)',
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className={className}>
      <Line data={chartData} options={options} />
    </div>
  );
}
