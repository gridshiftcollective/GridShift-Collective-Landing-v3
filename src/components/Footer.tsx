import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border hero-gradient grid-pattern">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img 
              src="/media/brand/logos/GridShift-Type-T%20v2.png" 
              alt="GridShift Logo" 
              className="h-12 md:h-16 mb-4"
            />
            <p className="text-muted-foreground mb-6 max-w-md">
              A collective of passionate creators building exceptional digital experiences 
              and visual stories for brands worldwide.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/gridshiftcollective" aria-label="GridShift LinkedIn" target="_blank" rel="noreferrer noopener">
                <Button asChild variant="ghost" size="sm" className="p-2">
                  <span aria-hidden="true"><Linkedin className="w-5 h-5" /></span>
                </Button>
              </a>
              <a href="mailto:gridshiftcollective@gmail.com" aria-label="Email GridShift">
                <Button asChild variant="ghost" size="sm" className="p-2">
                  <span aria-hidden="true"><Mail className="w-5 h-5" /></span>
                </Button>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/services" className="hover:text-accent transition-colors">Photography</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">Websites & Apps</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">Graphic Design</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">Filming & Editing</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/blog" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="/portfolio" className="hover:text-accent transition-colors">Portfolio</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 GridShift. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;