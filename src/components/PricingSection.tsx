
import React from 'react';
import { Check, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for individuals and small teams just getting started.',
      features: [
        { included: true, name: 'Basic document analysis' },
        { included: true, name: 'Up to 100 documents' },
        { included: true, name: '2GB storage limit' },
        { included: true, name: 'Standard support' },
        { included: false, name: 'API access' },
        { included: false, name: 'Custom training' },
        { included: false, name: 'On-premise deployment' },
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: 99,
      description: 'For growing teams that need more power and additional features.',
      features: [
        { included: true, name: 'Advanced document analysis' },
        { included: true, name: 'Up to 1,000 documents' },
        { included: true, name: '10GB storage limit' },
        { included: true, name: 'Priority support' },
        { included: true, name: 'API access' },
        { included: true, name: 'Basic training' },
        { included: false, name: 'On-premise deployment' },
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations that need advanced features and dedicated support.',
      features: [
        { included: true, name: 'Full document intelligence' },
        { included: true, name: 'Unlimited documents' },
        { included: true, name: 'Unlimited storage' },
        { included: true, name: '24/7 dedicated support' },
        { included: true, name: 'Full API access' },
        { included: true, name: 'Custom training' },
        { included: true, name: 'On-premise deployment' },
      ],
      cta: 'Contact Sales',
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="section-container bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that's right for your team, from startups to enterprise organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-cybergen-primary shadow-lg shadow-cybergen-primary/10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-tl-none rounded-br-none px-3 py-1 bg-cybergen-primary text-white">
                    <Zap className="h-3.5 w-3.5 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold">{plan.name}</h3>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  {typeof plan.price === 'number' ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold">{plan.price}</div>
                  )}
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </div>
                
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-cybergen-primary hover:bg-cybergen-secondary' 
                      : plan.name === 'Enterprise' 
                        ? 'bg-transparent hover:bg-transparent border border-cybergen-primary text-cybergen-primary hover:text-cybergen-secondary hover:border-cybergen-secondary' 
                        : ''
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
