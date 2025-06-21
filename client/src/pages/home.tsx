import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { EngagementChart } from "@/components/charts/engagement-chart";
import { Link } from "wouter";
import { PLATFORMS, PRICING_PLANS } from "@/lib/constants";
import { mockStats, mockPerformanceData, mockEngagementData, mockRealtimeMetrics } from "@/lib/mock-data";
import { Rocket, Play, Check, Phone, Mail, MapPin, Star, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="particle-bg min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        <FloatingParticles count={80} />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Advanced <span className="gradient-text">Social Media</span><br />
            Marketing Platform
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Supercharge your marketing campaigns across WhatsApp, Instagram, Facebook, Telegram, and more with our AI-powered automation tools.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/dashboard">
              <Button size="lg" className="gradient-bg hover:scale-105 transition-all duration-300 animate-glow group">
                <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="glassmorphism hover:bg-white/20 transition-all duration-300 group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
              <Sparkles className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
        
        {/* Hero Dashboard Preview */}
        <motion.div 
          className="glassmorphism rounded-2xl p-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
            alt="Advanced marketing dashboard interface" 
            className="rounded-xl shadow-2xl w-full h-auto"
          />
        </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-muted/50 to-muted">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center glassmorphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end={mockStats.totalUsers} suffix="K" />
              </div>
              <div className="text-muted-foreground font-medium">Active Users</div>
            </div>
            <div className="text-center glassmorphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end={mockStats.successRate} suffix="%" />
              </div>
              <div className="text-muted-foreground font-medium">Success Rate</div>
            </div>
            <div className="text-center glassmorphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end={mockStats.integrations} />
              </div>
              <div className="text-muted-foreground font-medium">Integrations</div>
            </div>
            <div className="text-center glassmorphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end={mockStats.countries} />
              </div>
              <div className="text-muted-foreground font-medium">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Marketing Platforms</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect and automate your marketing across all major social media platforms with advanced AI-powered tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(PLATFORMS).slice(0, 6).map(([key, platform]) => (
              <Card key={key} className="glassmorphism hover:scale-105 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${platform.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{platform.name} Marketing</h3>
                  <p className="text-muted-foreground mb-6">{platform.description}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-400 mr-2" />
                      Advanced automation tools
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-400 mr-2" />
                      Real-time analytics
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-400 mr-2" />
                      API integration support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section id="analytics" className="py-20 bg-gradient-to-r from-muted/50 to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced <span className="gradient-text">Analytics Dashboard</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get real-time insights into your marketing performance with our comprehensive analytics suite.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="glassmorphism">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <i className="fas fa-chart-line text-primary mr-3"></i>
                  Campaign Performance
                </h3>
                <div className="h-64">
                  <PerformanceChart data={mockPerformanceData} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <i className="fas fa-users text-purple-400 mr-3"></i>
                  Platform Engagement
                </h3>
                <div className="h-64">
                  <EngagementChart data={mockEngagementData} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Real-time Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockRealtimeMetrics.map((metric, index) => (
              <Card key={index} className="glassmorphism text-center">
                <CardContent className="p-6">
                  <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                    {metric.change} {metric.value}
                  </div>
                  <div className="text-muted-foreground">{metric.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{metric.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="gradient-text">Marketing Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Scale your marketing efforts with our flexible pricing plans designed for businesses of all sizes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <Card 
                key={plan.id} 
                className={`glassmorphism hover:scale-105 transition-all duration-300 ${
                  plan.popular ? 'border-2 border-primary relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 gradient-bg px-6 py-2 rounded-full text-sm font-semibold text-white">
                    <Star className="inline h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold gradient-text mb-2">
                      ${plan.price}
                      <span className="text-lg text-muted-foreground">/mo</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'gradient-bg hover:scale-105 transition-transform duration-300 animate-glow' 
                        : ''
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.id === 'enterprise' ? 'Contact Sales' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-muted/50 to-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Started <span className="gradient-text">Today</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Ready to supercharge your marketing? Contact our experts for a personalized demo.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="glassmorphism">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                          <Phone className="text-white h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Phone</div>
                          <div className="text-muted-foreground">+1 (555) 123-4567</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                          <Mail className="text-white h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Email</div>
                          <div className="text-muted-foreground">support@marketpro.com</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                          <MapPin className="text-white h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Address</div>
                          <div className="text-muted-foreground">123 Marketing St, Digital City, DC 12345</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Support Hours */}
                <Card className="glassmorphism">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4">Support Hours</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span>9:00 AM - 8:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday</span>
                        <span>10:00 AM - 6:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* CTA */}
              <div className="flex items-center justify-center">
                <Card className="glassmorphism w-full">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-muted-foreground mb-6">
                      Join thousands of businesses already using MarketPro to grow their reach and engagement.
                    </p>
                    <Link href="/dashboard">
                      <Button size="lg" className="gradient-bg hover:scale-105 transition-transform duration-300 mb-4">
                        Start Your Free Trial
                      </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      No credit card required • 14-day free trial
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <i className="fas fa-chart-line text-white text-lg"></i>
                </div>
                <span className="text-2xl font-bold gradient-text">MarketPro</span>
              </Link>
              <p className="text-muted-foreground max-w-xs">
                Advanced social media marketing platform trusted by thousands of businesses worldwide.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  >
                    <i className={`fab fa-${social} text-muted-foreground`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Products */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                {Object.values(PLATFORMS).slice(0, 5).map((platform) => (
                  <li key={platform.name}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                      {platform.name} Marketing
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Case Studies'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Contact Support', 'System Status', 'Community', 'Training'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2024 MarketPro. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
