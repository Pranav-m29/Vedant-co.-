import { useState, FormEvent } from 'react';
import { X, Minus, Plus, Lock, ChevronDown, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, ScreenType } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  setScreen: (screen: ScreenType) => void;
  couponDiscount: number; // percentage (e.g., 15)
  setCouponDiscount: (discount: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  setScreen,
  couponDiscount,
  setCouponDiscount,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [couponExpanded, setCouponExpanded] = useState(false);

  if (!isOpen) return null;

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    // 60 days duration gets a 15% discount (Subscribe & Save)
    const pricePerUnit = item.selectedDuration === '60 Days' 
      ? item.product.price * 2 * 0.85 
      : item.product.price;
    return acc + pricePerUnit * item.quantity;
  }, 0);

  // Apply Coupon Discount
  const discountAmount = subtotal * (couponDiscount / 100);
  const total = subtotal - discountAmount;

  // Free gift progress ($75 threshold)
  const freeShippingThreshold = 75;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForGift = Math.max(freeShippingThreshold - subtotal, 0);

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME15' || couponCode.toUpperCase() === 'REST15') {
      setCouponDiscount(15);
      setCouponSuccess('15% discount applied successfully!');
      setCouponError('');
    } else if (couponCode.trim() === '') {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME15.');
      setCouponSuccess('');
    }
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      alert("Your bag is empty. Please add items before checking out.");
      return;
    }
    onClose();
    setScreen('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A2420]/40 backdrop-blur-xs transition-opacity animate-fade-in cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside
        className="relative w-full max-w-[440px] h-full bg-[#F7F4EE] shadow-2xl flex flex-col animate-slide-in z-50 text-left"
        aria-labelledby="cart-heading"
      >
        {/* Header */}
        <header className="px-6 py-6 border-b border-[#1A2420]/10 flex items-center justify-between shrink-0 bg-[#F7F4EE]">
          <div className="flex items-baseline gap-3">
            <h2 id="cart-heading" className="font-serif text-[28px] text-[#1A2420] font-medium m-0">
              Your Bag
            </h2>
            <span className="font-sans text-[11px] font-bold text-[#434845] uppercase tracking-widest">
              ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#1A2420] hover:text-[#8B5A4A] transition-colors p-2 -mr-2 flex items-center justify-center rounded-full hover:bg-[#1A2420]/5 focus:outline-none"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Complimentary Gift Progress Bar */}
        <div className="px-6 py-4 bg-[#f6f3ed] border-b border-[#1A2420]/5 shrink-0 select-none">
          {subtotal >= freeShippingThreshold ? (
            <p className="font-sans text-[13px] text-[#1A2420] mb-2 text-center flex items-center justify-center gap-1.5 font-semibold">
              <Check className="w-4 h-4 text-[#8B5A4A]" /> You’ve unlocked a complimentary <span className="text-[#8B5A4A]">Botanical Mist</span>!
            </p>
          ) : (
            <p className="font-sans text-[13px] text-[#1A2420] mb-2 text-center">
              You are <span className="font-bold text-[#8B5A4A]">${remainingForGift.toFixed(0)}</span> away from a complimentary Botanical Mist.
            </p>
          )}
          <div className="w-full h-1.5 bg-[#e5e2dc] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B5A4A] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items Scrollable Content */}
        <div className="flex-grow overflow-y-auto px-6 py-6 space-y-8">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#434845]/30 stroke-[1.5]" />
              <div>
                <p className="font-serif text-[20px] text-[#1A2420]">Your bag is empty</p>
                <p className="font-sans text-xs text-[#434845] mt-1">Add items from our collection to begin your ritual.</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setScreen('shop');
                }}
                className="mt-4 bg-[#8B5A4A] text-[#F7F4EE] font-sans text-[11px] font-bold uppercase py-3 px-6 rounded-full hover:bg-[#9d430a] transition-all tracking-wider"
              >
                Shop Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemPrice = item.selectedDuration === '60 Days'
                ? item.product.price * 2 * 0.85
                : item.product.price;

              return (
                <div key={`${item.product.id}-${item.selectedDuration}`} className="flex gap-4 items-start group border-b border-[#1A2420]/5 pb-6 animate-fade-in">
                  {/* Thumbnail */}
                  <div className="w-[90px] h-[120px] shrink-0 border border-[#1A2420]/10 rounded overflow-hidden bg-[#f6f3ed] relative cursor-pointer"
                    onClick={() => {
                      onClose();
                      setScreen('product-detail');
                    }}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-col flex-grow h-[120px] justify-between py-1">
                    <div className="flex justify-between items-start gap-2">
                      <div className="cursor-pointer" onClick={() => { onClose(); setScreen('product-detail'); }}>
                        <h3 className="font-serif text-[20px] leading-tight text-[#1A2420] hover:text-[#8B5A4A] transition-colors line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="font-sans text-[12px] text-[#434845] uppercase tracking-wider mt-0.5">
                          {item.selectedDuration} / {item.product.format}
                        </p>
                      </div>
                      <span className="font-sans text-[15px] font-semibold text-[#1A2420] shrink-0">
                        ${(itemPrice * item.quantity).toFixed(0)}
                      </span>
                    </div>

                    <div className="flex justify-between items-end">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#1A2420]/20 rounded overflow-hidden h-9 bg-[#fcf9f3]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-[#1A2420] hover:bg-[#1A2420]/5 transition-colors focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-sans text-[14px] text-[#1A2420] border-x border-[#1A2420]/10 flex items-center justify-center h-full select-none font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-[#1A2420] hover:bg-[#1A2420]/5 transition-colors focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="font-sans text-[10px] text-[#737875] hover:text-red-700 transition-colors uppercase tracking-widest border-b border-transparent hover:border-red-700 pb-0.5 font-bold focus:outline-none"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Coupon Code Block */}
          {cartItems.length > 0 && (
            <div className="pt-6 border-t border-[#1A2420]/5">
              <button
                onClick={() => setCouponExpanded(!couponExpanded)}
                className="w-full flex justify-between items-center font-sans text-[11px] font-bold text-[#1A2420] uppercase tracking-widest select-none focus:outline-none py-1"
              >
                <span>Have a code?</span>
                <ChevronDown className={`w-4 h-4 text-[#1A2420]/60 transform transition-transform ${couponExpanded ? 'rotate-180' : ''}`} />
              </button>

              {couponExpanded && (
                <form onSubmit={handleApplyCoupon} className="mt-4 flex gap-2 animate-fade-in">
                  <div className="flex-grow flex flex-col">
                    <input
                      type="text"
                      placeholder="WELCOME15"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-transparent border border-[#1A2420]/20 rounded px-3 py-2 font-sans text-[14px] focus:outline-none focus:border-[#1A2420] focus:ring-0 text-[#1A2420] placeholder:text-[#c3c8c4]"
                      id="cart-coupon-input"
                    />
                    {couponError && <span className="text-[11px] text-red-600 mt-1 font-sans">{couponError}</span>}
                    {couponSuccess && <span className="text-[11px] text-[#8B5A4A] mt-1 font-sans">{couponSuccess}</span>}
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 border border-[#1A2420] text-[#1A2420] rounded font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-[#1A2420] hover:text-[#F7F4EE] transition-colors focus:outline-none"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#1A2420]/10 bg-[#F7F4EE] px-6 py-6 shrink-0 relative z-20 shadow-[0_-4px_24px_rgba(26,36,32,0.03)]">
            {/* Coupon applied notice */}
            {couponDiscount > 0 && (
              <div className="flex justify-between items-center mb-3 text-xs text-[#8B5A4A] font-sans">
                <span>Code applied (WELCOME15 - 15% off)</span>
                <span>-${discountAmount.toFixed(0)}</span>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex justify-between items-baseline mb-4">
              <span className="font-sans text-[15px] text-[#434845]">Subtotal</span>
              <span className="font-serif text-[32px] text-[#1A2420] font-semibold leading-none">
                ${total.toFixed(0)}
              </span>
            </div>
            
            <p className="font-sans text-[12px] text-[#737875] text-center mb-4 leading-none">
              Complimentary carbon-neutral shipping &amp; taxes calculated at checkout.
            </p>

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-[#8B5A4A] text-[#F7F4EE] hover:bg-[#9d430a] transition-all duration-300 rounded-full py-4 px-6 flex justify-between items-center group focus:outline-none focus:ring-2 focus:ring-[#8B5A4A]/20"
              id="checkout-trigger-btn"
            >
              <span className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] z-10 relative">
                Checkout
              </span>
              <div className="flex items-center gap-1.5 z-10 relative">
                <span className="font-sans text-[14px] font-semibold">${total.toFixed(0)}</span>
                <span className="font-normal text-sm opacity-50">|</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Secure Checkout Note */}
            <div className="flex items-center justify-center gap-1.5 mt-4 text-[#737875] opacity-80 select-none">
              <Lock className="w-3 h-3" />
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest">
                Secure Encrypted Checkout
              </span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
