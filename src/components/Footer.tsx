import React from 'react';
import { Separator } from '@/components/ui/separator'; // Assuming shadcn/ui
import { Button } from '@/components/ui/button';    // Assuming shadcn/ui
import { Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';
// Removed: import Link from 'next/link';
import { cn } from "@/lib/utils"; // Assuming you use cn utility

// Footer Component for standard React (Vite/CRA)
const Footer = () => {
  const year = new Date().getFullYear();

  // Data structure for footer links (hrefs can be relative paths for React Router or full URLs)
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' }, // Use '#' for placeholders or actual anchors
        { name: 'Solutions', href: '#solutions' },
        { name: 'Enterprise', href: '#enterprise' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Security', href: '/security' }, // Relative path for React Router
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' }, // Relative path for React Router
        { name: 'API Reference', href: '/api' }, // Relative path for React Router
        { name: 'Blog', href: '/blog' },       // Relative path for React Router
        { name: 'Tutorials', href: '/tutorials' }, // Relative path for React Router
        { name: 'Community Forum', href: 'https://community.example.com' }, // Example external link
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },   // Relative path for React Router
        { name: 'Careers', href: '/careers' }, // Relative path for React Router
        { name: 'Contact Us', href: '/contact' }, // Relative path for React Router
        { name: 'Partners', href: '/partners' }, // Relative path for React Router
        { name: 'Brand Assets', href: 'https://brand.example.com' }, // Example external link
      ],
    },
  ];

  // Data structure for social media links
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', ariaLabel: 'Follow us on Facebook' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', ariaLabel: 'Follow us on Twitter' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', ariaLabel: 'Follow us on LinkedIn' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', ariaLabel: 'Follow us on Instagram' },
    { name: 'GitHub', icon: Github, href: 'https://github.com', ariaLabel: 'Visit our GitHub profile' },
  ];

  // Helper component for cleaner link rendering (React version using <a>)
  const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isExternal = href.startsWith('http') || !href.startsWith('/'); // Basic check for external links or anchors
    const commonClasses = "text-sm text-muted-foreground transition-colors duration-200 hover:text-primary hover:underline underline-offset-4";

    // Use target="_blank" for external links or links starting with #
    const targetProps = isExternal || href.startsWith('#') ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    // NOTE: If using React Router, you might replace this 'a' with its 'Link' component for client-side routing
    // e.g., import { Link as RouterLink } from 'react-router-dom';
    // then use <RouterLink to={href} className={commonClasses}> {children} </RouterLink> for internal links.
    // For simplicity here, we use standard <a> tags which will cause full page reloads for internal navigation.
    return (
      <a href={href} className={commonClasses} {...targetProps}>
        {children}
      </a>
    );
  };


  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">

          {/* Company Info & Socials */}
          <div className="md:col-span-4 lg:col-span-5">
            {/* Use <a> for home link in standard React */}
            <a href="/" className="inline-flex items-center gap-2.5 mb-5" aria-label="Cybergen Home">
              <img
                src="/lovable-uploads/e79b349f-9d4e-4ddd-bc6e-dfc271683c93.png" // Ensure this path is correct
                alt="Cybergen Logo"
                className="h-9 w-auto"
              />
              {/* <span className="font-bold text-xl text-foreground">CYBERGEN</span> */}
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Empowering enterprises with AI-driven document intelligence. Process, analyze, and unlock insights effortlessly.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.ariaLabel}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Link Sections */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-foreground mb-5 tracking-wide uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {/* FooterLink now uses <a> tags */}
                      <FooterLink href={link.href}>
                        {link.name}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-10 md:my-12" />

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:justify-between md:items-center">
          <div className="text-xs text-muted-foreground">
            © {year} Cybergen Systems Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {/* FooterLink now uses <a> tags */}
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
            <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;