import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface Metric {
  id: string;
  label: string;
  value: number;
  trend: "up" | "down" | "stable";
  percentage: number;
  icon: "trending-up" | "trending-down" | "activity" | "zap";
  color: string;
}

const initialMetrics: Metric[] = [
  {
    id: "engagement",
    label: "Engagement Rate",
    value: 24.5,
    trend: "up",
    percentage: 12.3,
    icon: "trending-up",
    color: "text-green-400"
  },
  {
    id: "messages",
    label: "Messages Sent",
    value: 12450,
    trend: "up",
    percentage: 8.7,
    icon: "activity",
    color: "text-blue-400"
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: 18.2,
    trend: "up",
    percentage: 5.4,
    icon: "zap",
    color: "text-purple-400"
  },
  {
    id: "bounce",
    label: "Bounce Rate",
    value: 15.8,
    trend: "down",
    percentage: 3.2,
    icon: "trending-down",
    color: "text-amber-400"
  }
];

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 0.5,
        percentage: metric.percentage + (Math.random() - 0.5) * 0.2
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "trending-up": return TrendingUp;
      case "trending-down": return TrendingDown;
      case "activity": return Activity;
      case "zap": return Zap;
      default: return Activity;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = getIcon(metric.icon);
        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-muted`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    metric.trend === "up" ? "text-green-600" : 
                    metric.trend === "down" ? "text-red-600" : "text-gray-600"
                  }`}>
                    {metric.trend === "up" ? "↗" : metric.trend === "down" ? "↘" : "→"}
                    {Math.abs(metric.percentage).toFixed(1)}%
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {metric.label}
                  </p>
                  <motion.div
                    className={`text-2xl font-bold ${metric.color}`}
                    key={metric.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {metric.id === "messages" 
                      ? Math.floor(metric.value).toLocaleString()
                      : `${metric.value.toFixed(1)}%`
                    }
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-1">
                    vs last period
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}