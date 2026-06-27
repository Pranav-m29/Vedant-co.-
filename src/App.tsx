import { useState, useEffect } from 'react';
import { Product, CartItem, ScreenType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Import Views
import HomeView from './views/HomeView';
import CatalogView from './views/CatalogView';
import ProductDetailView from './views/ProductDetailView';
import CheckoutView from './views/CheckoutView';
import ScienceView from './views/ScienceView';
import JournalView from './views/JournalView';
import FAQView from './views/FAQView';
import ContactView from './views/ContactView';

export default function App() {
  // Screen Routing State
  const [currentScreen, setScreen] = useState<ScreenType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('botanical-sleep-elixir');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  // Cart & Drawer State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('verdant_apothecary_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse saved cart:', err);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('verdant_apothecary_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Scroll to top on screen transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentScreen, selectedProductId]);

  // Add Item to Cart
  const addToCart = (product: Product, quantity: number, duration: '30 Days' | '60 Days') => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedDuration === duration
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedDuration: duration }];
      }
    });
  };

  // Update Cart Item Quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove Item from Cart
  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear Cart upon purchase completion
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('verdant_apothecary_cart');
    setCouponDiscount(0);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1A2420] selection:bg-[#cbead7] selection:text-[#0c271b]">
      
      {/* Shared Header (Logo, search bar overlay, account indicators, bag popover) */}
      <Header
        currentScreen={currentScreen}
        setScreen={setScreen}
        setSelectedProductId={setSelectedProductId}
        cartCount={totalCartCount}
        openCart={() => setCartDrawerOpen(true)}
        userEmail="gkpranaveer700@gmail.com"
      />

      {/* Main View Container */}
      <main className="flex-grow">
        {currentScreen === 'home' && (
          <HomeView
            setScreen={setScreen}
            setCategoryFilter={setCategoryFilter}
          />
        )}

        {currentScreen === 'shop' && (
          <CatalogView
            setScreen={setScreen}
            setSelectedProductId={setSelectedProductId}
            addToCart={addToCart}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        )}

        {currentScreen === 'product-detail' && (
          <ProductDetailView
            productId={selectedProductId}
            setScreen={setScreen}
            setSelectedProductId={setSelectedProductId}
            addToCart={addToCart}
            openCart={() => setCartDrawerOpen(true)}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            clearCart={clearCart}
            setScreen={setScreen}
            couponDiscount={couponDiscount}
            setCouponDiscount={setCouponDiscount}
            userEmail="gkpranaveer700@gmail.com"
          />
        )}

        {currentScreen === 'science' && (
          <ScienceView
            setScreen={setScreen}
            setCategoryFilter={setCategoryFilter}
          />
        )}

        {currentScreen === 'journal' && (
          <JournalView
            setScreen={setScreen}
            setCategoryFilter={setCategoryFilter}
          />
        )}

        {currentScreen === 'faq' && (
          <FAQView
            setScreen={setScreen}
          />
        )}

        {currentScreen === 'contact' && (
          <ContactView
            setScreen={setScreen}
            userEmail="gkpranaveer700@gmail.com"
          />
        )}
      </main>

      {/* Shared Footer (Only hidden on Checkout to focus customer's transaction focus) */}
      {currentScreen !== 'checkout' && (
        <Footer setScreen={setScreen} />
      )}

      {/* Slide-out Cart Drawer Sidebar */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        setScreen={setScreen}
        couponDiscount={couponDiscount}
        setCouponDiscount={setCouponDiscount}
      />

    </div>
  );
}
