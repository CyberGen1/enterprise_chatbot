
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Solutions', href: '#solutions' },
        { name: 'Enterprise', href: '#enterprise' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Security', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Community', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Partners', href: '#' },
        { name: 'Legal', href: '#' },
      ],
    },
  ];
  
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Github, href: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/e79b349f-9d4e-4ddd-bc6e-dfc271683c93.png" 
                alt="CyberGen" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg text-gray-800">CYBERGEN</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              AI-powered document intelligence platform for enterprises. Process, analyze, and extract insights from any document.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
          {footerSections.map((section, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-4 text-gray-800">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={link.href} 
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8 bg-gray-100" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            &copy; {year} CyberGen. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
