import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Link } from "wouter";
import { PRICING_PLANS } from "@/lib/constants";
import { Check, Star, Zap, Shield, Headphones, Users, Crown, Rocket } from "lucide-react";

const additionalFeatures = {
  starter: [
    "Email Support",
    "Basic Templates",
    "Campaign Analytics",
    "Contact Management (500)",
    "Message Scheduling"
  ],
  professional: [
    "Priority Support",
    "Advanced Templates",
    "Detailed Analytics",
    "Contact Management (5000)",
    "A/B Testing",
    "Custom Automations",
    "Team Collaboration (5 users)",
    "API Access",
    "Webhook Integration"
  ],
  enterprise: [
    "24/7 Phone Support",
    "Custom Templates",
    "Real-time Analytics",
    "Unlimited Contacts",
    "Advanced A/B Testing",
    "Custom Integrations",
    "Unlimited Team Members",
    "Full API Access",
    "Custom Webhooks",
    "White-label Branding",
    "Dedicated Account Manager",
    "Custom Training",
    "SLA Guarantee"
  ]
};

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
  },
  {
    question: "What happens if I exceed my message limit?",
    answer: "You'll receive notifications as you approach your limit. Additional messages can be purchased at standard rates, or you can upgrade your plan."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all plans. If you're not satisfied, contact support for a full refund."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all plans come with a 14-day free trial. No credit card required to start."
  },
  {
    question: "Can I integrate with my existing tools?",
    answer: "Professional and Enterprise plans include API access and webhook integrations for seamless tool integration."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Support varies by plan: email for Starter, priority email for Professional, and 24/7 phone support for Enterprise."
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (monthlyPrice: number) => {
    if (isAnnual) {
      return Math.floor(monthlyPrice * 12 * 0.8); // 20% discount for annual
    }
    return monthlyPrice;
  };

  const getPriceDisplay = (monthlyPrice: number) => {
    const price = getPrice(monthlyPrice);
    if (isAnnual) {
      return {
        amount: Math.floor(price / 12),
        period: "/mo",
        note: `$${price}/year - Save 20%`
      };
    }
    return {
      amount: price,
      period: "/mo",
      note: "Billed monthly"
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your <span className="gradient-text">Marketing Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Scale your marketing efforts with our flexible pricing plans designed for businesses of all sizes. 
              Start your free trial today and experience the power of automated marketing.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={`font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge className="gradient-bg text-white">Save 20%</Badge>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {PRICING_PLANS.map((plan) => {
                const priceInfo = getPriceDisplay(plan.price);
                return (
                  <Card 
                    key={plan.id} 
                    className={`relative hover:scale-105 transition-all duration-300 ${
                      plan.popular 
                        ? 'border-2 border-primary shadow-2xl shadow-primary/20' 
                        : 'hover:shadow-xl'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 gradient-bg px-6 py-2 rounded-full text-sm font-semibold text-white flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-8">
                      <div className="mb-4">
                        {plan.id === 'starter' && (
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                            <Rocket className="h-8 w-8 text-white" />
                          </div>
                        )}
                        {plan.id === 'professional' && (
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                            <Zap className="h-8 w-8 text-white" />
                          </div>
                        )}
                        {plan.id === 'enterprise' && (
                          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mx-auto">
                            <Crown className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                      <p className="text-muted-foreground mb-6">{plan.description}</p>
                      
                      <div className="mb-4">
                        <div className="text-4xl font-bold gradient-text">
                          ${priceInfo.amount}
                          <span className="text-lg text-muted-foreground">{priceInfo.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{priceInfo.note}</p>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <ul className="space-y-4">
                        {additionalFeatures[plan.id as keyof typeof additionalFeatures].map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-6">
                        <Link href="/dashboard">
                          <Button 
                            className={`w-full ${
                              plan.popular 
                                ? 'gradient-bg hover:scale-105 transition-transform duration-300' 
                                : ''
                            }`}
                            variant={plan.popular ? "default" : "outline"}
                            size="lg"
                          >
                            {plan.id === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                          </Button>
                        </Link>
                        
                        <p className="text-xs text-muted-foreground text-center mt-3">
                          {plan.id !== 'enterprise' ? '14-day free trial • No credit card required' : 'Custom pricing available'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Detailed <span className="gradient-text">Feature Comparison</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compare all features across our plans to find the perfect fit for your business needs.
              </p>
            </div>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-6 font-semibold">Features</th>
                        <th className="text-center p-6 font-semibold">Starter</th>
                        <th className="text-center p-6 font-semibold">Professional</th>
                        <th className="text-center p-6 font-semibold">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "Monthly Messages", starter: "5,000", professional: "25,000", enterprise: "Unlimited" },
                        { feature: "Platform Integrations", starter: "3", professional: "All", enterprise: "All + Custom" },
                        { feature: "Team Members", starter: "1", professional: "5", enterprise: "Unlimited" },
                        { feature: "Analytics", starter: "Basic", professional: "Advanced", enterprise: "Custom" },
                        { feature: "Support", starter: "Email", professional: "Priority", enterprise: "24/7 Phone" },
                        { feature: "API Access", starter: "❌", professional: "✅", enterprise: "✅" },
                        { feature: "White-label", starter: "❌", professional: "❌", enterprise: "✅" },
                        { feature: "Custom Integrations", starter: "❌", professional: "Limited", enterprise: "✅" },
                        { feature: "SLA", starter: "❌", professional: "❌", enterprise: "99.9%" },
                      ].map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-6 font-medium">{row.feature}</td>
                          <td className="p-6 text-center">{row.starter}</td>
                          <td className="p-6 text-center">{row.professional}</td>
                          <td className="p-6 text-center">{row.enterprise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose <span className="gradient-text">MarketPro</span>?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Enterprise Security</h3>
                  <p className="text-muted-foreground">
                    Bank-level encryption and compliance with global privacy regulations to keep your data safe.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Headphones className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Our expert support team is available around the clock to help you succeed with your campaigns.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">24,000+ Users</h3>
                  <p className="text-muted-foreground">
                    Join thousands of businesses already using MarketPro to grow their reach and engagement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <Card className="glassmorphism max-w-4xl mx-auto">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to <span className="gradient-text">Transform</span> Your Marketing?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Start your free trial today and see how MarketPro can help you reach more customers, 
                  increase engagement, and grow your business across all platforms.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/dashboard">
                    <Button size="lg" className="gradient-bg hover:scale-105 transition-transform duration-300">
                      <Rocket className="mr-2 h-5 w-5" />
                      Start Free Trial
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    <Headphones className="mr-2 h-5 w-5" />
                    Talk to Sales
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-6">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
