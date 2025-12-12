import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Check, ShoppingCart, Pizza, Cake } from 'lucide-react';
import { products, Product } from '@/data/menuData';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Produto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0]?.size || ''
  );
  const [selectedFlavors, setSelectedFlavors] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState('');

  const isMonday = new Date().getDay() === 1;
  const showPromo = product?.isPromo && isMonday;

  // Get max flavors based on selected size
  const maxFlavors = useMemo(() => {
    if (!product?.isPizza || !product.sizes) return 0;
    const sizeData = product.sizes.find((s) => s.size === selectedSize);
    return sizeData?.maxFlavors || 2;
  }, [product, selectedSize]);

  // Get ALL pizza flavors (both sweet and savory) - NO CATEGORY RESTRICTIONS
  const { saltyFlavors, sweetFlavors } = useMemo(() => {
    if (!product?.isPizza) return { saltyFlavors: [], sweetFlavors: [] };
    
    const allPizzas = products.filter(
      (p) => p.isPizza && p.id !== product.id
    );
    
    return {
      saltyFlavors: allPizzas.filter((p) => p.category === 'pizzas-salgadas'),
      sweetFlavors: allPizzas.filter((p) => p.category === 'pizzas-doces'),
    };
  }, [product]);

  // Calculate price - ALWAYS use the most expensive flavor
  const { calculatedPrice, highestFlavorName } = useMemo(() => {
    if (!product) return { calculatedPrice: 0, highestFlavorName: '' };

    if (product.isPizza && product.sizes) {
      const sizeData = product.sizes.find((s) => s.size === selectedSize);
      if (!sizeData) return { calculatedPrice: product.price, highestFlavorName: '' };

      // Include the main product in flavor price calculation
      const allFlavors = [product, ...selectedFlavors];
      
      let highestPrice = 0;
      let highestName = '';
      
      allFlavors.forEach((f) => {
        const flavorSizeData = f.sizes?.find((s) => s.size === selectedSize);
        const price = flavorSizeData?.price || f.price;
        if (price > highestPrice) {
          highestPrice = price;
          highestName = f.name;
        }
      });

      return { 
        calculatedPrice: highestPrice, 
        highestFlavorName: selectedFlavors.length > 0 ? highestName : '' 
      };
    }

    if (showPromo && product.promoPrice) {
      return { calculatedPrice: product.promoPrice, highestFlavorName: '' };
    }

    return { calculatedPrice: product.price, highestFlavorName: '' };
  }, [product, selectedSize, selectedFlavors, showPromo]);

  // Count of currently selected flavors (including the main product)
  const currentFlavorCount = selectedFlavors.length + 1;
  const remainingFlavors = maxFlavors - currentFlavorCount;
  const canAddMore = remainingFlavors > 0;

  const handleFlavorToggle = (flavor: Product) => {
    setSelectedFlavors((prev) => {
      const isSelected = prev.some((f) => f.id === flavor.id);
      if (isSelected) {
        return prev.filter((f) => f.id !== flavor.id);
      }
      if (!canAddMore) {
        toast.error(`Máximo de ${maxFlavors} sabores para este tamanho`);
        return prev;
      }
      return [...prev, flavor];
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    const allFlavors = product.isPizza 
      ? [product, ...selectedFlavors]
      : undefined;

    addItem({
      product,
      quantity,
      size: selectedSize || undefined,
      selectedFlavors: allFlavors,
      observations: observations || undefined,
      totalPrice: calculatedPrice * quantity,
    });

    toast.success('Adicionado ao carrinho!', {
      description: product.name,
      action: {
        label: 'Ver carrinho',
        onClick: () => navigate('/carrinho'),
      },
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Produto não encontrado</p>
          <button onClick={() => navigate('/cardapio')} className="btn-primary">
            Voltar ao Cardápio
          </button>
        </div>
      </div>
    );
  }

  const FlavorCard = ({ flavor, isSelected, isDisabled }: { 
    flavor: Product; 
    isSelected: boolean; 
    isDisabled: boolean;
  }) => {
    const flavorPrice = flavor.sizes?.find((s) => s.size === selectedSize)?.price || flavor.price;
    
    return (
      <button
        onClick={() => !isDisabled && handleFlavorToggle(flavor)}
        disabled={isDisabled}
        className={cn(
          'relative p-3 rounded-xl border-2 transition-all text-left',
          isSelected 
            ? 'border-primary bg-primary/10' 
            : 'border-border bg-card hover:border-primary/50',
          isDisabled && !isSelected && 'opacity-40 cursor-not-allowed'
        )}
      >
        <div className="flex items-start gap-2">
          <div
            className={cn(
              'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
              isSelected
                ? 'bg-primary border-primary'
                : 'border-muted-foreground/50'
            )}
          >
            {isSelected && (
              <Check className="w-3 h-3 text-primary-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-medium text-sm text-foreground block truncate">
              {flavor.name}
            </span>
            <span className="text-xs text-primary font-semibold">
              R$ {flavorPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen pb-40">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg truncate">{product.name}</h1>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {showPromo && (
          <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold animate-pulse">
            🔥 SEGUNDA MALUCA
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 -mt-8 relative">
        <div className="bg-card border border-border rounded-2xl p-6">
          {/* Product Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {product.name}
            </h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Size Selection for Pizzas */}
          {product.isPizza && product.sizes && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                Escolha o tamanho
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => {
                      setSelectedSize(size.size);
                      setSelectedFlavors([]); // Reset flavors when size changes
                    }}
                    className={cn(
                      'size-chip',
                      selectedSize === size.size
                        ? 'size-chip-active'
                        : 'size-chip-inactive'
                    )}
                  >
                    <div className="text-center">
                      <span className="font-bold">{size.size}</span>
                      <span className="text-xs block text-muted-foreground">
                        {size.slices} fatias
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        R$ {size.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavor Selection for Pizzas - IMPROVED GRID LAYOUT */}
          {product.isPizza && (saltyFlavors.length > 0 || sweetFlavors.length > 0) && (
            <div className="mb-6">
              {/* Flavor Counter - Always visible */}
              <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-xl">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Adicionar mais sabores
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Misture salgados e doces livremente!
                  </p>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-lg font-bold",
                    canAddMore ? "text-primary" : "text-accent"
                  )}>
                    {currentFlavorCount}/{maxFlavors}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {canAddMore 
                      ? `+${remainingFlavors} disponível` 
                      : 'Limite atingido'}
                  </p>
                </div>
              </div>

              {/* Scrollable Flavor Area */}
              <div className="max-h-80 overflow-y-auto pr-2 space-y-6">
                {/* Salty Flavors */}
                {saltyFlavors.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3 sticky top-0 bg-card py-2">
                      <Pizza className="w-5 h-5 text-secondary" />
                      <h4 className="font-semibold text-foreground">🍕 Pizzas Salgadas</h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {saltyFlavors.map((flavor) => {
                        const isSelected = selectedFlavors.some((f) => f.id === flavor.id);
                        const isDisabled = !canAddMore && !isSelected;
                        return (
                          <FlavorCard
                            key={flavor.id}
                            flavor={flavor}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sweet Flavors */}
                {sweetFlavors.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3 sticky top-0 bg-card py-2">
                      <Cake className="w-5 h-5 text-accent" />
                      <h4 className="font-semibold text-foreground">🍫 Pizzas Doces</h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {sweetFlavors.map((flavor) => {
                        const isSelected = selectedFlavors.some((f) => f.id === flavor.id);
                        const isDisabled = !canAddMore && !isSelected;
                        return (
                          <FlavorCard
                            key={flavor.id}
                            flavor={flavor}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price Calculation Info */}
          {product.isPizza && selectedFlavors.length > 0 && highestFlavorName && (
            <div className="mb-4 p-3 bg-accent/10 border border-accent/30 rounded-xl">
              <p className="text-sm text-accent">
                💰 Preço calculado com base no sabor mais caro: <strong>{highestFlavorName}</strong>
              </p>
            </div>
          )}

          {/* Observations */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">
              Observações (opcional)
            </h3>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Ex: sem cebola, bem passada, mais queijo..."
              className="input-field min-h-[100px] resize-none"
            />
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-semibold text-foreground">Quantidade</span>
            <div className="flex items-center gap-4 bg-muted rounded-xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors btn-press"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-8 text-center font-bold text-lg text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors btn-press"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar - ABOVE bottom nav with safe area */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 glass border-t border-border p-4 z-[60]">
        <div className="container mx-auto flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Total</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                R$ {(calculatedPrice * quantity).toFixed(2).replace('.', ',')}
              </span>
              {showPromo && product.price && (
                <span className="text-muted-foreground line-through">
                  R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center gap-2 px-8 glow-primary"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
