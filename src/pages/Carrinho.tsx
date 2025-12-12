import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartItemCard } from '@/components/CartItemCard';

export default function Carrinho() {
  const navigate = useNavigate();
  const { items, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-24 md:pb-8">
        <div className="text-center px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-muted-foreground mb-6">
            Adicione produtos deliciosos ao seu pedido!
          </p>
          <button
            onClick={() => navigate('/cardapio')}
            className="btn-primary"
          >
            Ver Cardápio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40 md:pb-32">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Carrinho</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-destructive hover:text-destructive/80 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Limpar
          </button>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Fixed Bottom - Above bottom nav on mobile */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 glass border-t border-border z-[60]">
        <div className="container mx-auto px-4 py-4">
          {/* Summary */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-xl font-bold text-foreground">
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate('/finalizacao')}
            className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4 glow-primary"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
