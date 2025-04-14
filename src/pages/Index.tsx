import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SolutionsSection from '@/components/SolutionsSection';
import EnterpriseSection from '@/components/EnterpriseSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import DocumentSidebar from '@/components/DocumentSidebar';
import { ChatAssistantContext } from '@/components/HeroSection';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ChatAssistantContext.Provider value={{ isOpen: isChatOpen, setIsOpen: setIsChatOpen }}>
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <EnterpriseSection />
          <PricingSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
        <Footer />
        
        {/* Document Sidebar */}
        <DocumentSidebar />
      </div>
    </ChatAssistantContext.Provider>
  );
};

export default Index;
