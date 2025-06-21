import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings,
  ChartLine,
  Zap,
  Target,
  Calendar
} from "lucide-react";

const sidebarItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/campaigns", icon: MessageSquare, label: "Campaigns" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/contacts", icon: Users, label: "Contacts" },
  { href: "/automations", icon: Zap, label: "Automations" },
  { href: "/targeting", icon: Target, label: "Targeting" },
  { href: "/schedule", icon: Calendar, label: "Schedule" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden lg:flex flex-col w-64 bg-card border-r">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
            <ChartLine className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold gradient-text">MarketPro</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="glassmorphism rounded-lg p-4 text-center">
          <h4 className="font-semibold mb-2">Upgrade to Pro</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Unlock advanced features and unlimited campaigns
          </p>
          <Button size="sm" className="w-full gradient-bg">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}
