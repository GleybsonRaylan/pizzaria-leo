import { Home, Pizza, ShoppingCart, Phone } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Início' },
  { to: '/cardapio', icon: Pizza, label: 'Cardápio' },
  { to: '/carrinho', icon: ShoppingCart, label: 'Carrinho' },
  { to: '/contato', icon: Phone, label: 'Contato' },
];

export function BottomNav() {
  const { totalItems } = useCart();

  return (
    <nav className="bottom-nav md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="nav-item text-muted-foreground"
            activeClassName="nav-item-active"
          >
            <div className="relative">
              <Icon className="w-6 h-6" />
              {label === 'Carrinho' && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-scale-in">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
