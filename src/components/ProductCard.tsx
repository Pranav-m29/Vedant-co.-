import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (id: string) => void;
  onQuickAdd: (product: Product) => void;
}

export default function ProductCard({ product, onSelect, onQuickAdd }: ProductCardProps) {
  // Check tags or status
  const isBestseller = product.bestseller;
  const isNew = product.new;

  return (
    <div className="flex flex-col gap-4 group relative bg-transparent rounded select-none animate-fade-in">
      
      {/* Badges Overlay */}
      {(isBestseller || isNew) && (
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {isBestseller && (
            <span className="bg-[#8B5A4A] text-white font-sans text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Bestseller
            </span>
          )}
          {isNew && (
            <span className="bg-[#1A2420] text-[#F7F4EE] font-sans text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              New
            </span>
          )}
        </div>
      )}

      {/* Product Image Frame */}
      <div 
        onClick={() => onSelect(product.id)}
        className="aspect-[4/5] bg-[#f6f3ed] rounded border border-[#1A2420]/10 overflow-hidden relative cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-in-out mix-blend-multiply"
        />

        {/* Quick Add Hover Overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="w-full py-3.5 bg-[#1A2420] hover:bg-[#8B5A4A] text-[#F7F4EE] font-sans text-[11px] font-bold uppercase rounded-full transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-98 transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add — ${product.price}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col gap-1 px-1 text-left">
        <div className="flex justify-between items-start gap-2">
          <button
            onClick={() => onSelect(product.id)}
            className="font-serif text-[18px] md:text-[20px] font-medium text-[#1A2420] group-hover:text-[#8B5A4A] transition-colors text-left focus:outline-none"
          >
            {product.name}
          </button>
          <span className="font-sans text-[16px] font-semibold text-[#1A2420] shrink-0">
            ${product.price}
          </span>
        </div>
        <p className="font-sans text-[13px] text-[#434845] line-clamp-1">
          {product.description}
        </p>
      </div>

      {/* Mobile-Only Quick Add Bar */}
      <div className="sm:hidden mt-1 px-1">
        <button
          onClick={() => onQuickAdd(product)}
          className="w-full py-2 bg-[#8B5A4A] hover:bg-[#1A2420] text-white font-sans text-[11px] font-bold uppercase rounded-full transition-colors flex items-center justify-center gap-1 shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add • ${product.price}</span>
        </button>
      </div>
    </div>
  );
}
