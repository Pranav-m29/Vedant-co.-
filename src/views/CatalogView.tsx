import { useState, useMemo } from 'react';
import { ChevronRight, Filter, X, ArrowUpDown } from 'lucide-react';
import { Product, ScreenType } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';

interface CatalogViewProps {
  setScreen: (screen: ScreenType) => void;
  setSelectedProductId: (id: string) => void;
  addToCart: (product: Product, quantity: number, duration: '30 Days' | '60 Days') => void;
  categoryFilter: string; // 'All' or specific category
  setCategoryFilter: (category: string) => void;
}

type SortType = 'featured' | 'price-low-high' | 'price-high-low';

export default function CatalogView({
  setScreen,
  setSelectedProductId,
  addToCart,
  categoryFilter,
  setCategoryFilter,
}: CatalogViewProps) {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortType>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Available unique concerns and formats for filtering
  const allConcerns = ['Insomnia', 'Stress', 'Anxiety', 'Aging', 'Barrier', 'Digestion', 'Vitality'];
  const allFormats = ['Tincture', 'Capsule', 'Powder', 'Balm', 'Cream', 'Serum'];

  // Handle Concern selection
  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  // Handle Format selection
  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedConcerns([]);
    setSelectedFormats([]);
    setCategoryFilter('All');
  };

  // Remove single active filter chip
  const removeActiveFilter = (type: 'category' | 'concern' | 'format', value: string) => {
    if (type === 'category') {
      setCategoryFilter('All');
    } else if (type === 'concern') {
      setSelectedConcerns((prev) => prev.filter((c) => c !== value));
    } else if (type === 'format') {
      setSelectedFormats((prev) => prev.filter((f) => f !== value));
    }
  };

  // Memoized Filtered & Sorted Products
  const filteredSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Filter by Concerns
    if (selectedConcerns.length > 0) {
      result = result.filter((p) => selectedConcerns.includes(p.concern));
    }

    // Filter by Formats
    if (selectedFormats.length > 0) {
      result = result.filter((p) => selectedFormats.includes(p.format));
    }

    // Sort Products
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'featured') {
      // Sort so bestsellers and new items come first
      result.sort((a, b) => {
        const aVal = (a.bestseller ? 2 : 0) + (a.new ? 1 : 0);
        const bVal = (b.bestseller ? 2 : 0) + (b.new ? 1 : 0);
        return bVal - aVal;
      });
    }

    return result;
  }, [categoryFilter, selectedConcerns, selectedFormats, sortBy]);

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setScreen('product-detail');
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1, '30 Days');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-10 animate-fade-in text-left">
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center space-x-2 font-sans text-[11px] font-bold text-[#737875] uppercase tracking-[0.15em] select-none">
        <button onClick={() => setScreen('home')} className="hover:text-[#1A2420] transition-colors focus:outline-none">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => { setCategoryFilter('All'); }} className="hover:text-[#1A2420] transition-colors focus:outline-none">
          Apothecary
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1A2420]">{categoryFilter === 'All' ? 'Shop All' : categoryFilter}</span>
      </nav>

      {/* Header Info Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A2420]/10 pb-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="font-serif text-[36px] md:text-[48px] text-[#1A2420] font-medium leading-tight">
            {categoryFilter === 'All' ? 'The Apothecary' : `${categoryFilter} Collection`}
          </h1>
          <p className="font-sans text-[15px] text-[#434845] mt-3 leading-relaxed">
            Botanical formulations designed to support physiological harmony. Formulated in our clinical laboratories with traceable, organic actives to cultivate vitality.
          </p>
        </div>

        {/* Dynamic product count & Sort selectors */}
        <div className="flex items-center justify-between md:justify-end gap-6 font-sans text-sm text-[#434845] shrink-0">
          <span className="font-semibold text-[#1A2420]">{filteredSortedProducts.length} Results</span>
          
          <div className="flex items-center gap-1">
            <span className="text-xs uppercase tracking-wider text-[#737875] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="bg-[#F7F4EE] border border-[#1A2420]/10 rounded px-3 py-1.5 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#8B5A4A]"
            >
              <option value="featured">Featured Formulas</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Mobile Filter Trigger Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden p-2 border border-[#1A2420]/10 rounded bg-[#F7F4EE] text-[#1A2420] hover:bg-[#1A2420] hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
          >
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Filters</span>
          </button>
        </div>
      </div>

      {/* Categories Toggle Strip (All, Sleep & Stress, Skin, Gut, Energy) */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#1A2420]/5 pb-4">
        {['All', 'Sleep & Stress', 'Skin Health', 'Gut Balance', 'Daily Energy'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-5 py-2.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider transition-all border ${
              categoryFilter === cat
                ? 'bg-[#8B5A4A] text-[#F7F4EE] border-[#8B5A4A]'
                : 'bg-transparent text-[#1A2420] border-[#1A2420]/10 hover:border-[#1A2420]'
            }`}
          >
            {cat === 'All' ? 'Shop All' : cat}
          </button>
        ))}
      </div>

      {/* Active Filter Chips */}
      {(categoryFilter !== 'All' || selectedConcerns.length > 0 || selectedFormats.length > 0) && (
        <div className="flex flex-wrap items-center gap-2 mb-8 animate-fade-in bg-[#f6f3ed]/60 p-3 rounded border border-[#1A2420]/5">
          <span className="font-sans text-[11px] font-bold text-[#737875] uppercase tracking-wider mr-2 select-none">
            Active Filters:
          </span>

          {categoryFilter !== 'All' && (
            <span className="inline-flex items-center gap-1.5 bg-[#1A2420] text-white font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xs">
              <span>Category: {categoryFilter}</span>
              <button onClick={() => removeActiveFilter('category', categoryFilter)} className="hover:text-[#8B5A4A]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedConcerns.map((con) => (
            <span key={con} className="inline-flex items-center gap-1.5 bg-[#8B5A4A] text-white font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xs">
              <span>Concern: {con}</span>
              <button onClick={() => removeActiveFilter('concern', con)} className="hover:text-red-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {selectedFormats.map((forItem) => (
            <span key={forItem} className="inline-flex items-center gap-1.5 bg-[#434845] text-white font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xs">
              <span>Format: {forItem}</span>
              <button onClick={() => removeActiveFilter('format', forItem)} className="hover:text-red-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={clearAllFilters}
            className="font-sans text-[10px] font-bold text-[#8B5A4A] hover:text-[#1A2420] transition-colors uppercase underline underline-offset-4 ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Catalog Grid Layout */}
      <div className="flex gap-12 items-start relative">
        
        {/* Desktop Sidebar Filters */}
        <aside className="w-60 shrink-0 hidden lg:flex flex-col gap-8 sticky top-28 bg-[#F7F4EE] border border-[#1A2420]/5 p-6 rounded shadow-xs h-auto">
          
          {/* Sourcing / Clean Badge */}
          <div className="border-b border-[#1A2420]/10 pb-6 text-left">
            <h4 className="font-serif text-[18px] text-[#1A2420] font-semibold mb-2">Our Standard</h4>
            <p className="font-sans text-xs text-[#434845] leading-relaxed">
              Every formula is melatonin-free, triple-tested, and harvested sustainably by hand.
            </p>
          </div>

          {/* Filter by Concern */}
          <div className="flex flex-col gap-4 border-b border-[#1A2420]/10 pb-6 text-left">
            <h3 className="font-sans text-[11px] font-bold text-[#1A2420] uppercase tracking-[0.15em]">
              Target Concern
            </h3>
            <div className="flex flex-col gap-3 font-sans text-sm text-[#434845]">
              {allConcerns.map((con) => (
                <label key={con} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedConcerns.includes(con)}
                    onChange={() => toggleConcern(con)}
                    className="w-4 h-4 rounded-xs border-[#737875] text-[#8B5A4A] focus:ring-[#8B5A4A] bg-transparent"
                  />
                  <span className="group-hover:text-[#1A2420] transition-colors">{con}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter by Format */}
          <div className="flex flex-col gap-4 pb-2 text-left">
            <h3 className="font-sans text-[11px] font-bold text-[#1A2420] uppercase tracking-[0.15em]">
              Format
            </h3>
            <div className="flex flex-col gap-3 font-sans text-sm text-[#434845]">
              {allFormats.map((f) => (
                <label key={f} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(f)}
                    onChange={() => toggleFormat(f)}
                    className="w-4 h-4 rounded-xs border-[#737875] text-[#8B5A4A] focus:ring-[#8B5A4A] bg-transparent"
                  />
                  <span className="group-hover:text-[#1A2420] transition-colors">{f}s</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 w-full flex flex-col gap-12">
          {filteredSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
              {filteredSortedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={handleProductSelect}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-[#1A2420]/10 rounded bg-[#f6f3ed]/30">
              <p className="font-serif text-[22px] text-[#1A2420]">No formulas match your current filters.</p>
              <p className="font-sans text-sm text-[#434845] mt-2">
                Try clearing some concern tags or choosing "Shop All" to view our complete apothecary.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 bg-[#8B5A4A] hover:bg-[#1A2420] text-[#F7F4EE] font-sans text-[11px] font-bold uppercase tracking-wider py-3.5 px-8 rounded-full transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Drawer Slide-Over for Filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-[#1A2420]/50 backdrop-blur-xs z-50 animate-fade-in flex justify-end">
          <div className="absolute inset-0" onClick={() => setMobileFiltersOpen(false)} />
          
          <div className="relative bg-[#F7F4EE] w-4/5 max-w-[320px] h-full flex flex-col p-6 shadow-2xl z-50 animate-slide-in text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-[20px] text-[#1A2420] font-semibold">Filter Apothecary</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-[#1A2420]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-8 pr-2">
              {/* Category selector */}
              <div className="space-y-3">
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A2420]">Category</h4>
                <div className="flex flex-col gap-2">
                  {['All', 'Sleep & Stress', 'Skin Health', 'Gut Balance', 'Daily Energy'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`text-left text-xs py-1.5 px-3 rounded-full uppercase tracking-wider font-bold ${
                        categoryFilter === cat ? 'bg-[#8B5A4A] text-white' : 'text-[#434845] hover:bg-[#1A2420]/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concerns */}
              <div className="space-y-3">
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A2420]">Concerns</h4>
                <div className="flex flex-col gap-2 font-sans text-xs text-[#434845]">
                  {allConcerns.map((con) => (
                    <label key={con} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedConcerns.includes(con)}
                        onChange={() => toggleConcern(con)}
                        className="w-4 h-4 rounded-xs border-[#737875] text-[#8B5A4A] focus:ring-[#8B5A4A]"
                      />
                      <span>{con}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Formats */}
              <div className="space-y-3">
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A2420]">Formats</h4>
                <div className="flex flex-col gap-2 font-sans text-xs text-[#434845]">
                  {allFormats.map((f) => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFormats.includes(f)}
                        onChange={() => toggleFormat(f)}
                        className="w-4 h-4 rounded-xs border-[#737875] text-[#8B5A4A] focus:ring-[#8B5A4A]"
                      />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1A2420]/10 flex gap-4">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 border border-[#1A2420]/20 text-[#1A2420] text-xs font-bold uppercase tracking-wider rounded"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-3 bg-[#8B5A4A] text-white text-xs font-bold uppercase tracking-wider rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
