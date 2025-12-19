import { useNavigate } from "react-router-dom";
import { ChevronRight, Clock, MapPin, Star, Truck, Info } from "lucide-react";
import { StoreStatus, ClosedBanner } from "@/components/StoreStatus";
import { MondayPromo } from "@/components/MondayPromo";
import { businessHours, products } from "@/data/menuData";
import { ProductCard } from "@/components/ProductCard";

export default function Index() {
  const navigate = useNavigate();

  // Featured products
  const featuredProducts = products.filter((p) =>
    ["pizza-4-queijos", "x-bacon", "pizza-chocolate-preto", "da-casa"].includes(
      p.id
    )
  );

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-8 pb-12">
          <div className="flex flex-col items-center text-center">
            {/* Logo Area */}
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center mb-6 shadow-glow-primary animate-float">
              <span className="text-6xl">🍕</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Pizzaria e Hamburgueria
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-gradient mb-4">
              do Léo
            </h2>

            <StoreStatus />

            <p className="text-muted-foreground mt-4 max-w-md">
              As melhores pizzas e hambúrgueres da região, feitos com
              ingredientes selecionados e muito amor!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
              <button
                onClick={() => navigate("/cardapio")}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-lg"
              >
                Ver Cardápio
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Closed Banner */}
        <ClosedBanner />

        {/* Monday Promo */}
        <MondayPromo />

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Horário Card */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Horário</h3>
              <p className="text-sm text-muted-foreground">17h às 00h</p>
            </div>
          </div>

          {/* Entrega Card - ATUALIZADO */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 relative">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <div className="relative">
                <Truck className="w-6 h-6 text-secondary" />
                <MapPin className="w-3 h-3 text-white absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-1">
                Entrega
                <span className="text-xs text-muted-foreground font-normal">
                  <div className="relative group">
                    <Info className="w-3 h-3 cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      <p>
                        Taxa base R$ 2,00. Valor pode variar conforme distância
                        do local.
                      </p>
                    </div>
                  </div>
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Taxa base:{" "}
                <span className="font-semibold text-secondary">R$ 2,00</span>
              </p>
            </div>
          </div>

          {/* Qualidade Card */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Qualidade</h3>
              <p className="text-sm text-muted-foreground">5 estrelas</p>
            </div>
          </div>
        </div>

        {/* Observação sobre Entrega */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium mb-1">
                Informação sobre entregas
              </p>
              <p className="text-xs text-blue-600">
                A taxa de entrega tem valor base de{" "}
                <span className="font-semibold">R$ 2,00</span>. Para locais mais
                distantes, o valor pode ser ajustado conforme a distância. O
                valor final será confirmado durante o pedido via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Horário de Funcionamento
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.values(businessHours).map((hours, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl text-center ${
                  hours.isOpen
                    ? "bg-muted"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                <p className="font-semibold text-sm">{hours.day}</p>
                <p className="text-xs text-muted-foreground">
                  {hours.isOpen ? `${hours.open} - ${hours.close}` : "Fechado"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-foreground">Destaques</h3>
            <button
              onClick={() => navigate("/cardapio")}
              className="text-primary font-medium flex items-center gap-1 hover:underline"
            >
              Ver tudo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
