import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioItems } from '../data/mock';
import Header from './Header';
import Footer from './Footer';

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
      <section className="pt-24 pb-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/90 rounded-full mb-6">
              <span className="text-black text-sm font-bold">Naše služby</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {currentService.title}
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
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
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Čo ponúkame</h2>
              <div className="space-y-4">
                {currentService.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Proces realizácie</h2>
              <div className="space-y-4">
                {currentService.process.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Naše realizácie</h2>
            <p className="text-slate-300">Pozrite si galériu našich dokončených projektov</p>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl text-slate-600 mb-4">🏗️</div>
              <p className="text-slate-400">Momentálne pripravujeme galériu pre túto kategóriu</p>
            </div>
          )}
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