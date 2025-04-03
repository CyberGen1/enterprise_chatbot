
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import ChatboxDemo from './ChatboxDemo';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-network-pattern bg-no-repeat bg-cover opacity-2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <img 
                src="/lovable-uploads/e79b349f-9d4e-4ddd-bc6e-dfc271683c93.png" 
                alt="CyberGen" 
                className="h-16 w-auto"
              />
              <span className="font-bold text-3xl text-gray-800">CYBERGEN</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
              <span className="text-gray-900">AI-Powered</span> Conversations for <span className="text-gray-900">Enterprise</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Experience seamless interactions with our advanced AI assistant. Get answers, generate content, analyze documents, and solve problems with just a chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2 shadow-sm"
                asChild
              >
                <Link to="/chat">
                  <MessageCircle className="h-5 w-5" />
                  Start Chatting
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group border-gray-300 text-gray-800">
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
