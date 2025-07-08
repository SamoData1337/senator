import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Check, Award, Users, Wrench } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Award, value: '20+', label: 'Rokov skúseností' },
    { icon: Users, value: '500+', label: 'Spokojných zákazníkov' },
    { icon: Wrench, value: '1000+', label: 'Realizovaných projektov' }
  ];

  return (
    <section id="about" className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700 mb-6">
              <span className="text-zinc-300 text-sm font-medium">
                {t('about.subtitle')}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t('about.title')}
            </h2>

            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {t('about.features').map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-zinc-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/8134812/pexels-photo-8134812.jpeg"
                alt="Storage solutions"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent rounded-2xl" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-lg opacity-20 -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-zinc-600 to-zinc-500 rounded-lg opacity-20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;