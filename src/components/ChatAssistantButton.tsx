import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, FileText, BarChart3, Database, Paperclip, Send, RefreshCw, Maximize2, Minus, Sparkles, Bot } from 'lucide-react';
import { Button } from './ui/button'; // Assuming shadcn/ui button
import { Card, CardContent, CardHeader, CardFooter } from './ui/card'; // Assuming shadcn/ui card components
import { motion, AnimatePresence } from 'framer-motion';
import { useChatAssistant } from './HeroSection'; // Assuming this context hook provides isOpen and setIsOpen
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

// Helper component for chat messages (no changes needed here)
const ChatMessage = ({ type, text }: { type: 'user' | 'bot'; text: string }) => {
  const isUser = type === 'user';
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none' // Use primary color
            : 'bg-muted text-muted-foreground rounded-bl-none'
        )}
      >
        <p className="leading-relaxed">{text}</p>
      </motion.div>
    </div>
  );
};

// Helper component for Welcome Screen Cards (no changes needed here)
const WelcomeCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="group cursor-pointer rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50">
    <div className="mb-3 flex justify-center">
      <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
    </div>
    <h3 className="mb-1 text-center font-semibold text-sm">{title}</h3>
    <p className="text-center text-xs text-muted-foreground">{description}</p>
  </div>
);


const ChatAssistantButton = () => {
  const { isOpen, setIsOpen } = useChatAssistant();
  const [isMobile, setIsMobile] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [message, setMessage] = useState('');
  const [useKnowledgeBase, setUseKnowledgeBase] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'bot'; text: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // --- Effects --- (largely unchanged)

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && isMaximized) {
        setIsMaximized(false);
      }
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [isMaximized]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // --- Handlers --- (largely unchanged)

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const resetChat = () => {
    setChatHistory([]);
    setMessage('');
    setUseKnowledgeBase(false);
    inputRef.current?.focus();
  };

  const toggleKnowledgeBase = () => {
    setUseKnowledgeBase(prev => !prev); // Toggle state
    inputRef.current?.focus();
  };


  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage === '') return;

    setChatHistory(prev => [...prev, { type: 'user', text: trimmedMessage }]);
    setMessage('');

    setTimeout(() => {
      const botResponse = useKnowledgeBase
        ? `Using the knowledge base: I found relevant information in your documents regarding "${trimmedMessage.substring(0, 20)}...".`
        : `Standard response: Processing your query about "${trimmedMessage.substring(0, 20)}...".`;

      setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // --- Dynamic Classes ---
  // Base classes for the chat window
  const chatWindowBaseClasses = "fixed shadow-xl border bg-card rounded-lg overflow-hidden flex flex-col transition-all duration-300 ease-out z-[100]"; // Ensure high z-index

  // Mobile specific classes - uses viewport height, less prone to zoom issues
  const chatWindowMobileClasses = "inset-x-0 bottom-0 w-full h-[85vh] max-h-[85vh] rounded-b-none";

  // Desktop specific classes - ADDED max-w-[95vw] and max-h-[90vh]
  const chatWindowDesktopBase = "bottom-6 right-6 w-[440px] h-[600px] max-w-[95vw] max-h-[90vh]"; // Base desktop size with viewport limits
  const chatWindowDesktopMaximized = "bottom-6 right-6 w-[700px] h-[80vh] max-w-[95vw] max-h-[90vh]"; // Maximized size with viewport limits
  const chatWindowDesktopClasses = isMaximized ? chatWindowDesktopMaximized : chatWindowDesktopBase;

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className={cn(
              chatWindowBaseClasses,
              isMobile ? chatWindowMobileClasses : chatWindowDesktopClasses
            )}
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* Header - Close button integrated here */}
            <CardHeader className="flex flex-row items-center justify-between p-3 border-b bg-muted/40 flex-shrink-0"> {/* Added flex-shrink-0 */}
              <div className="flex items-center gap-2">
                 <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border items-center justify-center bg-primary"> {/* Use bg-primary */}
                     <Bot className="h-5 w-5 text-primary-foreground"/> {/* Use primary-foreground */}
                 </span>
                <h3 className="font-semibold text-base text-foreground">AI Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                {!isMobile && (
                  <Button variant="ghost" size="icon" onClick={toggleMaximize} className="h-7 w-7 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={isMaximized ? "Restore chat size" : "Maximize chat"}>
                     {isMaximized ? <Minus className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                )}
                 {/* --- Close button moved here, always visible when chat is open --- */}
                 <Button variant="ghost" size="icon" onClick={toggleChat} className="h-7 w-7 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close chat">
                    <X className="h-4 w-4" />
                 </Button>
              </div>
            </CardHeader>

            {/* Chat Body */}
            <CardContent ref={chatBodyRef} className="flex-grow overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 ? (
                // Welcome Screen
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center h-full px-4"
                >
                   <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg"> {/* Use bg-primary */}
                      <Sparkles className="h-8 w-8 text-primary-foreground" /> {/* Use primary-foreground */}
                   </div>
                   <h2 className="mb-2 text-xl font-bold text-foreground">How can I help?</h2>
                   <p className="mb-6 max-w-md text-sm text-muted-foreground">
                     Ask me anything, upload documents for analysis, or connect your data.
                   </p>
                   <div className={`grid w-full max-w-md gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                      <WelcomeCard icon={FileText} title="Documents" description="Analyze PDFs, TXT & more." />
                      <WelcomeCard icon={BarChart3} title="Analytics" description="Explore CSV, JSON data." />
                      <WelcomeCard icon={Database} title="Knowledge" description="Chat with your files." />
                   </div>
                </motion.div>
              ) : (
                // Chat History
                chatHistory.map((msg, index) => (
                  <ChatMessage key={index} type={msg.type} text={msg.text} />
                ))
              )}
            </CardContent>

            {/* Footer / Input Area */}
            <CardFooter className="p-3 border-t bg-muted/40 flex-shrink-0"> {/* Added flex-shrink-0 */}
                {useKnowledgeBase && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0}}
                        className="mb-2 text-xs text-primary flex items-center gap-1 justify-center" // Use text-primary
                    >
                        <Database className="h-3 w-3"/> Knowledge Base Active
                    </motion.div>
                )}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary flex-shrink-0" aria-label="Attach file">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleKnowledgeBase}
                    className={cn(
                        "h-8 w-8 flex-shrink-0 hover:text-primary", // Use hover:text-primary
                        useKnowledgeBase ? "text-primary bg-primary/10" : "text-muted-foreground" // Use text-primary when active
                    )}
                    aria-label={useKnowledgeBase ? "Deactivate knowledge base" : "Activate knowledge base"}
                    title={useKnowledgeBase ? "Knowledge base active" : "Activate knowledge base"}
                >
                  <Database className="h-4 w-4" />
                </Button>
                <div className="relative flex-grow">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10" // Assuming 'ring' uses primary color from config
                  />
                </div>
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetChat}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                    aria-label="Reset chat"
                    title="Reset chat"
                    disabled={chatHistory.length === 0 && message === ''}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                <Button
                  size="icon"
                  onClick={sendMessage}
                  className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex-shrink-0 hover:bg-primary/90 disabled:opacity-50" // Use bg-primary, text-primary-foreground
                  aria-label="Send message"
                  disabled={message.trim() === ''}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      {!isOpen && (
        <motion.div
          key="chat-button"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50" // Lower z-index than chat window
        >
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:bg-primary/90" // Use bg-primary, text-primary-foreground
            aria-label="Open chat assistant"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default ChatAssistantButton;