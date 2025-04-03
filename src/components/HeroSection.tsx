
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import ChatboxDemo from './ChatboxDemo';

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-network-pattern bg-no-repeat bg-cover opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cybergen-primary/10 to-transparent rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">AI-Powered</span> Conversations for <span className="gradient-text">Enterprise</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Experience seamless interactions with our advanced AI assistant. Get answers, generate content, analyze documents, and solve problems with just a chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-cybergen-primary hover:bg-cybergen-secondary text-white flex items-center gap-2 shadow-lg shadow-cybergen-primary/20">
                <MessageCircle className="h-5 w-5" />
                Start Chatting
              </Button>
              <Button variant="outline" size="lg" className="group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <div className="animate-float">
              <ChatboxDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
