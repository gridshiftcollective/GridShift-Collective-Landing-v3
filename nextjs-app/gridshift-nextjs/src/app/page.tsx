import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/content';

export default function Home() {
  const featuredProjects = getFeaturedProjects(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient grid-pattern">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            GridShift Collective
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A collective of passionate creators building exceptional digital experiences
            and visual stories for brands worldwide.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium hover-lift transition-all text-center"
            >
              View Our Work
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-all text-center"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-8 left-8 hero-square-filled animate-float"></div>
        <div className="absolute top-16 right-16 hero-square-outlined animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore some of our recent work across web development, design, and digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group block bg-card rounded-lg overflow-hidden border border-border hover-lift transition-all duration-300"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.client}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium hover-lift transition-all inline-block"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer comprehensive creative services to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Web Development',
                description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
                icon: '💻'
              },
              {
                title: 'Graphic Design',
                description: 'Eye-catching visual designs that communicate your brand message effectively.',
                icon: '🎨'
              },
              {
                title: 'Photography',
                description: 'Professional photography services for products, events, and brand storytelling.',
                icon: '📸'
              },
              {
                title: 'Video Production',
                description: 'Compelling video content including commercials, tutorials, and social media content.',
                icon: '🎥'
              }
            ].map((service, index) => (
              <div
                key={service.title}
                className="bg-card rounded-lg p-6 border border-border hover-lift transition-all duration-300 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let&apos;s collaborate to bring your creative vision to life. Get in touch to discuss your project.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-background text-foreground rounded-lg font-medium hover-lift transition-all inline-block"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
