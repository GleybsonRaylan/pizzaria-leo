import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem, useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem, updateObservations } = useCart();

  const unitPrice = item.totalPrice / item.quantity;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 animate-fade-in">
      <div className="flex gap-4">
        {/* Image */}
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-foreground">
                {item.product.name}
              </h3>
              {item.size && (
                <span className="text-sm text-muted-foreground">
                  Tamanho: {item.size}
                </span>
              )}
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-muted-foreground hover:text-destructive transition-colors p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Selected Flavors */}
          {item.selectedFlavors && item.selectedFlavors.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-1">Sabores:</p>
              <div className="flex flex-wrap gap-1">
                {item.selectedFlavors.map((flavor) => (
                  <span
                    key={flavor.id}
                    className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                  >
                    {flavor.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price and Quantity */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-primary">
              R$ {item.totalPrice.toFixed(2).replace('.', ',')}
            </span>

            <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors btn-press"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-foreground">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors btn-press"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Observations */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Observações (ex: sem cebola, bem passado...)"
          value={item.observations || ''}
          onChange={(e) => updateObservations(item.id, e.target.value)}
          className="input-field text-sm"
        />
      </div>
    </div>
  );
}
