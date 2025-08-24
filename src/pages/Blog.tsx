import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    title: "Building Scalable React Applications: Our Development Process",
    excerpt: "A deep dive into our methodology for creating maintainable and scalable React applications that grow with your business.",
    author: "Ali Niavarani",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Development",
    featured: true,
    image: "/placeholder.svg"
  },
  {
    title: "The Art of Commercial Photography: Behind the Scenes",
    excerpt: "Exploring our approach to commercial photography and how we capture the essence of brands through visual storytelling.",
    author: "Sarah Chen",
    date: "December 10, 2024",
    readTime: "6 min read",
    category: "Photography",
    featured: false,
    image: "/placeholder.svg"
  },
  {
    title: "Design Systems That Scale: Creating Consistent Brand Experiences",
    excerpt: "How we develop comprehensive design systems that ensure brand consistency across all touchpoints.",
    author: "Marcus Rodriguez",
    date: "December 5, 2024",
    readTime: "10 min read",
    category: "Design",
    featured: false,
    image: "/placeholder.svg"
  },
  {
    title: "Video Production in the Digital Age: Tools and Techniques",
    excerpt: "Our workflow for creating compelling video content that engages audiences and drives results.",
    author: "Emma Thompson",
    date: "November 28, 2024",
    readTime: "7 min read",
    category: "Video",
    featured: false,
    image: "/placeholder.svg"
  },
  {
    title: "GridShift Collective: Our First Year Achievements",
    excerpt: "Reflecting on our journey as a creative collective and the milestones we've achieved together.",
    author: "GridShift Team",
    date: "November 20, 2024",
    readTime: "5 min read",
    category: "Company",
    featured: true,
    image: "/placeholder.svg"
  },
  {
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Our predictions for the web development landscape and how we're preparing for emerging technologies.",
    author: "Ali Niavarani",
    date: "November 15, 2024",
    readTime: "9 min read",
    category: "Development",
    featured: false,
    image: "/placeholder.svg"
  }
];

const Blog = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            GridShift <span className="text-accent">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Insights, tutorials, and stories from our collective journey. 
            Discover the latest trends, techniques, and achievements from our team.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      {post.author}
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Posts */}
      <section className="pb-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest insights, tutorials, and project updates 
            delivered straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;