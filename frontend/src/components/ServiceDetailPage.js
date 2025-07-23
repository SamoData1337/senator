import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioItems } from '../data/mock';
import Header from './Header';
import Footer from './Footer';
import GallerySlider from './GallerySlider';

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Map slugs back to service names
  const slugToService = {
    'vstavane-skrine': 'Vstavané skrine',
    'satniky': 'Šatníky',
    'deliace-priecky': 'Deliace priečky',
    'prechodove-dvere': 'Prechodové dvere',
    'komody-nabytok-a-ine': 'Komody, nábytok a iné',
    'postele': 'Postele'
  };

  const serviceToCategory = {
    'Vstavané skrine': 'Vstavané skrine',
    'Šatníky': 'Šatníky',
    'Deliace priečky': 'Deliace priečky', 
    'Prechodové dvere': 'Prechodové dvere',
    'Komody, nábytok a iné': 'Nábytok',
    'Postele': 'Postele'
  };

  const serviceName = slugToService[serviceSlug];
  const category = serviceToCategory[serviceName];
  const projects = portfolioItems.filter(item => item.category === category);

  if (!serviceName) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Služba nenájdená</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold"
          >
            Späť na hlavnú stránku
          </button>
        </div>
      </div>
    );
  }

  const serviceDetails = {
    'Vstavané skrine': {
      title: 'Vstavané skrine na mieru',
      description: 'Špecializujeme sa na výrobu kvalitných vstavaných skriní, ktoré maximálne využijú váš priestor. Každá skriňa je navrhnutá presne podľa vašich potrieb a rozmerov miestnosti.',
      features: [
        'Individuálne návrhy podľa priestoru',
        'Široký výber materiálov a farieb',
        'Kvalitné kovanie Senator',
        'Presná montáž a finalizácia',
        'Záruka na všetky práce'
      ],
      process: [
        'Bezplatné zameranie priestoru',
        '3D návrh a vizualizácia',
        'Výber materiálov a doplnkov', 
        'Výroba na mieru v našej dielni',
        'Profesionálna montáž a finalizácia'
      ]
    },
    'Šatníky': {
      title: 'Moderné šatníky',
      description: 'Vytvoríme pre vás funkčný šatník, ktorý bude nielen praktický, ale aj esteticky príjemný. Naše šatníky kombinujú moderný dizajn s maximálnou funkcionalitou.',
      features: [
        'Optimálne využitie priestoru',
        'Rôzne typy úložných riešení',
        'LED osvetlenie',
        'Kvalitné zrkadlá a doplnky',
        'Ventilačné systémy'
      ],
      process: [
        'Konzultácia a analýza potrieb',
        'Návrh optimálneho rozloženia',
        'Výber doplnkov a osvetlenia',
        'Výroba a príprava komponentov',
        'Montáž a testovanie funkcionalít'
      ]
    }
    // Add more service details as needed
  };

  const currentService = serviceDetails[serviceName] || {
    title: serviceName,
    description: 'Profesionálne služby v oblasti nábytku na mieru.',
    features: ['Kvalitné materiály', 'Odborná montáž', 'Záruka kvality'],
    process: ['Konzultácia', 'Návrh', 'Výroba', 'Montáž']
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-slate-950 overflow-hidden">
        {/* Background Image with Grid Pattern */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/7614609/pexels-photo-7614609.jpeg"
            alt="Built-in wardrobe"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 z-10 opacity-10">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg0MFY0MEgwVjBaIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDBoNDB2MUgwVjB6TTAgMGgxdjQwSDBWMHoiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+')]" />
        </div>

        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/90 rounded-full mb-6">
              <span className="text-black text-sm font-bold">Naše služby</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {currentService.title}
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              {currentService.description}
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg">
              Požiadať o ponuku
            </button>
          </div>
        </div>
      </section>

      {/* Features & Process */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          {/* Features Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Čo ponúkame</h2>
              <p className="text-slate-300 text-lg">Komplexné služby pre vašu spokojnosť</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentService.features.map((feature, index) => (
                <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-yellow-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-black text-lg font-bold">✓</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Kvalitná služba</h3>
                  <p className="text-slate-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Proces realizácie</h2>
              <p className="text-slate-300 text-lg">Krok za krokom k vašej dokonalej skrini</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentService.process.map((step, index) => (
                <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-yellow-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-black text-lg font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Krok {index + 1}</h3>
                  <p className="text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <GallerySlider projects={projects} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Máte záujem o naše služby?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Kontaktujte nás a získajte bezplatnú konzultáciu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/#contact')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg"
            >
              Kontaktovať nás
            </button>
            <button 
              onClick={() => navigate('/')}
              className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-8 py-3 rounded-lg transition-all duration-300"
            >
              Späť na hlavnú stránku
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;