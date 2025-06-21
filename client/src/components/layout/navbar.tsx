import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, ChartLine, Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = location === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isHome ? 'glassmorphism' : 'bg-background/80 backdrop-blur-md border-b'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <ChartLine className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold gradient-text">MarketPro</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {!isHome && (
              <>
                <Link href="/dashboard">
                  <Button variant={location === "/dashboard" ? "default" : "ghost"}>
                    Dashboard
                  </Button>
                </Link>
                <Link href="/campaigns">
                  <Button variant={location === "/campaigns" ? "default" : "ghost"}>
                    Campaigns
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant={location === "/analytics" ? "default" : "ghost"}>
                    Analytics
                  </Button>
                </Link>
                <Link href="/contacts">
                  <Button variant={location === "/contacts" ? "default" : "ghost"}>
                    Contacts
                  </Button>
                </Link>
              </>
            )}
            
            {isHome && (
              <>
                <a href="#services" className="hover:text-primary transition-colors duration-300">Services</a>
                <a href="#analytics" className="hover:text-primary transition-colors duration-300">Analytics</a>
                <Link href="/pricing">
                  <Button variant="ghost">Pricing</Button>
                </Link>
                <a href="#contact" className="hover:text-primary transition-colors duration-300">Contact</a>
              </>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Link href="/dashboard">
              <Button className="gradient-bg hover:scale-105 transition-transform duration-300">
                {isHome ? "Start Trial" : "Dashboard"}
              </Button>
            </Link>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/20 pt-4">
            <div className="flex flex-col space-y-2">
              {!isHome && (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                  </Link>
                  <Link href="/campaigns">
                    <Button variant="ghost" className="w-full justify-start">Campaigns</Button>
                  </Link>
                  <Link href="/analytics">
                    <Button variant="ghost" className="w-full justify-start">Analytics</Button>
                  </Link>
                  <Link href="/contacts">
                    <Button variant="ghost" className="w-full justify-start">Contacts</Button>
                  </Link>
                </>
              )}
              
              <Link href="/pricing">
                <Button variant="ghost" className="w-full justify-start">Pricing</Button>
              </Link>
              
              <Link href="/dashboard">
                <Button className="gradient-bg w-full">
                  {isHome ? "Start Trial" : "Dashboard"}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
