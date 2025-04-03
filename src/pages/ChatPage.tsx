
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  BarChart3, 
  Folder, 
  Upload, 
  Brain, 
  MessageSquare, 
  Settings, 
  ChevronLeft
} from 'lucide-react';
import PremiumChatInterface from '@/components/PremiumChatInterface';

const ChatPage = () => {
  const [selectedTab, setSelectedTab] = useState("chat");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <a href="/">
                <ChevronLeft className="h-5 w-5" />
              </a>
            </Button>
            <h1 className="text-2xl font-bold">CYBERGEN Premium</h1>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-64 shrink-0">
              <Card className="h-full shadow-md border-border bg-card">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/lovable-uploads/e79b349f-9d4e-4ddd-bc6e-dfc271683c93.png" 
                      alt="CyberGen" 
                      className="h-8 w-auto"
                    />
                    <span className="font-bold text-lg">CYBERGEN</span>
                  </div>
                </div>
                
                <div className="p-2 space-y-1">
                  <Button 
                    variant={selectedTab === "chat" ? "secondary" : "ghost"} 
                    className="w-full justify-start text-left" 
                    onClick={() => setSelectedTab("chat")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                  
                  <Button 
                    variant={selectedTab === "documents" ? "secondary" : "ghost"} 
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedTab("documents")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </Button>
                  
                  <Button 
                    variant={selectedTab === "analytics" ? "secondary" : "ghost"} 
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedTab("analytics")}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                  
                  <Button 
                    variant={selectedTab === "knowledge" ? "secondary" : "ghost"} 
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedTab("knowledge")}
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Knowledge Base
                  </Button>
                  
                  <Button 
                    variant={selectedTab === "settings" ? "secondary" : "ghost"} 
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <Card className="h-full shadow-md border-border bg-card">
                <CardContent className="p-0">
                  {selectedTab === "chat" && <PremiumChatInterface />}
                  
                  {selectedTab === "documents" && (
                    <div className="p-6 text-center h-[600px] flex flex-col items-center justify-center">
                      <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Document Intelligence</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Upload documents to analyze, extract data, and chat with your content
                      </p>
                      <Button className="bg-cybergen-primary hover:bg-cybergen-secondary">
                        <Upload className="mr-2 h-4 w-4" /> Upload Documents
                      </Button>
                    </div>
                  )}
                  
                  {selectedTab === "analytics" && (
                    <div className="p-6 text-center h-[600px] flex flex-col items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Import data files for AI-powered analysis and visualization
                      </p>
                      <Button className="bg-cybergen-primary hover:bg-cybergen-secondary">
                        <Upload className="mr-2 h-4 w-4" /> Import Data
                      </Button>
                    </div>
                  )}
                  
                  {selectedTab === "knowledge" && (
                    <div className="p-6 text-center h-[600px] flex flex-col items-center justify-center">
                      <Folder className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Access your organization's knowledge base and documents
                      </p>
                      <Button className="bg-cybergen-primary hover:bg-cybergen-secondary">
                        <Folder className="mr-2 h-4 w-4" /> Browse Knowledge Base
                      </Button>
                    </div>
                  )}
                  
                  {selectedTab === "settings" && (
                    <div className="p-6 text-center h-[600px] flex flex-col items-center justify-center">
                      <Settings className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Settings</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Configure your AI assistant and customize preferences
                      </p>
                      <Button className="bg-cybergen-primary hover:bg-cybergen-secondary">
                        <Settings className="mr-2 h-4 w-4" /> Manage Settings
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
