export const mockStats = {
  totalUsers: 24000,
  successRate: 98,
  integrations: 50,
  countries: 150
};

export const mockPerformanceData = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 78 },
  { month: 'Mar', value: 85 },
  { month: 'Apr', value: 72 },
  { month: 'May', value: 88 },
  { month: 'Jun', value: 95 }
];

export const mockEngagementData = [
  { platform: 'WhatsApp', value: 35, color: '#10b981' },
  { platform: 'Instagram', value: 25, color: '#8b5cf6' },
  { platform: 'Facebook', value: 20, color: '#3b82f6' },
  { platform: 'Telegram', value: 12, color: '#06b6d4' },
  { platform: 'SMS', value: 8, color: '#f59e0b' }
];

export const mockRealtimeMetrics = [
  {
    label: "Conversion Rate",
    value: "24.5%",
    change: "↗",
    color: "text-green-400",
    description: "vs last month"
  },
  {
    label: "Messages Sent",
    value: "1.2M",
    change: "",
    color: "text-blue-400",
    description: "this month"
  },
  {
    label: "Delivery Rate",
    value: "92.3%",
    change: "",
    color: "text-purple-400",
    description: "across platforms"
  },
  {
    label: "Revenue Generated",
    value: "$18.4K",
    change: "",
    color: "text-amber-400",
    description: "from campaigns"
  }
];
