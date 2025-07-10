import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock form submission
    toast({
      title: t('contact.form.success'),
      description: 'Odpovieme vám čo najskôr.',
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📍',
      label: t('contact.info.address'),
      value: t('contact.info.address')
    },
    {
      icon: '📞',
      label: t('contact.info.phone'),
      value: t('contact.info.phone')
    },
    {
      icon: '✉️',
      label: t('contact.info.email'),
      value: t('contact.info.email')
    },
    {
      icon: '🕒',
      label: t('contact.info.hours'),
      value: t('contact.info.hours')
    }
  ];

  return (
    <section id="contact" className="py-20 bg-stone-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-800/50 rounded-full border border-amber-700/50 mb-6">
            <span className="text-amber-200 text-sm font-medium">
              {t('contact.subtitle')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('contact.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              {t('contact.info.company')}
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{info.icon}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">{info.label}</div>
                    <div className="text-amber-300">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 bg-amber-800/20 backdrop-blur-sm rounded-2xl border border-amber-700/30 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl text-amber-600 mb-2 block">🗺️</span>
                <div className="text-amber-300">Interaktívna mapa</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-amber-800/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-stone-900/50 border-amber-600/50 text-white placeholder-amber-400 focus:border-amber-500"
                    placeholder={t('contact.form.name')}
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-stone-900/50 border-amber-600/50 text-white placeholder-amber-400 focus:border-amber-500"
                    placeholder={t('contact.form.phone')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  {t('contact.form.email')}
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-stone-900/50 border-amber-600/50 text-white placeholder-amber-400 focus:border-amber-500"
                  placeholder={t('contact.form.email')}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-stone-900/50 border-amber-600/50 text-white placeholder-amber-400 resize-none focus:border-amber-500"
                  placeholder={t('contact.form.message')}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
              >
                {t('contact.form.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;