import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const { language, t, switchLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="text-white">
              <div className="font-bold text-lg">Senator</div>
              <div className="text-sm text-zinc-400">Slovakia</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-zinc-300 hover:text-white transition-colors duration-300 font-medium"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-zinc-400" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => switchLanguage('sk')}
                className={`text-sm ${language === 'sk' ? 'text-white' : 'text-zinc-400'}`}
              >
                SK
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => switchLanguage('en')}
                className={`text-sm ${language === 'en' ? 'text-white' : 'text-zinc-400'}`}
              >
                EN
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-zinc-800">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-zinc-300 hover:text-white transition-colors duration-300"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;