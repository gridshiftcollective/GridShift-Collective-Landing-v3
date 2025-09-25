import { Users, Target, Lightbulb, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContentModule from "@/components/ContentModule";
import { getAllMembers } from "@/lib/content/members";

const members = getAllMembers();

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHeader
        title={<>About <span className="text-accent">GridShift</span></>}
        description="We are a curated collective of independent creatives who believe that the best work happens when diverse talents unite under a shared vision of excellence."
      />

      {/* Our Philosophy */}
      <ContentModule moduleIndex={1} paddingClass="py-20 md:py-24" className="bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
              <p className="text-muted-foreground mb-6">
                GridShift represents the intersection of structure and creativity. We believe that 
                great design needs solid foundations, and strong development requires creative thinking.
              </p>
              <p className="text-muted-foreground mb-6">
                Our collective model allows each member to maintain their independence while benefiting 
                from the shared credibility and network of the group. When you work with one of us, 
                you get the expertise of our entire collective.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Core Specialists</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, title: "Collective Expertise", desc: "Diverse skills under one roof" },
                { icon: Target, title: "Focused Delivery", desc: "Precision in every project" },
                { icon: Lightbulb, title: "Creative Innovation", desc: "Fresh perspectives always" },
                { icon: Award, title: "Proven Results", desc: "Quality that speaks for itself" },
              ].map((item, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                  <CardContent className="text-center p-0">
                    <item.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ContentModule>

      {/* Team Members */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <Users className="w-16 h-16 text-accent/50" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                  <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;