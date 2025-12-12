import { Plus } from 'lucide-react';
import { Product } from '@/data/menuData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const isMonday = new Date().getDay() === 1;
  const showPromo = product.isPromo && isMonday;

  const handleClick = () => {
    navigate(`/produto/${product.id}`);
  };

  const displayPrice = showPromo && product.promoPrice ? product.promoPrice : product.price;
  const originalPrice = showPromo ? product.price : null;

  return (
    <div
      onClick={handleClick}
      className="product-card cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Promo Badge */}
        {showPromo && (
          <div className="promo-badge animate-pulse">
            🔥 PROMO
          </div>
        )}

        {/* Sweet Badge */}
        {product.isSweet && (
          <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-bold">
            🍫 Doce
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              R$ {displayPrice.toFixed(2).replace('.', ',')}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {product.isPizza && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              A partir de
            </span>
          )}
        </div>

        {/* Add Button */}
        <button
          className="w-full mt-4 btn-primary flex items-center justify-center gap-2 group-hover:glow-primary"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
}
