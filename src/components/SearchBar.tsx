import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { products, categories } from '@/data/menuData';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      const searchLower = query.toLowerCase();
      const filtered = products.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        const descMatch = product.description.toLowerCase().includes(searchLower);
        const categoryName = categories.find(c => c.id === product.category)?.name || '';
        const categoryMatch = categoryName.toLowerCase().includes(searchLower);
        return nameMatch || descMatch || categoryMatch;
      });
      setResults(filtered.slice(0, 8));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (productId: string) => {
    navigate(`/produto/${productId}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar pizza, hambúrguer, bebida..."
          className="input-field pl-12 pr-12"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50 animate-scale-in">
          <div className="max-h-80 overflow-y-auto">
            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors text-left"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {product.description}
                  </p>
                </div>
                <span className="text-primary font-bold">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length > 1 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl p-6 text-center z-50 animate-scale-in">
          <p className="text-muted-foreground">
            Nenhum resultado encontrado para "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
