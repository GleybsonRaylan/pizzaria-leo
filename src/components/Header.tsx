import { Home, Pizza, ShoppingCart, Phone, Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Configuração da logo do cliente - ATUALIZADA COM O CAMINHO CORRETO
const CLIENT_LOGO = {
  src: "/assets/bebidas/logo-leo.png", // CAMINHO DA LOGO ATUALIZADO
  alt: "Logo da Lanchonete",
  width: 160,
  height: 60,
  fallback: "PIZZARIA DO LÉO", // Texto de fallback se a imagem não carregar
};

const navItems = [
  { to: "/", icon: Home, label: "Início" },
  { to: "/cardapio", icon: Pizza, label: "Cardápio" },
  { to: "/carrinho", icon: ShoppingCart, label: "Carrinho" },
  { to: "/contato", icon: Phone, label: "Contato" },
];

export function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Efeito para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu mobile ao clicar em um link
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-border/50 bg-background/95 backdrop-blur-md"
            : "bg-background border-b border-border/30"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - COM O CAMINHO ATUALIZADO */}
            <NavLink
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              onClick={closeMobileMenu}
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/20 flex items-center justify-center">
                {!logoError ? (
                  <img
                    src={CLIENT_LOGO.src}
                    alt={CLIENT_LOGO.alt}
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
                    <span className="text-white font-bold text-lg text-center">
                      {CLIENT_LOGO.fallback}
                    </span>
                  </div>
                )}
              </div>

              <div className="hidden lg:block">
                <h1 className="font-bold text-xl text-foreground leading-tight tracking-tight">
                  Pizzaria do Léo
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  & Hamburgueria • Delivery 24h
                </p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300",
                    "text-muted-foreground hover:text-foreground hover:bg-accent",
                    "relative group"
                  )}
                  activeClassName="text-primary bg-primary/10"
                >
                  <div className="relative">
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    {label === "Carrinho" && totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse-subtle">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold">{label}</span>

                  {/* Indicador ativo */}
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <NavLink
                to="/carrinho"
                className="relative p-2"
                onClick={closeMobileMenu}
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </NavLink>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden fixed inset-x-0 top-20 bg-background/95 backdrop-blur-lg border-t border-border/50 transition-all duration-300 overflow-hidden",
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col gap-2">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200",
                    "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  activeClassName="text-primary bg-primary/10"
                  onClick={closeMobileMenu}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {label === "Carrinho" && totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-base">{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Informações de contato no mobile */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(81) 99761-5125</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2"></p>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay para mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
