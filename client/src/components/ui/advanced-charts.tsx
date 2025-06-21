import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AdvancedLineChartProps {
  data: any;
  title: string;
  className?: string;
}

export function AdvancedLineChart({ data, title, className }: AdvancedLineChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(215, 20%, 65%)',
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'hsl(220, 26%, 14%)',
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(210, 40%, 98%)',
        borderColor: 'hsl(217, 32%, 17.5%)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
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
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      }
    }
  };

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Line data={data} options={options} />
    </motion.div>
  );
}

interface AdvancedBarChartProps {
  data: any;
  title: string;
  className?: string;
}

export function AdvancedBarChart({ data, title, className }: AdvancedBarChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(215, 20%, 65%)',
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'hsl(220, 26%, 14%)',
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(210, 40%, 98%)',
        borderColor: 'hsl(217, 32%, 17.5%)',
        borderWidth: 1,
        cornerRadius: 8,
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
          display: false,
        },
        ticks: {
          color: 'hsl(215, 20%, 65%)',
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderWidth: 0,
      }
    }
  };

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Bar data={data} options={options} />
    </motion.div>
  );
}

interface AdvancedDoughnutChartProps {
  data: any;
  title: string;
  className?: string;
}

export function AdvancedDoughnutChart({ data, title, className }: AdvancedDoughnutChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'hsl(215, 20%, 65%)',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'hsl(220, 26%, 14%)',
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(210, 40%, 98%)',
        borderColor: 'hsl(217, 32%, 17.5%)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    cutout: '60%',
    elements: {
      arc: {
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: '#fff',
      }
    }
  };

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Doughnut data={data} options={options} />
    </motion.div>
  );
}

interface RadarChartProps {
  data: any;
  title: string;
  className?: string;
}

export function AdvancedRadarChart({ data, title, className }: RadarChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(215, 20%, 65%)',
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'hsl(220, 26%, 14%)',
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(210, 40%, 98%)',
        borderColor: 'hsl(217, 32%, 17.5%)',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: 'hsl(217, 32%, 17.5%)',
        },
        pointLabels: {
          color: 'hsl(215, 20%, 65%)',
          font: {
            size: 12,
          }
        },
        ticks: {
          color: 'hsl(215, 20%, 65%)',
          backdropColor: 'transparent',
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      }
    }
  };

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Radar data={data} options={options} />
    </motion.div>
  );
}