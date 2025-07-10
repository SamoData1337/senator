import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-950 border-t border-amber-800/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="text-white">
                <div className="font-bold text-lg">Senator</div>
                <div className="text-sm text-amber-300">Slovakia</div>
              </div>
            </div>
            <p className="text-amber-200 leading-relaxed mb-6">
              Špecializujeme sa na predaj kvalitných komponentov pre zákazkové montáže vstavaných skriní a poskytujeme komplexné riešenia pre váš domov.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-amber-800/30 rounded-lg flex items-center justify-center hover:bg-amber-700/50 transition-colors">
                <span className="text-amber-300 text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-amber-800/30 rounded-lg flex items-center justify-center hover:bg-amber-700/50 transition-colors">
                <span className="text-amber-300 text-lg">📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-amber-800/30 rounded-lg flex items-center justify-center hover:bg-amber-700/50 transition-colors">
                <span className="text-amber-300 text-lg">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Rýchle odkazy</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-amber-300 hover:text-white transition-colors">
                  O nás
                </a>
              </li>
              <li>
                <a href="#services" className="text-amber-300 hover:text-white transition-colors">
                  Služby
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-amber-300 hover:text-white transition-colors">
                  Realizácie
                </a>
              </li>
              <li>
                <a href="#contact" className="text-amber-300 hover:text-white transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Naše služby</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-amber-300 hover:text-white transition-colors">
                  Vstavané skrine
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-white transition-colors">
                  Šatníky
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-white transition-colors">
                  Posuvné dvere
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-white transition-colors">
                  Zákazkový nábytok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-800/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-amber-300 text-sm mb-4 md:mb-0">
              © 2024 {t('footer.company')}. {t('footer.rights')}
            </div>
            <div className="flex space-x-6">
              {t('footer.links').map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-amber-300 hover:text-white transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;