import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import ChatAssistantButton from "./components/ChatAssistantButton";
import GradientThemeProvider from "./lib/gradient-theme";
import { ChatAssistantContext } from "./components/HeroSection";

const queryClient = new QueryClient();

const App = () => {
  const [isOpen, setIsOpenOriginal] = useState(false);
  
  // Create a wrapped version of setIsOpen that logs when it's called
  const setIsOpen = (value: boolean | ((prevState: boolean) => boolean)) => {
    console.log("App - setIsOpen called with:", value);
    setIsOpenOriginal(value);
  };

  // Add debug logs
  useEffect(() => {
    console.log("App - isOpen state changed:", isOpen);
  }, [isOpen]);

  return (
    <QueryClientProvider client={queryClient}>
      <GradientThemeProvider>
        <TooltipProvider>
          <ChatAssistantContext.Provider value={{ isOpen, setIsOpen }}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/auth" element={<AuthPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <ChatAssistantButton />
          </ChatAssistantContext.Provider>
        </TooltipProvider>
      </GradientThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
