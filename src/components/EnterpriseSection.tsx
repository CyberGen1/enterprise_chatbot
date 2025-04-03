
import React from 'react';
import { CheckCircle2, Shield, Users, Server, Briefcase, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EnterpriseSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'End-to-end encryption, SOC 2 compliance, and private cloud deployment options.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Shared knowledge bases, document repositories, and collaborative AI workspaces.'
    },
    {
      icon: Server,
      title: 'On-Premise Deployment',
      description: 'Keep your data within your infrastructure with our on-premise solution.'
    },
    {
      icon: Briefcase,
      title: 'Custom Branding',
      description: 'White-label the platform with your company branding and color scheme.'
    },
    {
      icon: Clock,
      title: '24/7 Premium Support',
      description: 'Dedicated account managers and priority technical support.'
    },
  ];

  return (
    <section id="enterprise" className="section-container relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-cybergen-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-64 -left-64 w-[500px] h-[500px] bg-cybergen-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-cybergen-primary/10 text-cybergen-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Enterprise Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Secure <span className="gradient-text">Enterprise Deployment</span> with Advanced Features
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              CyberGen AURA provides tailored enterprise solutions with enhanced security, integration capabilities, and dedicated support to meet your organization's specific needs.
            </p>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="h-5 w-5 text-cybergen-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <Button size="lg" className="bg-cybergen-primary hover:bg-cybergen-secondary">
              Contact Sales
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-card shadow-xl rounded-xl border border-border p-6 md:p-8 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold mb-6">Enterprise Package</h3>
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-muted-foreground">Starting from</div>
                  <div className="text-3xl font-bold">$999<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Billed annually. Custom pricing available for larger teams.
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className="h-5 w-5 text-cybergen-primary" />
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-cybergen-primary hover:bg-cybergen-secondary">
                Request Demo
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-cybergen-primary/20 to-cybergen-secondary/20 rounded-xl blur-sm"></div>
            <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full bg-gradient-to-tl from-cybergen-primary/10 to-cybergen-secondary/10 rounded-xl blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
