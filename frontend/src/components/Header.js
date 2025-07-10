import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-xl">S</span>
            </div>
            <div className="text-white">
              <div className="font-bold text-lg">Senator</div>
              <div className="text-sm text-yellow-400">Slovakia</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-slate-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">🌍</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => switchLanguage('sk')}
                className={`text-sm ${language === 'sk' ? 'text-yellow-400 font-bold' : 'text-slate-400'}`}
              >
                SK
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => switchLanguage('en')}
                className={`text-sm ${language === 'en' ? 'text-yellow-400 font-bold' : 'text-slate-400'}`}
              >
                EN
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-amber-800/50">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-amber-200 hover:text-white transition-colors duration-300"
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