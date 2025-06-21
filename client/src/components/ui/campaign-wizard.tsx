import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PLATFORMS } from "@/lib/constants";
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Wand2, Target, MessageSquare, Send } from "lucide-react";
import { format } from "date-fns";

interface CampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: any) => void;
}

const steps = [
  { id: 1, title: "Campaign Details", icon: MessageSquare },
  { id: 2, title: "Target Audience", icon: Target },
  { id: 3, title: "Message & Content", icon: Wand2 },
  { id: 4, title: "Schedule & Launch", icon: Send }
];

export function CampaignWizard({ isOpen, onClose, onSubmit }: CampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    platform: "",
    targetAudience: "",
    message: "",
    scheduledAt: undefined as Date | undefined,
    tags: [] as string[],
    budget: "",
    objective: ""
  });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(campaignData);
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return campaignData.name && campaignData.platform;
      case 2:
        return campaignData.targetAudience && campaignData.objective;
      case 3:
        return campaignData.message;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-auto"
      >
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold gradient-text flex items-center justify-center gap-2">
              <Wand2 className="h-6 w-6" />
              Campaign Creation Wizard
            </CardTitle>
            
            {/* Progress Steps */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        isActive 
                          ? 'border-primary bg-primary text-white' 
                          : isCompleted 
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-muted-foreground bg-background text-muted-foreground'
                      }`}>
                        <Icon className="h-5 w-5" />
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 transition-colors duration-300 ${
                          isCompleted ? 'bg-green-500' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px]"
              >
                {/* Step 1: Campaign Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Campaign Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Campaign Name</label>
                        <Input
                          value={campaignData.name}
                          onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                          placeholder="Summer Sale Campaign"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Platform</label>
                        <Select onValueChange={(value) => setCampaignData({...campaignData, platform: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(PLATFORMS).map(([key, platform]) => (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center space-x-2">
                                  <i className={platform.icon}></i>
                                  <span>{platform.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Campaign Objective</label>
                        <Select onValueChange={(value) => setCampaignData({...campaignData, objective: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select objective" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="awareness">Brand Awareness</SelectItem>
                            <SelectItem value="engagement">Engagement</SelectItem>
                            <SelectItem value="conversion">Conversions</SelectItem>
                            <SelectItem value="traffic">Website Traffic</SelectItem>
                            <SelectItem value="leads">Lead Generation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Budget (Optional)</label>
                        <Input
                          value={campaignData.budget}
                          onChange={(e) => setCampaignData({...campaignData, budget: e.target.value})}
                          placeholder="$500"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Target Audience */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Target Audience</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Audience Description</label>
                      <Textarea
                        value={campaignData.targetAudience}
                        onChange={(e) => setCampaignData({...campaignData, targetAudience: e.target.value})}
                        placeholder="Describe your target audience (e.g., Young professionals aged 25-35 interested in technology)"
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <h4 className="font-medium mb-2">Age Groups</h4>
                        <div className="space-y-2">
                          {["18-24", "25-34", "35-44", "45-54", "55+"].map((age) => (
                            <Badge key={age} variant="outline" className="mr-2 mb-2">
                              {age}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                      
                      <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <h4 className="font-medium mb-2">Interests</h4>
                        <div className="space-y-2">
                          {["Technology", "Fashion", "Travel", "Health", "Business"].map((interest) => (
                            <Badge key={interest} variant="outline" className="mr-2 mb-2">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                      
                      <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <h4 className="font-medium mb-2">Location</h4>
                        <div className="space-y-2">
                          {["Global", "North America", "Europe", "Asia", "Custom"].map((location) => (
                            <Badge key={location} variant="outline" className="mr-2 mb-2">
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Step 3: Message & Content */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Message & Content</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Campaign Message</label>
                      <Textarea
                        value={campaignData.message}
                        onChange={(e) => setCampaignData({...campaignData, message: e.target.value})}
                        placeholder="Write your campaign message here..."
                        rows={6}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Characters: {campaignData.message.length} / 280
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h4 className="font-medium mb-3">Message Templates</h4>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start"
                            onClick={() => setCampaignData({...campaignData, message: "🎉 Special offer! Get 50% off on all products. Limited time only!"})}
                          >
                            Promotional Template
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start"
                            onClick={() => setCampaignData({...campaignData, message: "Hi! We have exciting news to share with you. Check out our latest updates!"})}
                          >
                            Newsletter Template
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start"
                            onClick={() => setCampaignData({...campaignData, message: "Thank you for being our valued customer. Here's something special for you!"})}
                          >
                            Thank You Template
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="p-4">
                        <h4 className="font-medium mb-3">Preview</h4>
                        <div className="bg-muted rounded-lg p-3 min-h-[120px]">
                          <div className="text-sm">
                            {campaignData.message || "Your message will appear here..."}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Step 4: Schedule & Launch */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Schedule & Launch</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Schedule Date (Optional)</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {campaignData.scheduledAt ? format(campaignData.scheduledAt, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={campaignData.scheduledAt || undefined}
                              onSelect={(date) => setCampaignData({...campaignData, scheduledAt: date || undefined})}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Launch Option</label>
                        <Select defaultValue="immediate">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Launch Immediately</SelectItem>
                            <SelectItem value="scheduled">Schedule for Later</SelectItem>
                            <SelectItem value="draft">Save as Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                      <h4 className="font-semibold mb-4">Campaign Summary</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Campaign Name:</span>
                          <span className="ml-2 font-medium">{campaignData.name || "Not specified"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Platform:</span>
                          <span className="ml-2 font-medium capitalize">{campaignData.platform || "Not specified"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Objective:</span>
                          <span className="ml-2 font-medium capitalize">{campaignData.objective || "Not specified"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget:</span>
                          <span className="ml-2 font-medium">{campaignData.budget || "Not specified"}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={currentStep === 1 ? onClose : prevStep}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{currentStep === 1 ? "Cancel" : "Previous"}</span>
              </Button>
              
              <Button
                onClick={currentStep === steps.length ? handleSubmit : nextStep}
                disabled={!isStepValid()}
                className="flex items-center space-x-2 gradient-bg"
              >
                <span>{currentStep === steps.length ? "Create Campaign" : "Next"}</span>
                {currentStep < steps.length && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}