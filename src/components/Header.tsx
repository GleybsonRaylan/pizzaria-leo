import { Home, Pizza, ShoppingCart, Phone, Menu } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Início' },
  { to: '/cardapio', icon: Pizza, label: 'Cardápio' },
  { to: '/carrinho', icon: ShoppingCart, label: 'Carrinho' },
  { to: '/contato', icon: Phone, label: 'Contato' },
];

export function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-primary">
              <span className="text-2xl">🍕</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-foreground leading-tight">Pizzaria do Léo</h1>
              <p className="text-xs text-muted-foreground">& Hamburgueria</p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                activeClassName="text-primary bg-primary/10"
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {label === 'Carrinho' && totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Logo Text */}
          <div className="md:hidden">
            <h1 className="font-bold text-sm text-foreground">Pizzaria do Léo</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
