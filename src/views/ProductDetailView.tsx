import { useState, useMemo, useEffect, FormEvent } from 'react';
import { Star, Minus, Plus, Shield, RefreshCw, Truck, Heart, ArrowLeft, Check, Compass, Send, MessageSquare } from 'lucide-react';
import { Product, ScreenType, Review } from '../types';
import { PRODUCTS } from '../data';

interface ProductDetailViewProps {
  productId: string;
  setScreen: (screen: ScreenType) => void;
  setSelectedProductId: (id: string) => void;
  addToCart: (product: Product, quantity: number, duration: '30 Days' | '60 Days') => void;
  openCart: () => void;
}

type TabType = 'description' | 'ingredients' | 'usage' | 'clinical';

export default function ProductDetailView({
  productId,
  setScreen,
  setSelectedProductId,
  addToCart,
  openCart,
}: ProductDetailViewProps) {
  // Find current product
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  }, [productId]);

  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [selectedDuration, setSelectedDuration] = useState<'30 Days' | '60 Days'>('30 Days');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Customer Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submitError, setSubmitError] = useState('');
  const [submitSubmitting, setSubmitSubmitting] = useState(false);

  // Fetch reviews whenever productId changes
  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const response = await fetch(`/api/reviews?productId=${productId}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      setSubmitError('Please enter your name and a review comment.');
      return;
    }
    setSubmitSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          name: newReviewName,
          rating: newReviewRating,
          comment: newReviewComment,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setReviews((prev) => [data.review, ...prev]);
        setNewReviewName('');
        setNewReviewComment('');
        setNewReviewRating(5);
      } else {
        setSubmitError(data.message || 'Failed to submit review.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to connect to reviews server.');
    } finally {
      setSubmitSubmitting(false);
    }
  };

  // Compile list of image options
  const images = useMemo(() => {
    const list = [product.imageUrl];
    if (product.secondaryImages) {
      list.push(...product.secondaryImages);
    }
    return list;
  }, [product]);

  // Adjust Quantity
  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  // Subscribe & Save math (15% off for 60 days duration)
  const basePrice = product.price;
  const singlePrice = selectedDuration === '60 Days' 
    ? basePrice * 2 * 0.85 
    : basePrice;
  const totalPrice = singlePrice * quantity;

  // Add to cart handler
  const handleAddToBag = () => {
    addToCart(product, quantity, selectedDuration);
    openCart();
  };

  // Find recommendations (same category, different product)
  const recommendations = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-10 animate-fade-in text-left">
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center space-x-2 font-sans text-[11px] font-bold text-[#737875] uppercase tracking-[0.15em] select-none">
        <button onClick={() => setScreen('home')} className="hover:text-[#1A2420] transition-colors focus:outline-none">
          Home
        </button>
        <span className="text-[#1A2420]/30">/</span>
        <button onClick={() => setScreen('shop')} className="hover:text-[#1A2420] transition-colors focus:outline-none">
          Shop
        </button>
        <span className="text-[#1A2420]/30">/</span>
        <span className="text-[#1A2420]">{product.name}</span>
      </nav>

      {/* Back button */}
      <button
        onClick={() => setScreen('shop')}
        className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#8B5A4A] hover:text-[#1A2420] transition-colors mb-6 focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Catalog</span>
      </button>

      {/* Product Display Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        
        {/* Left Column: Asymmetric Image Carousel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-full">
          
          {/* Thumbnails strip */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 no-scrollbar pb-2 md:pb-0 select-none">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 md:w-full md:h-28 shrink-0 rounded border overflow-hidden relative active:scale-98 transition-all ${
                    activeImageIndex === idx ? 'border-[#8B5A4A] ring-1 ring-[#8B5A4A]' : 'border-[#1A2420]/10 hover:border-[#1A2420]/40'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image Display Frame */}
          <div className="w-full aspect-[4/5] md:h-[550px] lg:h-[600px] rounded border border-[#1A2420]/10 overflow-hidden relative bg-[#f6f3ed] select-none flex-grow">
            <img
              src={images[activeImageIndex] || product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover mix-blend-multiply transition-all duration-300"
            />
            
            {/* Wishlist Heart Icon */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-xs z-10 focus:outline-none active:scale-90"
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 transition-colors ${wishlisted ? 'text-red-600 fill-red-600' : 'text-[#1A2420]'}`} />
            </button>
          </div>

        </div>

        {/* Right Column: Information & checkout purchase block (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full">
          
          {/* Tag & review status */}
          <div className="mb-4 flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold uppercase text-[#8B5A4A] tracking-[0.15em] bg-[#8B5A4A]/10 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <div className="flex text-[#8B5A4A]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current stroke-none" />
                ))}
              </div>
              <span className="text-xs font-sans text-[#434845] underline ml-1 cursor-pointer">
                128 Reviews
              </span>
            </div>
          </div>

          <h1 className="font-serif text-[32px] md:text-[40px] text-[#1A2420] font-medium leading-tight mb-3">
            {product.name}
          </h1>

          <p className="font-sans text-[15px] text-[#434845] mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing display with subscription promo indicator */}
          <div className="flex items-end gap-3 mb-8">
            <span className="font-serif text-[32px] text-[#1A2420] font-semibold leading-none">
              ${singlePrice.toFixed(0)}
            </span>
            {selectedDuration === '60 Days' ? (
              <>
                <span className="text-[#434845] line-through text-sm mb-1">${(basePrice * 2).toFixed(0)}</span>
                <span className="font-sans text-[10px] font-bold uppercase text-[#D94F30] tracking-widest bg-[#D94F30]/10 px-2 py-1 rounded-full mb-1">
                  Save 15% Subscribed
                </span>
              </>
            ) : (
              product.originalPrice && (
                <>
                  <span className="text-[#434845] line-through text-sm mb-1">${product.originalPrice}</span>
                  <span className="font-sans text-[10px] font-bold uppercase text-[#D94F30] tracking-widest bg-[#D94F30]/10 px-2 py-1 rounded-full mb-1">
                    Save 20%
                  </span>
                </>
              )
            )}
          </div>

          <hr className="border-[#1A2420]/10 mb-6" />

          {/* Pack size duration selector options */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="font-sans text-[11px] font-bold uppercase text-[#1A2420] tracking-widest">
                Supply Duration
              </label>
              <button
                onClick={() => alert("Subscribe & Save Details:\n\nReceive fresh formulas automatically every 60 days. Cancel or edit intervals anytime in your profile dashboard.")}
                className="text-xs text-[#8B5A4A] underline font-sans focus:outline-none"
              >
                Subscription Info
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedDuration('30 Days')}
                className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-all ${
                  selectedDuration === '30 Days'
                    ? 'border-[#1A2420] bg-[#1A2420]/5 ring-1 ring-[#1A2420]'
                    : 'border-[#1A2420]/10 bg-transparent hover:border-[#1A2420]/30'
                }`}
              >
                <span className="font-sans text-sm font-bold text-[#1A2420] mb-0.5">30 Days</span>
                <span className="text-xs text-[#434845]">One-time purchase</span>
              </button>
              
              <button
                onClick={() => setSelectedDuration('60 Days')}
                className={`border rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all ${
                  selectedDuration === '60 Days'
                    ? 'border-[#1A2420] bg-[#2F4A3C]/5 ring-1 ring-[#1A2420]'
                    : 'border-[#1A2420]/10 bg-transparent hover:border-[#1A2420]/30'
                }`}
              >
                <div className="absolute top-0 right-0 bg-[#8B5A4A] text-white text-[8px] font-bold px-2 py-0.5 rounded-bl select-none">
                  POPULAR
                </div>
                <span className="font-sans text-sm font-bold text-[#1A2420] mb-0.5">60 Days</span>
                <span className="text-xs text-[#8B5A4A] font-semibold">Subscribe &amp; Save 15%</span>
              </button>
            </div>
          </div>

          {/* Quantity Stepper & Add to Bag Actions */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex gap-4 h-14">
              {/* Stepper */}
              <div className="flex items-center justify-between border border-[#1A2420]/10 rounded px-4 w-32 bg-[#fcf9f3] select-none">
                <button
                  onClick={() => handleQuantityChange('dec')}
                  className="text-[#434845] hover:text-[#1A2420] transition-colors focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-sans text-base font-bold text-[#1A2420]">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('inc')}
                  className="text-[#434845] hover:text-[#1A2420] transition-colors focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Primary Add to Bag button */}
              <button
                onClick={handleAddToBag}
                className="flex-1 bg-[#2F4A3C] hover:bg-[#1A2420] text-[#F7F4EE] rounded font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors focus:outline-none shadow-md active:scale-99"
              >
                <span>Add to Bag</span>
                <span className="opacity-40 font-normal">|</span>
                <span>${totalPrice.toFixed(0)}</span>
              </button>
            </div>
          </div>

          {/* Value Props Row */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#1A2420]/10 pt-6 select-none">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#8B5A4A]" />
              <span className="text-xs text-[#1A2420] font-bold uppercase tracking-wider">Clinically Sourced</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8B5A4A]" />
              <span className="text-xs text-[#1A2420] font-bold uppercase tracking-wider">100% Vegan &amp; Pure</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8B5A4A]" />
              <span className="text-xs text-[#1A2420] font-bold uppercase tracking-wider">Free Shipping Over $75</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#8B5A4A]" />
              <span className="text-xs text-[#1A2420] font-bold uppercase tracking-wider">Recyclable Glass Jar</span>
            </div>
          </div>

        </div>
      </section>

      {/* Tabs Scientific Review Area */}
      <section className="mb-24">
        {/* Navigation Tabs headers */}
        <div className="border-b border-[#1A2420]/10 flex gap-6 md:gap-10 overflow-x-auto no-scrollbar select-none">
          {[
            { id: 'description', label: 'The Formulation' },
            { id: 'ingredients', label: 'Active Ingredients' },
            { id: 'usage', label: 'How to Use' },
            { id: 'clinical', label: 'Clinical Trial Data' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`font-sans text-[11px] font-bold uppercase tracking-wider pb-4 px-1 whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#8B5A4A] text-[#1A2420]'
                  : 'border-transparent text-[#737875] hover:text-[#1A2420]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content area */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            {activeTab === 'description' && (
              <div className="space-y-4 animate-fade-in text-left">
                <h3 className="font-serif text-[24px] text-[#1A2420] font-medium">The Science of Synergy</h3>
                <p className="font-sans text-[15px] text-[#434845] leading-relaxed">
                  {product.fullDescription}
                </p>
                <div className="pt-2">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#1A2420] mb-2">Molecular targets:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-[#434845] font-semibold">
                    <li className="flex items-center gap-1.5">• Circadian synchronization</li>
                    <li className="flex items-center gap-1.5">• Cortisol response dampening</li>
                    <li className="flex items-center gap-1.5">• Deep restorative sleep phase elongation</li>
                    <li className="flex items-center gap-1.5">• Brain barrier lipid nutrition</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4 animate-fade-in text-left">
                <h3 className="font-serif text-[24px] text-[#1A2420] font-medium">Traceable Sourcing</h3>
                <p className="font-sans text-[15px] text-[#434845] leading-relaxed">
                  Our lab utilizes cold percolation extraction to safeguard natural bio-actives. We strictly avoid fillers, high-heat dehydration, or synthetic colors.
                </p>
                <div className="bg-[#f6f3ed]/60 p-4 rounded border border-[#1A2420]/5">
                  <p className="font-sans text-xs text-[#1A2420] font-bold uppercase tracking-wider mb-2">Full Ingredient Declaration:</p>
                  <p className="font-sans text-sm text-[#434845] leading-relaxed italic">{product.ingredients}</p>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-4 animate-fade-in text-left">
                <h3 className="font-serif text-[24px] text-[#1A2420] font-medium">Optimal Administration Ritual</h3>
                <p className="font-sans text-[15px] text-[#434845] leading-relaxed">
                  Consuming your supplement is a moment of grounding. Turn off screens, reduce lighting, and allow the molecular actives to prepare your body naturally.
                </p>
                <div className="bg-[#f6f3ed]/60 p-4 rounded border border-[#1A2420]/5">
                  <p className="font-sans text-xs text-[#1A2420] font-bold uppercase tracking-wider mb-2">Standard Dosage Protocol:</p>
                  <p className="font-sans text-sm text-[#434845] leading-relaxed">{product.usage}</p>
                </div>
              </div>
            )}

            {activeTab === 'clinical' && (
              <div className="space-y-4 animate-fade-in text-left">
                <h3 className="font-serif text-[24px] text-[#1A2420] font-medium">Double-Blind Substantiation</h3>
                <p className="font-sans text-[15px] text-[#434845] leading-relaxed">
                  We prove our claims. Before releasing any batch, we run 3rd party double-blind trials to establish clinical absorption profiles.
                </p>
                <div className="bg-[#2F4A3C]/5 border border-[#8B5A4A]/20 p-4 rounded">
                  <p className="font-sans text-xs text-[#8B5A4A] font-bold uppercase tracking-wider mb-2">Study Summaries:</p>
                  <p className="font-sans text-sm text-[#434845] leading-relaxed font-medium">{product.clinicalData}</p>
                </div>
              </div>
            )}
          </div>

          {/* Floating lab detail side image */}
          <div className="lg:col-span-5 bg-[#f6f3ed] p-6 rounded border border-[#1A2420]/10 flex flex-col justify-center text-center">
            <img
              className="w-full h-56 object-cover rounded mb-4 grayscale mix-blend-multiply opacity-80 select-none"
              alt="Editorial layout showing capsule resting on laboratory tray"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdC8XrYvsZQFFqwkFDn31EwgDcPaVCe1fGTXAqQ49m5bwZSNll-3QvZ3mVtBDMoVwlUZ1bPI_0RPu12sA9b6eIat3m-qHYGHHXmnbfzIoD98vbVkoRNion1DDvDmZROTtjcx_S8KHh0O3jL3LoAGC0_2ACJ9wTf2wzw9TD2G20PsxjQzVzv4RPfkycL1tzhkk9d6sIq65lwHNd0J0oEpA4dk2E50J6DX5XHaHG3ljxjTXuwNTaRKiF0MWwp4OvPRhGXApk3A-E4Kak"
            />
            <p className="font-serif text-[20px] text-[#1A2420] italic font-medium">"A paradigm shift in natural rest."</p>
            <p className="font-sans text-[10px] font-bold uppercase text-[#434845] tracking-widest mt-1">
              — Journal of Botanical Medicine
            </p>
          </div>
        </div>
      </section>

      {/* Recommended related product grid */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-8 border-b border-[#1A2420]/10 pb-4">
          <div>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B5A4A]">Restorative Alternatives</span>
            <h2 className="font-serif text-[24px] md:text-[32px] text-[#1A2420] font-medium mt-1">You May Also Like</h2>
          </div>
          <button
            onClick={() => setScreen('shop')}
            className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8B5A4A] hover:text-[#1A2420] transition-colors border-b border-[#8B5A4A] pb-1 hover:border-[#1A2420]"
          >
            Shop All Rest
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                setActiveImageIndex(0);
                setQuantity(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer text-left"
            >
              <div className="w-full aspect-[4/5] rounded border border-[#1A2420]/10 overflow-hidden relative bg-[#f6f3ed] mb-4">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-102 transition-transform duration-500"
                />
                {p.bestseller && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#8B5A4A] text-white font-sans text-[9px] uppercase px-2.5 py-1 rounded-full tracking-widest font-bold">
                      Bestseller
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-[18px] text-[#1A2420] mb-0.5 group-hover:text-[#8B5A4A] transition-colors line-clamp-1 font-medium">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#434845] font-sans">{p.category} / {p.format}</p>
                </div>
                <span className="font-sans text-sm font-semibold text-[#1A2420]">${p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="mb-20 border-t border-[#1A2420]/10 pt-16 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reviews list (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B5A4A]">Feedback</span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[#1A2420] font-medium mt-1">Customer Reviews</h2>
            </div>

            {reviewsLoading ? (
              <p className="font-sans text-sm text-[#434845]">Loading formulations logs...</p>
            ) : reviews.length === 0 ? (
              <div className="bg-[#f6f3ed]/60 p-6 rounded border border-[#1A2420]/5 text-center py-10">
                <MessageSquare className="w-8 h-8 text-[#434845]/30 mx-auto mb-2" />
                <p className="font-serif text-[18px] text-[#1A2420]">No reviews yet.</p>
                <p className="font-sans text-xs text-[#434845] mt-1">Be the first to share your physiological response to this formulation.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-[#1A2420]/10 pb-6 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm font-semibold text-[#1A2420]">{rev.name}</span>
                        <span className="font-sans text-[10px] font-bold text-[#8B5A4A] uppercase tracking-wider px-2 py-0.5 border border-[#8B5A4A]/20 bg-[#8B5A4A]/5 rounded-sm">Verified</span>
                      </div>
                      <span className="font-sans text-xs text-[#737875]">{rev.date}</span>
                    </div>
                    
                    <div className="flex text-[#8B5A4A] mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-current stroke-none' : 'text-[#e5e2dc] fill-[#e5e2dc] stroke-none'}`} 
                        />
                      ))}
                    </div>

                    <p className="font-sans text-[15px] text-[#434845] leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Review Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#f6f3ed]/50 rounded border border-[#1A2420]/10 p-6 md:p-8 self-start">
            <h3 className="font-serif text-[24px] text-[#1A2420] font-medium mb-2">Share Your Experience</h3>
            <p className="font-sans text-xs text-[#434845] mb-6">Your comments assist us in refining compound stability and dosing profiles.</p>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-[#c44d2f]/10 border border-[#c44d2f]/30 p-3 rounded text-[#c44d2f] font-sans text-xs font-semibold">
                  {submitError}
                </div>
              )}

              {/* Interactive Rating stars */}
              <div className="space-y-1.5">
                <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] block">
                  Physiological Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewReviewRating(s)}
                      className="text-[#8B5A4A] hover:scale-110 active:scale-90 transition-transform p-0.5 focus:outline-none cursor-pointer"
                    >
                      <Star 
                        className={`w-6 h-6 ${s <= newReviewRating ? 'fill-current stroke-none' : 'text-[#c3c8c4] stroke-current stroke-1 fill-none'}`} 
                      />
                    </button>
                  ))}
                  <span className="font-sans text-xs text-[#434845] ml-2 font-semibold">
                    {newReviewRating === 5 ? 'Excellent (5/5)' : `${newReviewRating} / 5`}
                  </span>
                </div>
              </div>

              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Eleanor R."
                  className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-2.5 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] transition-all"
                  id="review-name"
                />
                <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                  Reviewer Name
                </label>
              </div>

              {/* Comment */}
              <div className="relative">
                <textarea
                  required
                  rows={4}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Tell us about cellular absorption, energy changes, or taste..."
                  className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-2.5 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] transition-all resize-none"
                  id="review-comment"
                />
                <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                  Detailed Experience
                </label>
              </div>

              <button
                type="submit"
                disabled={submitSubmitting}
                className="w-full py-3 bg-[#1A2420] text-white hover:bg-[#8B5A4A] rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all scale-100 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{submitSubmitting ? 'Submitting...' : 'Post Review'}</span>
                {!submitSubmitting && <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
