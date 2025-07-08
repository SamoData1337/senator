import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

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
      icon: MapPin,
      label: t('contact.info.address'),
      value: t('contact.info.address')
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: t('contact.info.phone')
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: t('contact.info.email')
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hours')
    }
  ];

  return (
    <section id="contact" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700 mb-6">
            <span className="text-zinc-300 text-sm font-medium">
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
                  <div className="w-12 h-12 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">{info.label}</div>
                    <div className="text-zinc-400">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 bg-zinc-800/50 rounded-2xl border border-zinc-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                <div className="text-zinc-400">Interaktívna mapa</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700">
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
                    className="bg-zinc-900/50 border-zinc-600 text-white placeholder-zinc-400"
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
                    className="bg-zinc-900/50 border-zinc-600 text-white placeholder-zinc-400"
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
                  className="bg-zinc-900/50 border-zinc-600 text-white placeholder-zinc-400"
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
                  className="bg-zinc-900/50 border-zinc-600 text-white placeholder-zinc-400 resize-none"
                  placeholder={t('contact.form.message')}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 text-white py-3 rounded-lg font-medium transition-all duration-300"
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