import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RealTimeMetrics } from "@/components/ui/real-time-metrics";
import { CampaignWizard } from "@/components/ui/campaign-wizard";
import { NotificationCenter } from "@/components/ui/notification-center";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { EngagementChart } from "@/components/charts/engagement-chart";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockPerformanceData, mockEngagementData } from "@/lib/mock-data";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  MessageSquare,
  TrendingUp,
  DollarSign,
  Plus,
  Activity,
  Target,
  Zap,
  Bell,
  Settings,
  Download,
  BarChart3
} from "lucide-react";

export default function Dashboard() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/dashboard/stats?userId=1']
  });

  const { data: campaigns } = useQuery({
    queryKey: ['/api/campaigns?userId=1']
  });

  const { data: contacts } = useQuery({
    queryKey: ['/api/contacts?userId=1']
  });

  const createCampaignMutation = useMutation({
    mutationFn: (campaign: any) => apiRequest('POST', '/api/campaigns', { ...campaign, userId: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
    }
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

  const dashboardStats = [
    {
      title: "Total Campaigns",
      value: (stats as any)?.totalCampaigns || 0,
      icon: MessageSquare,
      change: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Active Contacts",
      value: (stats as any)?.activeContacts || 0,
      icon: Users,
      change: "+8%",
      color: "text-green-600"
    },
    {
      title: "Messages Sent",
      value: (stats as any)?.totalMessagesSent || 0,
      icon: TrendingUp,
      change: "+24%",
      color: "text-purple-600",
      suffix: "K"
    },
    {
      title: "Engagement Rate",
      value: ((stats as any)?.avgEngagementRate * 100) || 24.5,
      icon: Target,
      change: "+5%",
      color: "text-amber-600",
      suffix: "%"
    }
  ];

  const recentCampaigns = (campaigns as any)?.slice(0, 3) || [];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your campaigns.
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button onClick={() => setIsWizardOpen(true)} className="gradient-bg hover:scale-105 transition-transform">
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
              <Button variant="outline" onClick={() => setIsNotificationOpen(true)}>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Real-time Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <RealTimeMetrics />
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <div className="text-2xl font-bold">
                          <AnimatedCounter 
                            end={stat.value} 
                            suffix={stat.suffix || ""} 
                          />
                        </div>
                        <p className={`text-xs ${stat.color} font-medium`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-muted`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Campaign Performance
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
                  <Target className="mr-2 h-5 w-5 text-purple-600" />
                  Platform Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <EngagementChart data={mockEngagementData} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCampaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {campaign.platform} • {campaign.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {campaign.stats && typeof campaign.stats === 'object' 
                            ? (campaign.stats as any).sent || 0 
                            : 0} sent
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(campaign.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-amber-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Import Contacts
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Templates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Campaign Creation Wizard */}
      <CampaignWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={(campaign: any) => createCampaignMutation.mutate(campaign)}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
}
