import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Bot, Brain, FileText } from 'lucide-react';

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
              <Button 
                size="lg" 
                className="bg-cybergen-primary hover:bg-cybergen-secondary text-white flex items-center gap-2 shadow-lg shadow-cybergen-primary/20"
                onClick={handleStartChatting}
              >
                <MessageSquare className="h-5 w-5" />
                Start Chatting
              </Button>
              <Button variant="outline" size="lg" className="group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <div className="animate-float bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl p-6 md:p-8">
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  
                  <div className="w-24 h-24 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Enterprise AI Assistant</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6">
                  <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Document Analysis</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Brain className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Insights</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <MessageSquare className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Smart Chat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
