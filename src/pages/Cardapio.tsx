import { useState, useMemo } from 'react';
import { products, categories } from '@/data/menuData';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import { ClosedBanner } from '@/components/StoreStatus';
import { MondayPromo } from '@/components/MondayPromo';

export default function Cardapio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Group products by category for display
  const groupedProducts = useMemo(() => {
    if (activeCategory !== 'all') {
      return { [activeCategory]: filteredProducts };
    }
    
    const grouped: Record<string, typeof products> = {};
    categories.forEach((cat) => {
      if (cat.id === 'all') return;
      const categoryProducts = products.filter((p) => p.category === cat.id);
      if (categoryProducts.length > 0) {
        grouped[cat.id] = categoryProducts;
      }
    });
    return grouped;
  }, [activeCategory, filteredProducts]);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Cardápio</h1>
          <p className="text-muted-foreground">
            Escolha seus produtos favoritos
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* Closed Banner */}
        <ClosedBanner />

        {/* Monday Promo */}
        <MondayPromo />

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Products */}
        <div className="mt-6 space-y-10">
          {Object.entries(groupedProducts).map(([categoryId, categoryProducts]) => {
            const category = categories.find((c) => c.id === categoryId);
            return (
              <section key={categoryId} id={categoryId}>
                {activeCategory === 'all' && (
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span>{category?.icon}</span>
                    {category?.name}
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
