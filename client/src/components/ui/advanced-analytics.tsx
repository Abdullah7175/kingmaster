import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvancedLineChart, AdvancedBarChart, AdvancedDoughnutChart, AdvancedRadarChart } from "@/components/ui/advanced-charts";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Target, 
  Activity,
  Eye,
  Heart,
  Share2,
  Calendar,
  Filter,
  Download
} from "lucide-react";

interface AdvancedAnalyticsProps {
  className?: string;
}

export function AdvancedAnalytics({ className }: AdvancedAnalyticsProps) {
  // Sample analytics data - in real app this would come from API
  const campaignPerformance = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Reach',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4
    }, {
      label: 'Engagement',
      data: [8000, 12000, 9000, 18000, 15000, 22000],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4
    }]
  };

  const platformBreakdown = {
    labels: ['WhatsApp', 'Instagram', 'Facebook', 'Telegram', 'SMS'],
    datasets: [{
      data: [35, 25, 20, 12, 8],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(14, 165, 233, 0.8)',
        'rgba(245, 158, 11, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const audienceInsights = {
    labels: ['Engagement', 'Reach', 'Conversion', 'Retention', 'Growth'],
    datasets: [{
      label: 'Current Performance',
      data: [85, 75, 65, 80, 70],
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'rgb(99, 102, 241)',
      pointBackgroundColor: 'rgb(99, 102, 241)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(99, 102, 241)'
    }]
  };

  const conversionFunnel = {
    labels: ['Impressions', 'Clicks', 'Leads', 'Conversions'],
    datasets: [{
      label: 'Conversion Rate',
      data: [100000, 15000, 3500, 1200],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)'
      ]
    }]
  };

  const keyMetrics = [
    {
      title: "Total Reach",
      value: "2.4M",
      change: "+15.3%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Engagement Rate",
      value: "8.2%",
      change: "+2.1%",
      trend: "up",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Click-through Rate",
      value: "3.7%",
      change: "-0.5%",
      trend: "down",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "Conversion Rate",
      value: "12.4%",
      change: "+4.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  const topCampaigns = [
    {
      name: "Summer Product Launch",
      platform: "Instagram",
      reach: "1.2M",
      engagement: "9.4%",
      conversion: "15.2%",
      status: "active"
    },
    {
      name: "Holiday Special Offer",
      platform: "WhatsApp",
      reach: "800K",
      engagement: "12.1%",
      conversion: "18.7%",
      status: "completed"
    },
    {
      name: "Brand Awareness Campaign",
      platform: "Facebook",
      reach: "2.1M",
      engagement: "6.8%",
      conversion: "8.3%",
      status: "paused"
    }
  ];

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Advanced Analytics</h2>
            <p className="text-muted-foreground">
              Comprehensive insights into your marketing performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glassmorphism">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-background ${metric.color}`}>
                      <metric.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <AdvancedLineChart
                  data={campaignPerformance}
                  title="Campaign Performance Trends"
                  className="h-80"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AdvancedDoughnutChart
                  data={platformBreakdown}
                  title="Platform Distribution"
                  className="h-80"
                />
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCampaigns.map((campaign, index) => (
                    <motion.div
                      key={campaign.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'completed' ? 'secondary' : 'outline'}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm font-medium">{campaign.reach}</p>
                          <p className="text-xs text-muted-foreground">Reach</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{campaign.engagement}</p>
                          <p className="text-xs text-muted-foreground">Engagement</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{campaign.conversion}</p>
                          <p className="text-xs text-muted-foreground">Conversion</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <AdvancedRadarChart
              data={audienceInsights}
              title="Audience Insights Performance"
              className="h-96"
            />
          </TabsContent>

          <TabsContent value="conversion" className="space-y-6">
            <AdvancedBarChart
              data={conversionFunnel}
              title="Conversion Funnel Analysis"
              className="h-80"
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}