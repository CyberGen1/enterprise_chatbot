import React, { useState } from 'react';
import { MessageCircle, X, FileText, BarChart3, Database, Paperclip, Clock, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const ChatAssistantButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="w-[500px] shadow-lg border border-gray-200 overflow-hidden rounded-md flex flex-col bg-white">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">AI Assistant</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-600 hover:text-white p-1 rounded-full transition-all duration-200">
                    <span className="sr-only">Expand</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-600 hover:text-white p-1 rounded-full transition-all duration-200" onClick={toggleChat}>
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Sub Header */}
              <div className="flex items-center px-4 py-2 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="url(#blueGradient)" stroke="url(#blueGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                      </defs>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </span>
                  <span className="font-medium text-gray-700">New Conversation</span>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <span className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M9 12h6"></path>
                      <path d="M9 8h6"></path>
                      <path d="M9 16h6"></path>
                    </svg>
                  </span>
                  <span className="text-green-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span className="text-xs ml-1">Secure</span>
                  </span>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="flex-grow overflow-auto p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-gradient-to-b from-blue-400 to-blue-600">
                    <span className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">AI Assistant</h2>
                  <p className="text-gray-600 mb-8">
                    Ask me anything or upload files to analyze. I can help with information,<br />
                    file analysis, and data analytics all in one place.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-3 w-full">
                    <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-blue-500 hover:shadow-md transition-all group">
                      <div className="flex justify-center mb-2 text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 group-hover:scale-110 transition-transform">
                        <FileText className="h-6 w-6 stroke-[url(#blueIconGradient)]" />
                      </div>
                      <h3 className="font-medium text-gray-800 mb-1">Document Analysis</h3>
                      <p className="text-xs text-gray-500">Upload PDF, TXT, or other text documents.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-blue-500 hover:shadow-md transition-all group">
                      <div className="flex justify-center mb-2 text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 group-hover:scale-110 transition-transform">
                        <BarChart3 className="h-6 w-6 stroke-[url(#blueIconGradient)]" />
                      </div>
                      <h3 className="font-medium text-gray-800 mb-1">Data Analytics</h3>
                      <p className="text-xs text-gray-500">Upload CSV, Excel or JSON data files.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-blue-500 hover:shadow-md transition-all group">
                      <div className="flex justify-center mb-2 text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 group-hover:scale-110 transition-transform">
                        <Database className="h-6 w-6 stroke-[url(#blueIconGradient)]" />
                      </div>
                      <h3 className="font-medium text-gray-800 mb-1">Knowledge Base</h3>
                      <p className="text-xs text-gray-500">Search and chat with your uploaded documents.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-600 mr-2 transition-all">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-grow relative">
                    <input 
                      type="text" 
                      placeholder="Type your message or upload a file..." 
                      className="w-full py-2 px-4 outline-none bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex items-center ml-2">
                    <button className="text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-600 mx-1 transition-all">
                      <Clock className="h-5 w-5" />
                    </button>
                    <button className="bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white p-2 rounded-full ml-1 transform hover:scale-105 transition-all duration-200">
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="chat-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              onClick={toggleChat} 
              className="h-14 w-14 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 shadow-lg flex items-center justify-center transform hover:scale-105 transition-all duration-200"
            >
              <MessageCircle className="h-7 w-7 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* SVG Gradient Definitions for icons */}
      <svg width="0" height="0" className="hidden">
        <linearGradient id="blueIconGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </svg>
    </div>
  );
};

export default ChatAssistantButton;