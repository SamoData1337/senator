import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { 
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMap
} from 'react-icons/fa';

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
      icon: FaMapMarkerAlt,
      label: t('contact.info.address'),
      value: t('contact.info.address')
    },
    {
      icon: FaPhone,
      label: t('contact.info.phone'),
      value: t('contact.info.phone')
    },
    {
      icon: FaEnvelope,
      label: t('contact.info.email'),
      value: t('contact.info.email')
    },
    {
      icon: FaClock,
      label: t('contact.info.hours'),
      value: t('contact.info.hours')
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/90 rounded-full border border-yellow-500/50 mb-6">
            <span className="text-black text-sm font-bold">
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
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <IconComponent className="text-xl text-black" />
                    </div>
                    <div>
                      <div className="text-white font-medium mb-1">{info.label}</div>
                      <div className="text-slate-300">{info.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Google Map */}
            <div className="mt-8 h-64 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.123456789!2d18.0899!3d48.3186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDE5JzA3LjAiTiAxOMKwMDUnMjMuNiJF!5e0!3m2!1ssk!2ssk!4v1635789012345!5m2!1ssk!2ssk&q=48.3186,18.0899(Levická+252%2F5%2C+Chrenová%2C+949+01+Nitra)"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Senator Slovakia - Levická 252/5, Chrenová, 949 01 Nitra"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
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
                    className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-yellow-400"
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
                    className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-yellow-400"
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
                  className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-yellow-400"
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
                  className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 resize-none focus:border-yellow-400"
                  placeholder={t('contact.form.message')}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-lg"
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