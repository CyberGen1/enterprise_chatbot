
  import React from 'react';
  import { Card, CardContent } from '@/components/ui/card';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { Star } from 'lucide-react';

  const TestimonialsSection = () => {
    const testimonials = [
      {
        quote: "CyberGen AURA has transformed how our legal team processes documents. We've reduced review time by 70% and improved accuracy significantly.",
        author: "Sarah Johnson",
        title: "Legal Director, LexCorp International",
        avatar: "SJ"
      },
      {
        quote: "The data analysis capabilities are impressive. Our financial team can now process quarterly reports in minutes instead of days.",
        author: "Michael Chen",
        title: "CFO, FinanceWorks",
        avatar: "MC"
      },
      {
        quote: "Implementing AURA across our healthcare system has improved document processing efficiency while maintaining strict compliance requirements.",
        author: "Dr. Emily Rodriguez",
        title: "CIO, MedTech Solutions",
        avatar: "ER"
      },
      {
        quote: "The knowledge base feature has become essential for our research team. It's like having an AI research assistant that knows everything we've ever documented.",
        author: "James Wilson",
        title: "Research Director, TechInnovate",
        avatar: "JW"
      },
    ];

    const StarRating = () => (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-cybergen-accent text-cybergen-accent" />
        ))}
      </div>
    );

    return (
      <section id="testimonials" className="section-container">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See what our customers have to say about how CyberGen AURA has transformed their document processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-border bg-card hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <StarRating />
                  <blockquote className="mb-6 text-lg italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-cybergen-primary/10 text-cybergen-primary">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default TestimonialsSection;
