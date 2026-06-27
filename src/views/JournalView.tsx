import { useState } from 'react';
import { ChevronRight, ArrowLeft, BookOpen, Clock, Tag, ExternalLink, Compass } from 'lucide-react';
import { ScreenType } from '../types';
import { JOURNAL_ENTRIES } from '../data';

interface JournalViewProps {
  setScreen: (screen: ScreenType) => void;
  setCategoryFilter: (category: string) => void;
}

export default function JournalView({ setScreen, setCategoryFilter }: JournalViewProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = selectedArticleId 
    ? JOURNAL_ENTRIES.find((entry) => entry.id === selectedArticleId)
    : null;

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-10 animate-fade-in text-left">
      
      {/* Article Detail View */}
      {selectedArticle ? (
        <article className="max-w-[800px] mx-auto space-y-8 py-6">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#8B5A4A] hover:text-[#1A2420] transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal Index</span>
          </button>

          {/* Cover Image */}
          <div className="w-full aspect-[16/9] rounded overflow-hidden border border-[#1A2420]/10 select-none bg-[#f6f3ed]">
            <img 
              src={selectedArticle.imageUrl} 
              alt={selectedArticle.title} 
              className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply" 
            />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#737875] font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#8B5A4A]" />
              {selectedArticle.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {selectedArticle.date}
            </span>
            <span>•</span>
            <span>5 min read</span>
          </div>

          <h1 className="font-serif text-[32px] md:text-[44px] text-[#1A2420] font-medium leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="font-sans text-[16px] text-[#434845] leading-relaxed space-y-6">
            <p className="font-semibold text-[#1A2420] text-[18px]">
              {selectedArticle.excerpt}
            </p>
            {selectedArticle.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-10 border-t border-[#1A2420]/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div>
              <p className="font-serif text-[18px] text-[#1A2420] font-medium">Ready to align your circadian cycle?</p>
              <p className="font-sans text-xs text-[#434845]">Explore our double-blind certified sleep collection.</p>
            </div>
            <button
              onClick={() => {
                setCategoryFilter('Sleep & Stress');
                setScreen('shop');
              }}
              className="px-6 py-3 bg-[#8B5A4A] text-white hover:bg-[#1A2420] rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              Shop Sleep Collection
            </button>
          </div>
        </article>
      ) : (
        /* Journal list Index View */
        <div className="space-y-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 font-sans text-[11px] font-bold text-[#737875] uppercase tracking-[0.15em] select-none">
            <button onClick={() => setScreen('home')} className="hover:text-[#1A2420] transition-colors focus:outline-none">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1A2420]">Journal Index</span>
          </nav>

          {/* Heading */}
          <div className="max-w-2xl border-b border-[#1A2420]/10 pb-6">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B5A4A]">Editorial Notes</span>
            <h1 className="font-serif text-[36px] md:text-[48px] text-[#1A2420] font-medium leading-none mt-1">
              The Apothecary Journal
            </h1>
            <p className="font-sans text-[15px] text-[#434845] mt-4 leading-relaxed">
              Bi-weekly publications covering biochemical research, organic agricultural standards, and natural physiological wellness written by our formulating scientists.
            </p>
          </div>

          {/* Article List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {JOURNAL_ENTRIES.map((entry) => (
              <div 
                key={entry.id}
                onClick={() => setSelectedArticleId(entry.id)}
                className="group cursor-pointer border border-[#1A2420]/5 rounded p-5 bg-[#F7F4EE] hover:border-[#8B5A4A] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Article cover */}
                  <div className="w-full aspect-[16/10] rounded overflow-hidden border border-[#1A2420]/5 bg-[#f6f3ed] select-none">
                    <img 
                      src={entry.imageUrl} 
                      alt={entry.title} 
                      className="w-full h-full object-cover grayscale opacity-95 group-hover:scale-101 transition-transform duration-500" 
                    />
                  </div>
                  
                  {/* Category and date badge */}
                  <div className="flex items-center space-x-2 font-sans text-[10px] font-bold text-[#8B5A4A] uppercase tracking-wider">
                    <span>{entry.category}</span>
                    <span>•</span>
                    <span className="text-[#737875]">{entry.date}</span>
                  </div>

                  <h3 className="font-serif text-[24px] text-[#1A2420] font-medium leading-tight group-hover:text-[#8B5A4A] transition-colors">
                    {entry.title}
                  </h3>

                  <p className="font-sans text-sm text-[#434845] leading-relaxed line-clamp-3">
                    {entry.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1a2420]/5 flex items-center justify-between font-sans text-xs font-bold text-[#1A2420] uppercase tracking-wider group-hover:text-[#8B5A4A] transition-colors">
                  <span>Read Full Study</span>
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Commitment note */}
          <div className="bg-[#f6f3ed] rounded border border-[#1A2420]/10 p-8 text-center max-w-xl mx-auto space-y-3">
            <Compass className="w-8 h-8 text-[#8B5A4A] mx-auto stroke-[1.2]" />
            <h4 className="font-serif text-[20px] text-[#1A2420] font-medium">Have a research inquiry?</h4>
            <p className="font-sans text-[14px] text-[#434845] leading-relaxed">
              We welcome biochemical collaborations and standard review inquiries. Contact our formulation directors at <span className="font-semibold text-[#1a2420]">lab@verdantandco.com</span>.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
