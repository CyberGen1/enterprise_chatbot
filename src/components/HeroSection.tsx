import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';

// Create a context to manage the chat assistant state globally
export const ChatAssistantContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useChatAssistant = () => React.useContext(ChatAssistantContext);

const HeroSection = () => {
  const { setIsOpen } = useChatAssistant();

  const handleStartChatting = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      
      {/* Additional background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cybergen-primary/10 to-transparent rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight font-sans">
              <span className="gradient-text font-light">AI-Powered</span> <span className="font-normal">Conversations</span> for <span className="gradient-text font-semibold">Enterprise</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-xl mx-auto lg:mx-0 font-light">
              Experience seamless interactions with our advanced AI assistant. Get answers, generate content, analyze documents, and solve problems with just a chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-cybergen-primary hover:bg-cybergen-secondary text-white flex items-center gap-2 shadow-lg shadow-cybergen-primary/20 font-medium"
                onClick={handleStartChatting}
              >
                <MessageSquare className="h-5 w-5" />
                Start Chatting
              </Button>
              <Button variant="outline" size="lg" className="group font-medium">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <div className="animate-float">
              {/* AI Chat Illustration */}
              <img 
                src="/ai-chat-illustration.jpg" 
                alt="AI Assistant chatting with a person" 
                className="w-full h-auto rounded-lg border border-gray-200 shadow-2xl shadow-blue-500/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
