import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import ChatAssistantButton from "./components/ChatAssistantButton";
import GradientThemeProvider from "./lib/gradient-theme";
import { ChatAssistantContext } from "./components/HeroSection";

const queryClient = new QueryClient();

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

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
