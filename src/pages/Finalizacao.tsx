import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, CreditCard, Truck, Store, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { contactInfo } from '@/data/menuData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type DeliveryType = 'delivery' | 'pickup';
type PaymentMethod = 'pix' | 'card' | 'cash';

export default function Finalizacao() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [needChange, setNeedChange] = useState(false);
  const [changeFor, setChangeFor] = useState('');
  
  // Customer info
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reference, setReference] = useState('');

  const deliveryFee = deliveryType === 'delivery' ? 2 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Por favor, informe seu nome');
      return false;
    }

    if (deliveryType === 'delivery') {
      if (!street.trim()) {
        toast.error('Por favor, informe a rua');
        return false;
      }
      if (!neighborhood.trim()) {
        toast.error('Por favor, informe o bairro');
        return false;
      }
    }

    if (paymentMethod === 'cash' && needChange && !changeFor.trim()) {
      toast.error('Por favor, informe o valor para troco');
      return false;
    }

    return true;
  };

  const formatOrderMessage = () => {
    let message = `🍕 *Pedido - Pizzaria do Léo*\n\n`;
    message += `📦 *Itens do Pedido:*\n`;

    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.product.name}`;
      if (item.size) {
        message += ` (${item.size})`;
      }
      if (item.selectedFlavors && item.selectedFlavors.length > 1) {
        const flavorNames = item.selectedFlavors.map((f) => f.name).join(', ');
        message += `\n  Sabores: ${flavorNames}`;
      }
      if (item.observations) {
        message += `\n  Obs: ${item.observations}`;
      }
      message += `\n  R$ ${item.totalPrice.toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n💰 *Subtotal:* R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    
    if (deliveryType === 'delivery') {
      message += `\n🚚 *Taxa de entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
    }
    
    message += `\n\n*Total: R$ ${finalTotal.toFixed(2).replace('.', ',')}*`;

    message += `\n\n${deliveryType === 'delivery' ? '🚚 *Entrega*' : '🏪 *Retirada no local*'}`;

    if (deliveryType === 'delivery') {
      message += `\n📍 *Endereço:*`;
      message += `\nRua: ${street}`;
      message += `\nBairro: ${neighborhood}`;
      if (reference) {
        message += `\nReferência: ${reference}`;
      }
    }

    message += `\n\n💳 *Pagamento:* ${
      paymentMethod === 'pix' ? 'PIX' : 
      paymentMethod === 'card' ? 'Cartão' : 'Dinheiro'
    }`;

    if (paymentMethod === 'cash' && needChange && changeFor) {
      message += `\n🔁 *Troco para:* R$ ${changeFor}`;
    }

    message += `\n\n👤 *Cliente:* ${name}`;

    return encodeURIComponent(message);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }

    const message = formatOrderMessage();
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    toast.success('Pedido enviado! Aguarde a confirmação no WhatsApp.');
    navigate('/');
  };

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  return (
    <div className="min-h-screen pb-40">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/carrinho')}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg">Finalizar Pedido</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Delivery Type */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            Tipo de Pedido
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeliveryType('delivery')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                deliveryType === 'delivery'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <Truck className={cn(
                'w-6 h-6 mb-2',
                deliveryType === 'delivery' ? 'text-primary' : 'text-muted-foreground'
              )} />
              <p className="font-semibold text-foreground">Entrega</p>
              <p className="text-sm text-muted-foreground">+ R$ 2,00</p>
            </button>
            <button
              onClick={() => setDeliveryType('pickup')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                deliveryType === 'pickup'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <Store className={cn(
                'w-6 h-6 mb-2',
                deliveryType === 'pickup' ? 'text-primary' : 'text-muted-foreground'
              )} />
              <p className="font-semibold text-foreground">Retirada</p>
              <p className="text-sm text-muted-foreground">Grátis</p>
            </button>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Seus Dados
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Nome *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="input-field"
              />
            </div>

            {deliveryType === 'delivery' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Rua *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Nome da rua e número"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Nome do bairro"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Ponto de Referência (opcional)
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Ex: próximo ao mercado"
                    className="input-field"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Forma de Pagamento
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {(['pix', 'card', 'cash'] as PaymentMethod[]).map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-center',
                  paymentMethod === method
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <span className="text-2xl mb-1 block">
                  {method === 'pix' ? '📱' : method === 'card' ? '💳' : '💵'}
                </span>
                <p className="font-medium text-sm text-foreground">
                  {method === 'pix' ? 'PIX' : method === 'card' ? 'Cartão' : 'Dinheiro'}
                </p>
              </button>
            ))}
          </div>

          {paymentMethod === 'cash' && (
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={needChange}
                  onChange={(e) => setNeedChange(e.target.checked)}
                  className="w-5 h-5 rounded border-border accent-primary"
                />
                <span className="text-foreground">Vai precisar de troco?</span>
              </label>
              {needChange && (
                <input
                  type="text"
                  value={changeFor}
                  onChange={(e) => setChangeFor(e.target.value)}
                  placeholder="Troco para quanto? (Ex: 50)"
                  className="input-field"
                />
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-4">Resumo do Pedido</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxa de entrega</span>
              <span className="text-foreground">
                {deliveryFee > 0 ? `R$ ${deliveryFee.toFixed(2).replace('.', ',')}` : 'Grátis'}
              </span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-xl text-primary">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom - Above bottom nav on mobile */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 glass border-t border-border z-[60]">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 text-lg transition-colors btn-press shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Enviar Pedido via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
