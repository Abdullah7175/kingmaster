import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play, Pause, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PLATFORMS, CAMPAIGN_STATUSES } from "@/lib/constants";
import type { Campaign } from "@shared/schema";

interface CampaignCardProps {
  campaign: Campaign;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (id: number) => void;
  onToggleStatus?: (id: number, status: string) => void;
}

export function CampaignCard({ campaign, onEdit, onDelete, onToggleStatus }: CampaignCardProps) {
  const platform = PLATFORMS[campaign.platform as keyof typeof PLATFORMS];
  const status = CAMPAIGN_STATUSES[campaign.status as keyof typeof CAMPAIGN_STATUSES];

  const handleToggleStatus = () => {
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    onToggleStatus?.(campaign.id, newStatus);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${platform?.color} rounded-lg flex items-center justify-center`}>
              <i className={`${platform?.icon} text-white`}></i>
            </div>
            <div>
              <CardTitle className="text-lg">{campaign.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{platform?.name}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(campaign)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleStatus}>
                {campaign.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(campaign.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={status?.color}>
              {status?.label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {campaign.targetAudience}
            </span>
          </div>
          
          <p className="text-sm line-clamp-2">{campaign.message}</p>
          
          {campaign.stats && typeof campaign.stats === 'object' && (
            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
              <div className="text-center">
                <div className="text-lg font-semibold">{(campaign.stats as any).sent || 0}</div>
                <div className="text-xs text-muted-foreground">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{(campaign.stats as any).delivered || 0}</div>
                <div className="text-xs text-muted-foreground">Delivered</div>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            Created: {new Date(campaign.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
