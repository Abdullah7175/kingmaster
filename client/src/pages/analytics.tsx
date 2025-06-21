import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { EngagementChart } from "@/components/charts/engagement-chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { mockPerformanceData, mockEngagementData, mockRealtimeMetrics } from "@/lib/mock-data";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Target,
  Download,
  Calendar,
  BarChart3,
  PieChart
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [platformFilter, setPlatformFilter] = useState("all");

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['/api/analytics?userId=1']
  });

  const { data: campaigns } = useQuery({
    queryKey: ['/api/campaigns?userId=1']
  });

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Deep insights into your marketing performance across all platforms.
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">90 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockRealtimeMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.label}
                      </p>
                      <div className={`text-2xl font-bold ${metric.color}`}>
                        {metric.change} {metric.value}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {metric.description}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-muted">
                      {index === 0 && <TrendingUp className={`h-6 w-6 ${metric.color}`} />}
                      {index === 1 && <MessageSquare className={`h-6 w-6 ${metric.color}`} />}
                      {index === 2 && <Target className={`h-6 w-6 ${metric.color}`} />}
                      {index === 3 && <Users className={`h-6 w-6 ${metric.color}`} />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Campaign Performance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <PerformanceChart data={mockPerformanceData} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-purple-600" />
                  Platform Engagement Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <EngagementChart data={mockEngagementData} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Campaign Performance Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Campaign</th>
                        <th className="text-left py-2">Platform</th>
                        <th className="text-left py-2">Sent</th>
                        <th className="text-left py-2">Delivered</th>
                        <th className="text-left py-2">Opened</th>
                        <th className="text-left py-2">CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns?.slice(0, 5).map((campaign: any) => (
                        <tr key={campaign.id} className="border-b">
                          <td className="py-3">
                            <div>
                              <p className="font-medium">{campaign.name}</p>
                              <p className="text-sm text-muted-foreground">{campaign.status}</p>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="capitalize">{campaign.platform}</span>
                          </td>
                          <td className="py-3">
                            {campaign.stats?.sent || 0}
                          </td>
                          <td className="py-3">
                            {campaign.stats?.delivered || 0}
                          </td>
                          <td className="py-3">
                            {campaign.stats?.opened || 0}
                          </td>
                          <td className="py-3">
                            <span className="text-green-600 font-medium">
                              {campaign.stats?.clicked && campaign.stats?.sent 
                                ? ((campaign.stats.clicked / campaign.stats.sent) * 100).toFixed(1)
                                : 0}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Platform Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockEngagementData.map((platform) => (
                  <div key={platform.platform} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{platform.platform}</p>
                      <p className="text-sm text-muted-foreground">Engagement</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: platform.color }}>
                        {platform.value}%
                      </p>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: platform.color,
                            width: `${platform.value}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Advanced Analytics Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Engagement Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <h3 className="text-2xl font-bold text-green-600">↗ 24.5%</h3>
                    <p className="text-sm text-muted-foreground">Open Rate</p>
                    <p className="text-xs text-muted-foreground mt-1">vs last period</p>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-600">↗ 18.2%</h3>
                    <p className="text-sm text-muted-foreground">Click Rate</p>
                    <p className="text-xs text-muted-foreground mt-1">vs last period</p>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <h3 className="text-2xl font-bold text-purple-600">↗ 12.8%</h3>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-xs text-muted-foreground mt-1">vs last period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
