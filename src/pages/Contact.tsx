import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContentModule from "@/components/ContentModule";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page header for contact */}
      <PageHeader
        title={<>Let's <span className="text-accent">Collaborate</span></>}
        description="Ready to bring your vision to life? Get in touch with our collective and let's create something extraordinary together."
      />

      {/* Main contact module - unified dark sections with breathing space */}
      <ContentModule moduleIndex={1} paddingClass="py-20 md:py-24" className="bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Information - spaced and visual */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">Get in Touch</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/40 transition-colors">
                    <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm md:text-base">Email</h4>
                      <p className="text-muted-foreground text-sm md:text-base break-all">gridshiftcollective@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/40 transition-colors">
                    <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm md:text-base">Discord</h4>
                      <p className="text-muted-foreground text-sm md:text-base">Join our community</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/40 transition-colors">
                    <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm md:text-base">Location</h4>
                      <p className="text-muted-foreground text-sm md:text-base">Global Remote Team</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/40 transition-colors">
                    <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm md:text-base">Response Time</h4>
                      <p className="text-muted-foreground text-sm md:text-base">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Card */}
              <Card className="bg-card border-border">
                <CardContent className="p-6 md:p-8">
                  <h4 className="font-semibold mb-3 text-sm md:text-base">What We Offer</h4>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    <li>• Custom web development and design</li>
                    <li>• Professional photography services</li>
                    <li>• Brand identity and marketing materials</li>
                    <li>• Ongoing support and maintenance</li>
                    <li>• Collaborative approach with transparent communication</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form - more spacious and elevated */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 md:p-10">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6">Start a Project</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">Name</label>
                      <Input 
                        placeholder="Your name" 
                        className="bg-secondary border-border text-sm md:text-base h-12 md:h-12 rounded-md px-3" 
                      />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">Email</label>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="bg-secondary border-border text-sm md:text-base h-12 md:h-12 rounded-md px-3" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs md:text-sm font-medium mb-2 block">Company</label>
                    <Input 
                      placeholder="Your company (optional)" 
                      className="bg-secondary border-border text-sm md:text-base h-12 md:h-12 rounded-md px-3" 
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs md:text-sm font-medium mb-2 block">Project Type</label>
                    <select className="w-full p-3 bg-secondary border border-border rounded-md text-sm md:text-base h-12 md:h-12">
                      <option>Web Development</option>
                      <option>Graphic Design</option>
                      <option>Photography</option>
                      <option>Branding</option>
                      <option>Multiple Services</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs md:text-sm font-medium mb-2 block">Message</label>
                    <Textarea 
                      placeholder="Tell us about your project..." 
                      className="bg-secondary border-border min-h-[140px] md:min-h-[160px] text-sm md:text-base resize-none rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <Button size="lg" className="w-full hover-lift h-12 md:h-14 text-sm md:text-base bg-accent text-accent-foreground">
                    Send Message
                    <Send className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentModule>

      <Footer />
    </div>
  );
};

export default Contact;