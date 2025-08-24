import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-slide-up">
              Let's <span className="text-accent">Collaborate</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Ready to bring your vision to life? Get in touch with our collective 
              and let's create something extraordinary together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Get in Touch</h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm md:text-base">Email</h4>
                      <p className="text-muted-foreground text-sm md:text-base break-all">hello@gridshift.dev</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm md:text-base">Discord</h4>
                      <p className="text-muted-foreground text-sm md:text-base">Join our community</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm md:text-base">Location</h4>
                      <p className="text-muted-foreground text-sm md:text-base">Global Remote Team</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent" />
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
                <CardContent className="p-4 md:p-6">
                  <h4 className="font-semibold mb-3 text-sm md:text-base">What We Offer</h4>
                  <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    <li>• Custom web development and design</li>
                    <li>• Professional photography services</li>
                    <li>• Brand identity and marketing materials</li>
                    <li>• Ongoing support and maintenance</li>
                    <li>• Collaborative approach with transparent communication</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Start a Project</h3>
                
                <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()} id="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">Name</label>
                      <Input 
                        id="contact-name"
                        name="name"
                        placeholder="Your name" 
                        className="bg-secondary border-border text-sm md:text-base h-10 md:h-11" 
                      />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium mb-2 block">Email</label>
                      <Input 
                        id="contact-email"
                        name="email"
                        type="email" 
                        placeholder="your@email.com" 
                        className="bg-secondary border-border text-sm md:text-base h-10 md:h-11" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs md:text-sm font-medium mb-2 block">Company</label>
                    <Input 
                      id="contact-company"
                      name="company"
                      placeholder="Your company (optional)" 
                      className="bg-secondary border-border text-sm md:text-base h-10 md:h-11" 
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs md:text-sm font-medium mb-2 block">Project Type</label>
                    <select id="contact-type" name="projectType" className="w-full p-3 bg-secondary border border-border rounded-md text-sm md:text-base h-10 md:h-11">
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
                      id="contact-message"
                      name="message"
                      placeholder="Tell us about your project..." 
                      className="bg-secondary border-border min-h-[100px] md:min-h-[120px] text-sm md:text-base resize-none"
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full hover-lift h-11 md:h-12 text-sm md:text-base" onClick={() => {
                    const formEl = document.getElementById('contact-form') as HTMLFormElement | null;
                    if(!formEl) return;
                    const fd = new FormData(formEl);
                    const data: Record<string, any> = {};
                    fd.forEach((v,k) => data[k] = v);
                    // basic client-side validation
                    if(!data.email || !data.message){
                      import('@/components/ui/sonner').then(m => m.toast.error('Please fill required fields.'));
                      return;
                    }
                    // simulate submit (replace with real endpoint)
                    fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
                      .then(res => {
                        if(res.ok) {
                          import('@/components/ui/sonner').then(m => m.toast.success('Message sent — we will be in touch.'));
                          formEl.reset();
                        } else {
                          import('@/components/ui/sonner').then(m => m.toast.error('Failed to send message.'));
                        }
                      }).catch(()=> import('@/components/ui/sonner').then(m => m.toast.error('Network error.')));
                  }}>
                    Send Message
                    <Send className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;