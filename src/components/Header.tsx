
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from 'react-router-dom';

const Header = () => {
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'Features', href: '/#features' },
    { name: 'Solutions', href: '/#solutions' },
    { name: 'Enterprise', href: '/#enterprise' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Testimonials', href: '/#testimonials' },
  ];

  const Logo = () => (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/e79b349f-9d4e-4ddd-bc6e-dfc271683c93.png" 
        alt="CyberGen" 
        className="h-10 w-auto"
      />
      <span className="font-bold text-xl text-gray-800">CYBERGEN</span>
    </Link>
  );

  const NavItems = () => (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <a 
          key={item.name} 
          href={item.href}
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          {item.name}
        </a>
      ))}
    </nav>
  );

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white">
        <SheetHeader>
          <SheetTitle className="text-gray-800">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-lg py-2"
            >
              {item.name}
            </a>
          ))}
          <Link to="/chat">
            <Button className="mt-4 bg-gray-800 hover:bg-gray-700 w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Logo />
        <NavItems />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {!isMobile && (
            <Link to="/chat">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                Sign In
              </Button>
            </Link>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
