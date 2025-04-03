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
                  <span className="text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                        <svg className="h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-800 mb-1">Document Analysis</h3>
                      <p className="text-xs text-gray-500">Upload PDF, TXT, or other text documents.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-blue-500 hover:shadow-md transition-all group">
                      <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                        <svg className="h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-800 mb-1">Data Analytics</h3>
                      <p className="text-xs text-gray-500">Upload CSV, Excel or JSON data files.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-blue-500 hover:shadow-md transition-all group">
                      <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                        <svg className="h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
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
                  <button className="text-gray-400 hover:text-blue-500 mr-2 transition-all">
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
                    <button className="text-gray-400 hover:text-blue-500 mx-1 transition-all">
                      <Clock className="h-5 w-5" />
                    </button>
                    <button className="bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white p-2 rounded-full ml-1 transform hover:scale-105 transition-all duration-200">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistantButton;