import { Clock, AlertCircle } from 'lucide-react';
import { businessHours } from '@/data/menuData';
import { cn } from '@/lib/utils';

export function useStoreStatus() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const todayHours = businessHours[dayOfWeek as keyof typeof businessHours];
  
  if (!todayHours.isOpen) {
    return { isOpen: false, message: 'Fechado hoje', todayHours };
  }

  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
  
  const openTime = openHour * 60 + openMin;
  // Handle midnight (00:00) as end of day
  const closeTime = closeHour === 0 ? 24 * 60 : closeHour * 60 + closeMin;

  const isOpen = currentTime >= openTime && currentTime < closeTime;

  return {
    isOpen,
    message: isOpen 
      ? `Aberto até ${todayHours.close}` 
      : `Abre às ${todayHours.open}`,
    todayHours,
  };
}

export function StoreStatus() {
  const { isOpen, message } = useStoreStatus();

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
        isOpen
          ? 'bg-green-500/20 text-green-400'
          : 'bg-primary/20 text-primary'
      )}
    >
      {isOpen ? (
        <Clock className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      <span>{message}</span>
    </div>
  );
}

export function ClosedBanner() {
  const { isOpen } = useStoreStatus();

  if (isOpen) return null;

  return (
    <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 mb-6 animate-fade-in">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            Estamos fechados no momento
          </h3>
          <p className="text-muted-foreground text-sm">
            Você pode visualizar o cardápio e montar seu pedido para quando abrirmos!
          </p>
        </div>
      </div>
    </div>
  );
}
