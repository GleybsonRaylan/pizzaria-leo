import { Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MondayPromo() {
  const isMonday = new Date().getDay() === 1;
  const navigate = useNavigate();

  if (!isMonday) return null;

  return (
    <div
      onClick={() => navigate('/produto/smash-burger')}
      className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/30 rounded-2xl p-6 mb-6 cursor-pointer group animate-fade-in"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 animate-pulse" />
      
      <div className="relative flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center animate-bounce-subtle">
            <Flame className="w-8 h-8 text-secondary-foreground" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              SEGUNDA MALUCA
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            Hambúrguer Smash
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-secondary">R$ 10,00</span>
            <span className="text-muted-foreground line-through">R$ 15,00</span>
          </div>
        </div>

        <div className="hidden sm:block text-4xl animate-float">🍔</div>
      </div>
    </div>
  );
}
