import { Phone, Instagram, MessageCircle, Clock, MapPin } from 'lucide-react';
import { contactInfo, businessHours } from '@/data/menuData';

export default function Contato() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank');
  };

  const handleInstagram = () => {
    window.open(contactInfo.instagram, '_blank');
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-glow-primary">
            <span className="text-5xl">🍕</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Pizzaria e Hamburgueria do Léo
          </h1>
          <p className="text-muted-foreground">
            Entre em contato conosco
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4 max-w-md mx-auto">
          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl p-6 flex items-center gap-4 transition-all btn-press"
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">WhatsApp</p>
              <p className="text-green-100">{contactInfo.phone}</p>
            </div>
          </button>

          {/* Instagram */}
          <button
            onClick={handleInstagram}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-2xl p-6 flex items-center gap-4 transition-all btn-press"
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Instagram className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">Instagram</p>
              <p className="text-white/90">@hamburgueriaepizzariadoleo</p>
            </div>
          </button>

          {/* Phone */}
          <a
            href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
            className="block w-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-foreground">Telefone</p>
                <p className="text-muted-foreground">{contactInfo.phone}</p>
              </div>
            </div>
          </a>
        </div>

        {/* Business Hours */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Horário de Funcionamento
            </h2>
            <div className="space-y-2">
              {Object.values(businessHours).map((hours, index) => (
                <div
                  key={index}
                  className={`flex justify-between py-2 px-3 rounded-lg ${
                    hours.isOpen ? '' : 'bg-destructive/10'
                  }`}
                >
                  <span className={`font-medium ${hours.isOpen ? 'text-foreground' : 'text-destructive'}`}>
                    {hours.day}
                  </span>
                  <span className={hours.isOpen ? 'text-muted-foreground' : 'text-destructive'}>
                    {hours.isOpen ? `${hours.open} - ${hours.close}` : 'Fechado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Credits */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Desenvolvido por{' '}
            <a
              href="https://gleybsonferreiradev.vercel.app/?fbclid=PAZXh0bgNhZW0CMTEAAafvAbrbe7x_5dzxOrky67Ljo1TStoz9FXYTvf6h3Xm8GShcNTRuQsxSNU3u_w_aem_fgXLK2ri4j9jL6mITalLXA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Gleybson Ferreira
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
