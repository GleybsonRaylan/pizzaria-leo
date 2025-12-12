import { useRef, useEffect } from 'react';
import { categories } from '@/data/menuData';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const button = activeRef.current;
      const scrollLeft = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg py-4 -mx-4 px-4 border-b border-border/50">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto hide-scrollbar pb-2"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            ref={category.id === activeCategory ? activeRef : null}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'category-chip flex items-center gap-2',
              category.id === activeCategory
                ? 'category-chip-active'
                : 'category-chip-inactive'
            )}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
