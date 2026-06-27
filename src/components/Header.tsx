import { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, User, ArrowRight, ExternalLink } from 'lucide-react';
import { Product, ScreenType } from '../types';
import { PRODUCTS } from '../data';

interface HeaderProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  setSelectedProductId: (id: string) => void;
  cartCount: number;
  openCart: () => void;
  userEmail: string;
}

export default function Header({
  currentScreen,
  setScreen,
  setSelectedProductId,
  cartCount,
  openCart,
  userEmail,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Filter products based on search query
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.format.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchResultClick = (productId: string) => {
    setSelectedProductId(productId);
    setScreen('product-detail');
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleNavClick = (screen: ScreenType) => {
    setScreen(screen);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top complimentary shipping banner */}
      <div className="bg-[#1A2420] text-[#F7F4EE] py-2 px-4 text-center select-none shrink-0 border-b border-[#2F4A3C]/20">
        <span className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase">
          Complimentary Shipping on Orders Over $75
        </span>
      </div>

      {/* Main navigation header */}
      <header className="bg-[#fcf9f3] border-b border-[#1A2420]/10 sticky top-0 z-40 transition-colors duration-300">
        <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-[1280px] mx-auto">
          
          {/* Mobile Menu Icon (Left) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-[#1A2420] hover:text-[#8B5A4A] transition-colors p-1"
            aria-label="Open Menu"
            id="mobile-menu-btn"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo (Center on mobile, Left on desktop) */}
          <button
            onClick={() => handleNavClick('home')}
            className="font-serif text-[28px] md:text-[36px] font-semibold tracking-tight text-[#1A2420] hover:text-[#8B5A4A] transition-colors duration-300 text-left focus:outline-none"
            id="brand-logo"
          >
            Verdant & Co.
          </button>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            <button
              onClick={() => handleNavClick('shop')}
              className={`font-sans text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 pb-1 border-b-2 ${
                currentScreen === 'shop'
                  ? 'text-[#1A2420] border-[#8B5A4A]'
                  : 'text-[#434845] border-transparent hover:text-[#8B5A4A]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('science')}
              className={`font-sans text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 pb-1 border-b-2 ${
                currentScreen === 'science'
                  ? 'text-[#1A2420] border-[#8B5A4A]'
                  : 'text-[#434845] border-transparent hover:text-[#8B5A4A]'
              }`}
            >
              Science & Philosophy
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className={`font-sans text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 pb-1 border-b-2 ${
                currentScreen === 'journal'
                  ? 'text-[#1A2420] border-[#8B5A4A]'
                  : 'text-[#434845] border-transparent hover:text-[#8B5A4A]'
              }`}
            >
              Journal
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`font-sans text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 pb-1 border-b-2 ${
                currentScreen === 'faq'
                  ? 'text-[#1A2420] border-[#8B5A4A]'
                  : 'text-[#434845] border-transparent hover:text-[#8B5A4A]'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`font-sans text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 pb-1 border-b-2 ${
                currentScreen === 'contact'
                  ? 'text-[#1A2420] border-[#8B5A4A]'
                  : 'text-[#434845] border-transparent hover:text-[#8B5A4A]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Trailing Icons (Right) */}
          <div className="flex items-center space-x-4">
            {/* Search Icon Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#1A2420] hover:text-[#8B5A4A] transition-colors scale-100 active:scale-95 transition-transform p-1"
              aria-label="Search Catalog"
              id="search-trigger-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon (with info popover) */}
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="text-[#1A2420] hover:text-[#8B5A4A] transition-colors scale-100 active:scale-95 transition-transform p-1"
                aria-label="Account Settings"
                id="account-btn"
              >
                <User className="w-5 h-5" />
              </button>

              {accountOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setAccountOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-[#F7F4EE] border border-[#1A2420]/10 rounded shadow-lg p-6 z-40 animate-fade-in text-left">
                    <h4 className="font-serif text-[18px] text-[#1A2420] mb-2 font-medium">Customer Account</h4>
                    <p className="font-sans text-xs text-[#434845] mb-4">
                      Logged in as:<br />
                      <span className="font-semibold text-[#1A2420]">{userEmail}</span>
                    </p>
                    <div className="space-y-2 border-t border-[#1A2420]/10 pt-4">
                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          handleNavClick('shop');
                        }}
                        className="w-full text-left text-xs text-[#434845] hover:text-[#8B5A4A] flex justify-between items-center py-1"
                      >
                        <span>View Orders</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          handleNavClick('science');
                        }}
                        className="w-full text-left text-xs text-[#434845] hover:text-[#8B5A4A] flex justify-between items-center py-1"
                      >
                        <span>Loyalty Status: Platinum</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Shopping Bag Button (Cart) */}
            <button
              onClick={openCart}
              className="text-[#1A2420] hover:text-[#8B5A4A] transition-colors scale-100 active:scale-95 transition-transform p-1 relative flex items-center justify-center"
              aria-label="Shopping Bag"
              id="shopping-bag-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B5A4A] text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-fade-in border border-[#fcf9f3]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Slide-Down Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-[#1A2420]/40 backdrop-blur-xs z-50 animate-fade-in flex flex-col justify-start">
          <div
            className="absolute inset-0"
            onClick={() => setSearchOpen(false)}
          />
          
          <div className="relative bg-[#fcf9f3] border-b border-[#1A2420]/10 w-full px-4 md:px-12 py-8 z-50">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B5A4A]">
                  Search Apothecary Catalog
                </span>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-[#1A2420] hover:text-[#8B5A4A] transition-colors p-2"
                  aria-label="Close search"
                  id="search-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex items-center border-b border-[#1A2420]/20 focus-within:border-[#8B5A4A] transition-colors duration-300">
                <Search className="w-6 h-6 text-[#434845] mr-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for Sleep Elixir, Skin Serums, Probiotics, Ashwagandha..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none py-4 text-xl md:text-2xl text-[#1A2420] placeholder:text-[#434845]/50 focus:outline-none focus:ring-0"
                  id="search-input-field"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#434845] hover:text-[#8B5A4A] font-bold uppercase tracking-wider"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Live search results */}
              {searchQuery.trim() !== '' && (
                <div className="mt-8 max-h-[60vh] overflow-y-auto space-y-6 animate-fade-in">
                  <p className="font-sans text-xs text-[#434845] uppercase tracking-wider">
                    Search Results ({searchResults.length})
                  </p>

                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSearchResultClick(product.id)}
                          className="flex gap-4 p-3 bg-[#F7F4EE] border border-[#1A2420]/5 rounded hover:border-[#8B5A4A] transition-all cursor-pointer group"
                        >
                          <div className="w-16 h-20 bg-[#f6f3ed] rounded overflow-hidden flex-shrink-0 border border-[#1A2420]/10">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex flex-col justify-between py-1">
                            <div>
                              <h5 className="font-sans text-sm font-semibold text-[#1A2420] group-hover:text-[#8B5A4A] transition-colors line-clamp-1">
                                {product.name}
                              </h5>
                              <p className="font-sans text-[12px] text-[#434845] uppercase tracking-wider mt-0.5">
                                {product.category} — {product.format}
                              </p>
                            </div>
                            <span className="font-sans text-sm font-medium text-[#1A2420]">
                              ${product.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="font-serif text-lg text-[#1A2420]">No formulas match your search.</p>
                      <p className="font-sans text-sm text-[#434845] mt-1">Please try another concern or ingredient name.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Search suggestions */}
              {searchQuery.trim() === '' && (
                <div className="mt-8">
                  <p className="font-sans text-xs text-[#434845] uppercase tracking-wider mb-3">
                    Popular Concerns
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Sleep & Stress', 'Insomnia', 'Ashwagandha', 'Magnesium', 'Skin Barrier', 'Gut Biome', 'Tincture'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-2 bg-[#F7F4EE] border border-[#1A2420]/10 rounded-full text-xs text-[#1A2420] hover:bg-[#1A2420] hover:text-white transition-colors uppercase font-bold tracking-wider"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1A2420]/50 backdrop-blur-xs z-50 animate-fade-in flex justify-start">
          <div
            className="absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative bg-[#F7F4EE] w-4/5 max-w-[340px] h-full flex flex-col p-6 shadow-2xl z-50 animate-slide-in">
            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-xl font-semibold text-[#1A2420]">
                Verdant & Co.
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#1A2420] p-1"
                id="mobile-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-left">
              <button
                onClick={() => handleNavClick('shop')}
                className={`font-serif text-[24px] text-left border-b border-[#1A2420]/10 pb-2 ${
                  currentScreen === 'shop' ? 'text-[#8B5A4A]' : 'text-[#1A2420]'
                }`}
              >
                Shop Collection
              </button>
              <button
                onClick={() => handleNavClick('science')}
                className={`font-serif text-[24px] text-left border-b border-[#1A2420]/10 pb-2 ${
                  currentScreen === 'science' ? 'text-[#8B5A4A]' : 'text-[#1A2420]'
                }`}
              >
                Science & Philosophy
              </button>
              <button
                onClick={() => handleNavClick('journal')}
                className={`font-serif text-[24px] text-left border-b border-[#1A2420]/10 pb-2 ${
                  currentScreen === 'journal' ? 'text-[#8B5A4A]' : 'text-[#1A2420]'
                }`}
              >
                Journal
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className={`font-serif text-[24px] text-left border-b border-[#1A2420]/10 pb-2 ${
                  currentScreen === 'faq' ? 'text-[#8B5A4A]' : 'text-[#1A2420]'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`font-serif text-[24px] text-left border-b border-[#1A2420]/10 pb-2 ${
                  currentScreen === 'contact' ? 'text-[#8B5A4A]' : 'text-[#1A2420]'
                }`}
              >
                Contact
              </button>
            </nav>

            <div className="mt-auto border-t border-[#1A2420]/10 pt-6">
              <p className="font-sans text-[11px] font-bold text-[#434845] uppercase tracking-wider">
                Support
              </p>
              <div className="flex flex-col space-y-2.5 mt-3 text-sm text-[#434845] text-left">
                <button
                  onClick={() => { handleNavClick('shop'); setMobileMenuOpen(false); }}
                  className="hover:text-[#8B5A4A] transition-colors text-left"
                >
                  Shipping & Returns
                </button>
                <button
                  onClick={() => { handleNavClick('science'); setMobileMenuOpen(false); }}
                  className="hover:text-[#8B5A4A] transition-colors text-left"
                >
                  Sustainability Standards
                </button>
                <button
                  onClick={() => { handleNavClick('faq'); setMobileMenuOpen(false); }}
                  className="hover:text-[#8B5A4A] transition-colors text-left"
                >
                  FAQ Page
                </button>
                <button
                  onClick={() => { handleNavClick('contact'); setMobileMenuOpen(false); }}
                  className="hover:text-[#8B5A4A] transition-colors text-left"
                >
                  Contact Lab
                </button>
                <span className="text-xs text-[#434845]/50 mt-4">
                  Account: {userEmail}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
