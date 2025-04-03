
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea
} from '@/components/ui/prompt-input';
import { Button } from '@/components/ui/button';
import { 
  ArrowUp, 
  Paperclip, 
  Square, 
  X, 
  FileText, 
  BarChart3, 
  Folder, 
  Bot, 
  MessageCircle,
  RefreshCcw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Save,
  Upload
} from 'lucide-react';

const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 max-w-xl mx-auto">
    <div className="w-16 h-16 bg-cybergen-primary/10 rounded-full flex items-center justify-center mb-4">
      <img 
        src="/lovable-uploads/e79b349f-9d4e-4ddd-bc6e-dfc271683c93.png" 
        alt="CyberGen" 
        className="h-10 w-auto"
      />
    </div>
    <h2 className="text-2xl font-bold mb-2">Welcome to AURA</h2>
    <p className="text-muted-foreground mb-4">
      I'm your AI assistant. Ask me anything, upload documents, or analyze data. How can I help you today?
    </p>
    <div className="grid grid-cols-2 gap-2 w-full max-w-md">
      <Button variant="outline" className="justify-start text-left" onClick={() => {}}>
        <FileText className="mr-2 h-4 w-4" />
        Analyze a document
      </Button>
      <Button variant="outline" className="justify-start text-left" onClick={() => {}}>
        <BarChart3 className="mr-2 h-4 w-4" />
        Create data visualizations
      </Button>
      <Button variant="outline" className="justify-start text-left" onClick={() => {}}>
        <Folder className="mr-2 h-4 w-4" />
        Search knowledge base
      </Button>
      <Button variant="outline" className="justify-start text-left" onClick={() => {}}>
        <MessageCircle className="mr-2 h-4 w-4" />
        Start a conversation
      </Button>
    </div>
  </div>
);

const ChatMessage = ({ isBot, content, timestamp }: { isBot: boolean, content: string, timestamp: string }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
    <div className={`flex max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${isBot ? 'bg-cybergen-primary/10 mr-3' : 'bg-cybergen-accent/10 ml-3'}`}>
        {isBot ? (
          <img 
            src="/lovable-uploads/e79b349f-9d4e-4ddd-bc6e-dfc271683c93.png" 
            alt="Bot" 
            className="h-6 w-auto"
          />
        ) : (
          <div className="bg-cybergen-accent text-white h-8 w-8 rounded-full flex items-center justify-center text-sm">
            U
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className={`rounded-xl p-4 ${isBot ? 'bg-muted' : 'bg-cybergen-primary/10'}`}>
          <p className="text-sm">{content}</p>
        </div>
        <div className="flex mt-1 text-xs text-muted-foreground">
          <span>{timestamp}</span>
          {isBot && (
            <div className="flex items-center ml-2 space-x-2">
              <button className="hover:text-foreground"><ThumbsUp className="h-3 w-3" /></button>
              <button className="hover:text-foreground"><ThumbsDown className="h-3 w-3" /></button>
              <button className="hover:text-foreground"><Copy className="h-3 w-3" /></button>
              <button className="hover:text-foreground"><Save className="h-3 w-3" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const PremiumChatInterface = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<Array<{isBot: boolean, content: string, timestamp: string}>>([]);
  const [show, setShow] = useState(true); // Controls welcome message
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if ((input.trim() || files.length > 0) && !isLoading) {
      setShow(false);
      
      // Add user message
      const userMessage = {
        isBot: false,
        content: input || "Uploaded files: " + files.map(f => f.name).join(", "),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const botResponse = {
          isBot: true,
          content: files.length > 0 
            ? "I've analyzed the files you uploaded. What would you like to know about them?"
            : "Thanks for your question. As an advanced AI assistant, I'm here to provide accurate and helpful information. Is there anything specific you'd like me to elaborate on?",
          timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
        setInput("");
        setFiles([]);
        
        // Scroll to bottom after messages update
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {show && <WelcomeMessage />}
        
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            isBot={message.isBot}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex max-w-[75%] flex-row">
              <div className="shrink-0 h-10 w-10 rounded-full bg-cybergen-primary/10 mr-3 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/e79b349f-9d4e-4ddd-bc6e-dfc271683c93.png" 
                  alt="Bot"
                  className="h-6 w-auto"
                />
              </div>
              <div className="flex flex-col">
                <div className="rounded-xl p-4 bg-muted">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-cybergen-primary rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-cybergen-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 bg-cybergen-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="border-t border-border p-4">
        <Tabs defaultValue="chat">
          <TabsList className="mb-4 grid grid-cols-3">
            <TabsTrigger value="chat" className="text-xs sm:text-sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="document" className="text-xs sm:text-sm">
              <FileText className="h-4 w-4 mr-1" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="text-xs sm:text-sm">
              <Folder className="h-4 w-4 mr-1" />
              Knowledge
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0">
            <PromptInput
              value={input}
              onValueChange={setInput}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              className="w-full"
            >
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                    >
                      <Paperclip className="size-4" />
                      <span className="max-w-[120px] truncate">{file.name}</span>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="hover:bg-secondary/50 rounded-full p-1"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <PromptInputTextarea placeholder="Ask me anything..." />

              <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <PromptInputAction tooltip="Attach files">
                    <label
                      htmlFor="file-upload"
                      className="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
                    >
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        ref={uploadInputRef}
                      />
                      <Paperclip className="text-primary size-5" />
                    </label>
                  </PromptInputAction>
                  
                  <PromptInputAction tooltip="New chat">
                    <div className="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl">
                      <RefreshCcw className="text-primary size-5" />
                    </div>
                  </PromptInputAction>
                </div>

                <PromptInputAction
                  tooltip={isLoading ? "Stop generation" : "Send message"}
                >
                  <Button
                    variant="default"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-cybergen-primary hover:bg-cybergen-secondary"
                    onClick={handleSubmit}
                    disabled={!input.trim() && files.length === 0}
                  >
                    {isLoading ? (
                      <Square className="size-5 fill-current" />
                    ) : (
                      <ArrowUp className="size-5" />
                    )}
                  </Button>
                </PromptInputAction>
              </PromptInputActions>
            </PromptInput>
          </TabsContent>
          
          <TabsContent value="document" className="mt-0">
            <div className="flex gap-2">
              <div className="border border-dashed border-border rounded-md flex-1 p-4 text-center bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">
                  Upload PDF, TXT, DOCX, or other documents
                </p>
                <Button className="bg-cybergen-primary hover:bg-cybergen-secondary">
                  <Upload className="mr-2 h-4 w-4" /> Select Files
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="knowledge" className="mt-0">
            <div className="flex gap-2">
              <div className="border border-dashed border-border rounded-md flex-1 p-4 text-center bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">
                  Search and chat with your knowledge base
                </p>
                <Button className="bg-cybergen-primary hover:bg-cybergen-secondary">
                  <Folder className="mr-2 h-4 w-4" /> Browse Knowledge
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PremiumChatInterface;
