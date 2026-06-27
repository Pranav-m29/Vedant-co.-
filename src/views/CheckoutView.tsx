import { useState, useMemo, FormEvent } from 'react';
import { Shield, Lock, CreditCard, ShoppingBag, CheckCircle, ArrowLeft, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { CartItem, ScreenType, CheckoutInfo } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  clearCart: () => void;
  setScreen: (screen: ScreenType) => void;
  couponDiscount: number; // percentage (e.g. 15)
  setCouponDiscount: (discount: number) => void;
  userEmail: string;
}

type CheckoutStage = 'info' | 'shipping' | 'payment' | 'completed';

export default function CheckoutView({
  cartItems,
  clearCart,
  setScreen,
  couponDiscount,
  setCouponDiscount,
  userEmail,
}: CheckoutViewProps) {
  const [stage, setStage] = useState<CheckoutStage>('info');
  const [couponCode, setCouponCode] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [couponError, setCouponError] = useState('');
  
  // Checkout Info Form State
  const [form, setForm] = useState<CheckoutInfo>({
    email: userEmail,
    newsletter: true,
    country: 'United States',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const shippingCost = shippingMethod === 'express' ? 15 : 0;

  // Credit Card Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Cart subtotal calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const pricePerUnit = item.selectedDuration === '60 Days' 
        ? item.product.price * 2 * 0.85 
        : item.product.price;
      return acc + pricePerUnit * item.quantity;
    }, 0);
  }, [cartItems]);

  const discountAmount = subtotal * (couponDiscount / 100);
  const total = subtotal - discountAmount + shippingCost;

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME15' || couponCode.toUpperCase() === 'REST15') {
      setCouponDiscount(15);
      setCouponSuccess('15% discount applied successfully!');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try WELCOME15.');
      setCouponSuccess('');
    }
  };

  const handleInfoSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.address || !form.city || !form.zip) {
      alert("Please complete all required fields.");
      return;
    }
    setStage('shipping');
  };

  const handleShippingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStage('payment');
  };

  const handlePaymentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCVV) {
      alert("Please fill in all credit card details.");
      return;
    }
    
    setPaymentProcessing(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          cartItems,
          total,
          shippingMethod,
          payment: {
            cardName,
            cardNumber,
            cardExpiry,
            cardCVV
          }
        })
      });

      const data = await response.json();
      if (response.ok) {
        setOrderId(data.orderId);
        setStage('completed');
        clearCart();
      } else {
        alert(data.message || 'Payment processing failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to order processing server.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Render stage 4 Order Completion Screen
  if (stage === 'completed') {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-16 text-center animate-fade-in space-y-8">
        <div className="flex justify-center select-none">
          <div className="bg-[#2F4A3C]/10 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-[#2F4A3C]" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="font-sans text-[11px] font-bold text-[#8B5A4A] uppercase tracking-[0.15em]">
            Ritual Confirmed
          </span>
          <h1 className="font-serif text-[36px] md:text-[48px] text-[#1A2420] font-medium leading-none">
            Thank you for your order, {form.firstName}.
          </h1>
          <p className="font-sans text-[15px] text-[#434845] max-w-lg mx-auto leading-relaxed">
            Your laboratory formulation request has been processed. A receipt and carbon-neutral transit itinerary has been dispatched to <span className="font-semibold text-[#1A2420]">{form.email}</span>.
          </p>
        </div>

        <div className="bg-[#f6f3ed] rounded border border-[#1A2420]/10 max-w-md mx-auto p-6 text-left space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#1A2420]/10 font-sans text-xs uppercase font-bold tracking-wider text-[#1a2420]">
            <span>Order Reference</span>
            <span className="text-[#8B5A4A]">{orderId}</span>
          </div>

          <div className="space-y-2 text-sm text-[#434845] font-sans">
            <p>
              <span className="font-semibold text-[#1A2420]">Deliver to:</span><br />
              {form.firstName} {form.lastName}<br />
              {form.address}, {form.apartment && `${form.apartment}, `}{form.city}, {form.state} {form.zip}
            </p>
            <p className="pt-2 border-t border-[#1a2420]/5 text-xs text-[#737875]">
              Estimated Carbon-Neutral Delivery: 3 - 5 business days.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={() => setScreen('home')}
            className="px-10 py-4 bg-[#1A2420] text-white hover:bg-[#8B5A4A] rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all scale-100 active:scale-95 shadow-md"
          >
            Continue Sourcing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-10 animate-fade-in text-left">
      
      {/* Checkout breadcrumb progress indicator */}
      <div className="w-full mb-12 flex items-center justify-center space-x-3 md:space-x-6 font-sans text-[11px] font-bold uppercase tracking-widest text-[#737875] select-none">
        <span className={stage === 'info' ? 'text-[#8B5A4A]' : 'opacity-60'}>Information</span>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        <span className={stage === 'shipping' ? 'text-[#8B5A4A]' : 'opacity-60'}>Shipping</span>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        <span className={stage === 'payment' ? 'text-[#8B5A4A]' : 'opacity-60'}>Payment</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side forms (60%) */}
        <div className="w-full lg:w-[60%] space-y-10">
          
          {/* Stage 1: Information Form */}
          {stage === 'info' && (
            <form onSubmit={handleInfoSubmit} className="space-y-8 animate-fade-in">
              <section className="space-y-4">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="font-serif text-[24px] text-[#1A2420] font-medium">Contact Information</h2>
                  <span className="text-xs font-sans text-[#434845]">
                    Logged in as <span className="font-semibold text-[#1A2420]">{userEmail}</span>
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] transition-all"
                    id="checkout-email"
                  />
                  <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                    Email Address
                  </label>
                </div>
                <div className="flex items-center space-x-2.5 pt-2">
                  <input
                    type="checkbox"
                    checked={form.newsletter}
                    onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
                    className="rounded-xs border-[#1A2420]/20 text-[#8B5A4A] focus:ring-[#8B5A4A] bg-transparent w-4 h-4 cursor-pointer"
                    id="checkout-newsletter-opt"
                  />
                  <label htmlFor="checkout-newsletter-opt" className="font-sans text-xs text-[#434845] cursor-pointer">
                    Email me with botanical discoveries and seasonal formulary details.
                  </label>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="font-serif text-[24px] text-[#1A2420] font-medium mb-4">Shipping Destination</h2>
                
                <div className="relative">
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all appearance-none"
                    id="checkout-country"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                  <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                    Country/Region
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all"
                      id="checkout-firstname"
                    />
                    <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                      First Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all"
                      id="checkout-lastname"
                    />
                    <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="123 Apothecary Way"
                    className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all"
                    id="checkout-address"
                  />
                  <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                    Street Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={form.apartment}
                    onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                    placeholder="Suite 4B (Optional)"
                    className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all"
                    id="checkout-apt"
                  />
                  <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                    Apartment, Suite, Unit
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="relative col-span-1">
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all"
                      id="checkout-city"
                    />
                    <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                      City
                    </label>
                  </div>
                  <div className="relative col-span-1">
                    <input
                      type="text"
                      required
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      placeholder="CA"
                      className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all text-center"
                      id="checkout-state"
                    />
                    <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                      State / Prov
                    </label>
                  </div>
                  <div className="relative col-span-1">
                    <input
                      type="text"
                      required
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all"
                      id="checkout-zip"
                    />
                    <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                      ZIP Code
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all"
                    id="checkout-phone"
                  />
                  <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                    Phone Number
                  </label>
                </div>
              </section>

              <div className="pt-6 border-t border-[#1A2420]/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setScreen('shop')}
                  className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-[#434845] hover:text-[#1A2420] transition-colors focus:outline-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Cancel Sourcing</span>
                </button>
                
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-[#8B5A4A] hover:bg-[#1A2420] text-[#F7F4EE] font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-colors focus:outline-none shadow-md"
                >
                  Continue to Shipping
                </button>
              </div>
            </form>
          )}

          {/* Stage 2: Shipping Method Form */}
          {stage === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-8 animate-fade-in text-left">
              <section className="space-y-4">
                <h2 className="font-serif text-[24px] text-[#1A2420] font-medium mb-4">Shipping Protocol</h2>
                
                {/* Summary Box */}
                <div className="bg-[#f6f3ed] p-5 rounded border border-[#1A2420]/10 space-y-3 font-sans text-xs text-[#434845]">
                  <div className="flex justify-between border-b border-[#1a2420]/5 pb-2">
                    <span className="font-bold">Contact:</span>
                    <span>{form.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Ship to:</span>
                    <span>{form.firstName} {form.lastName}, {form.address}, {form.city}, {form.state} {form.zip}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Option Standard */}
                  <label className={`flex justify-between items-center p-4 border rounded cursor-pointer transition-all ${
                    shippingMethod === 'standard' ? 'border-[#8B5A4A] bg-[#8B5A4A]/5' : 'border-[#1A2420]/10 hover:border-[#1A2420]/30'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="text-[#8B5A4A] focus:ring-[#8B5A4A]"
                        id="shipping-standard-radio"
                      />
                      <div className="text-left">
                        <p className="font-sans text-sm font-bold text-[#1A2420]">Standard Eco-Transit</p>
                        <p className="font-sans text-xs text-[#434845]">3-5 Business days. Carbon-neutral cargo dispatch.</p>
                      </div>
                    </div>
                    <span className="font-sans text-sm font-semibold text-[#2F4A3C]">Free</span>
                  </label>

                  {/* Option Express */}
                  <label className={`flex justify-between items-center p-4 border rounded cursor-pointer transition-all ${
                    shippingMethod === 'express' ? 'border-[#8B5A4A] bg-[#8B5A4A]/5' : 'border-[#1A2420]/10 hover:border-[#1A2420]/30'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="text-[#8B5A4A] focus:ring-[#8B5A4A]"
                        id="shipping-express-radio"
                      />
                      <div className="text-left">
                        <p className="font-sans text-sm font-bold text-[#1A2420]">Apothecary Express Delivery</p>
                        <p className="font-sans text-xs text-[#434845]">1-2 Business days. Priority refrigerated carrier dispatch.</p>
                      </div>
                    </div>
                    <span className="font-sans text-sm font-semibold text-[#1A2420]">$15.00</span>
                  </label>
                </div>
              </section>

              <div className="pt-6 border-t border-[#1A2420]/10 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStage('info')}
                  className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-[#434845] hover:text-[#1A2420] transition-colors focus:outline-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Information</span>
                </button>
                
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-[#8B5A4A] hover:bg-[#1A2420] text-[#F7F4EE] font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-colors focus:outline-none shadow-md"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {/* Stage 3: Payment details Form */}
          {stage === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-8 animate-fade-in text-left">
              <section className="space-y-6">
                <h2 className="font-serif text-[24px] text-[#1A2420] font-medium mb-4">Secure Payment Method</h2>
                
                <div className="bg-[#f6f3ed] p-5 rounded border border-[#1A2420]/10 space-y-2 font-sans text-xs text-[#434845]">
                  <div className="flex justify-between border-b border-[#1a2420]/5 pb-1.5">
                    <span className="font-bold">Contact:</span>
                    <span>{form.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1a2420]/5 pb-1.5">
                    <span className="font-bold">Ship to:</span>
                    <span>{form.firstName} {form.lastName}, {form.address}, {form.city}, {form.state} {form.zip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Transit:</span>
                    <span className="capitalize">{shippingMethod} eco-transit (${shippingCost.toFixed(2)})</span>
                  </div>
                </div>

                <div className="border border-[#1A2420]/10 rounded bg-[#F7F4EE] p-5 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-[#1A2420]/10">
                    <span className="font-sans text-sm font-bold text-[#1A2420] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#8B5A4A]" /> Credit Card
                    </span>
                    <span className="font-sans text-[9px] uppercase font-bold text-[#737875] tracking-widest">
                      Encrypted 256-Bit SSL
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="CARDHOLDER NAME"
                      className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] uppercase tracking-wider font-semibold"
                      id="checkout-card-name"
                    />
                    <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                      Cardholder Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="•••• •••• •••• ••••"
                      maxLength={19}
                      className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] placeholder:text-[#c3c8c4]"
                      id="checkout-card-number"
                    />
                    <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                      Card Number
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        maxLength={7}
                        className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] text-center"
                        id="checkout-card-expiry"
                      />
                      <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                        Expiration
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] text-center"
                        id="checkout-card-cvv"
                      />
                      <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                        CVV Security Code
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-6 border-t border-[#1A2420]/10 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStage('shipping')}
                  className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-[#434845] hover:text-[#1A2420] transition-colors focus:outline-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Shipping</span>
                </button>
                
                <button
                  type="submit"
                  disabled={paymentProcessing}
                  className="w-full md:w-auto px-12 py-4 bg-[#2F4A3C] hover:bg-[#1A2420] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-colors focus:outline-none shadow-md flex items-center justify-center gap-2 disabled:bg-[#434845]"
                >
                  {paymentProcessing ? (
                    <span>Cryptographic Validation...</span>
                  ) : (
                    <>
                      <span>Complete Purchase</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right Side order summary (40%) */}
        <div className="w-full lg:w-[40%] bg-transparent">
          <div className="border border-[#1A2420]/10 p-6 md:p-8 rounded bg-[#F7F4EE] sticky top-28 text-left">
            <h3 className="font-serif text-[20px] md:text-[24px] text-[#1A2420] font-medium mb-6">
              Order Summary
            </h3>

            {/* Cart line items */}
            <div className="space-y-5 max-h-[40vh] overflow-y-auto no-scrollbar border-b border-[#1A2420]/10 pb-6 mb-6">
              {cartItems.length === 0 ? (
                <div className="py-4 text-center text-[#737875] text-xs uppercase tracking-wider font-semibold">
                  Bag is empty.
                </div>
              ) : (
                cartItems.map((item) => {
                  const itemPrice = item.selectedDuration === '60 Days' 
                    ? item.product.price * 2 * 0.85 
                    : item.product.price;
                  
                  return (
                    <div key={`${item.product.id}-${item.selectedDuration}`} className="flex items-center space-x-4 animate-fade-in">
                      <div className="w-16 h-16 bg-[#f6f3ed] rounded border border-[#1A2420]/10 relative flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="object-cover w-full h-full mix-blend-multiply"
                        />
                        <div className="absolute -top-1.5 -right-1.5 bg-[#1A2420] text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10 border border-[#F7F4EE]">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-sans text-sm font-bold text-[#1A2420] truncate">
                          {item.product.name}
                        </p>
                        <p className="font-sans text-[11px] text-[#434845] uppercase tracking-wider mt-0.5">
                          {item.selectedDuration} / {item.product.format}
                        </p>
                      </div>
                      <div className="font-sans text-sm font-semibold text-[#1A2420] shrink-0">
                        ${(itemPrice * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Promotional discount code apply sachet */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 border-b border-[#1A2420]/10 pb-6 mb-6 animate-fade-in">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Gift card or promo code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:ring-0 py-2 text-xs text-[#1A2420] placeholder:text-[#c3c8c4] uppercase font-bold tracking-wider"
                  id="checkout-coupon-field"
                />
                {couponError && <p className="text-[10px] text-red-600 mt-1 font-semibold">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] text-[#8B5A4A] mt-1 font-semibold">{couponSuccess}</p>}
              </div>
              <button
                type="submit"
                className="bg-[#1A2420] hover:bg-[#8B5A4A] text-white px-5 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all focus:outline-none"
              >
                Apply
              </button>
            </form>

            {/* Line items totals breakdown */}
            <div className="space-y-3 mb-6 font-sans text-sm text-[#434845]">
              <div className="flex justify-between items-baseline">
                <span>Subtotal</span>
                <span className="text-[#1A2420] font-semibold">${subtotal.toFixed(0)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between items-baseline text-[#8B5A4A] font-semibold">
                  <span>Sachet Code (15% Off)</span>
                  <span>-${discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline">
                <span>Shipping Transit</span>
                <span className="text-[#1A2420]">
                  {shippingCost === 0 ? 'Free Standard' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-[#737875]">
                <span>Taxes &amp; Duties (Included)</span>
                <span>$0.00</span>
              </div>
            </div>

            {/* Final checkout totals summation */}
            <div className="flex justify-between items-end border-t border-[#1A2420]/20 pt-6">
              <span className="font-sans text-[13px] font-bold uppercase tracking-wider text-[#1A2420]">
                Total Amount
              </span>
              <div className="text-right">
                <span className="font-sans text-[10px] text-[#434845] mr-1.5 font-bold">USD</span>
                <span className="font-serif text-[32px] md:text-[38px] text-[#1A2420] font-semibold leading-none">
                  ${total.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Trust factors bottom strip */}
            <div className="grid grid-cols-3 gap-2 pt-8 mt-8 border-t border-[#1A2420]/10">
              <div className="flex flex-col items-center text-center space-y-1.5 select-none">
                <Lock className="w-4 h-4 text-[#8B5A4A]" />
                <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-[#737875] leading-none">Secure SSL</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1.5 select-none">
                <Shield className="w-4 h-4 text-[#8B5A4A]" />
                <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-[#737875] leading-none">Carbon Neut.</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1.5 select-none">
                <Sparkles className="w-4 h-4 text-[#8B5A4A]" />
                <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-[#737875] leading-none">3rd Party Lab</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
