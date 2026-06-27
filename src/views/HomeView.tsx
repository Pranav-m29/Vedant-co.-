import { ArrowRight, Leaf, Shield, Award, Sparkles, Navigation } from 'lucide-react';
import { ScreenType } from '../types';

interface HomeViewProps {
  setScreen: (screen: ScreenType) => void;
  setCategoryFilter: (category: string) => void;
}

export default function HomeView({ setScreen, setCategoryFilter }: HomeViewProps) {
  
  const handleConcernClick = (category: string) => {
    setCategoryFilter(category);
    setScreen('shop');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 px-4 md:px-12 max-w-[1280px] mx-auto overflow-hidden text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="md:col-span-5 md:col-start-2 z-10 space-y-6">
            <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.1] text-[#1A2420] font-medium tracking-tight">
              Nature’s Efficacy,<br />Clinically Proven.
            </h1>
            <p className="font-sans text-[15px] text-[#434845] leading-relaxed max-w-md">
              Meticulously formulated botanical supplements designed to restore balance, enhance vitality, and support your foundation of health.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setCategoryFilter('All');
                  setScreen('shop');
                }}
                className="editorial-cta scale-100 active:scale-95 duration-300"
              >
                <span>Explore</span>
                <span className="block mt-1">Collection</span>
              </button>
            </div>
          </div>

          {/* Right Hero Column (Asymmetric Frame) */}
          <div className="md:col-span-6 relative mt-12 md:mt-0">
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] md:translate-x-6">
              <img
                className="w-full h-full object-cover rounded shadow-md border border-[#1A2420]/10"
                alt="Minimalist dark green glass apothecary bottle resting on a raw, textured stone block."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANORnqkiZAkpuNp07NU_-JfLoGh8iw0Rh6ofZL-2rXQ3KXjnw_As6QgqNxHbHkP2yJ0m73lpFJXDyjrUMYy_QwuKX1Yzzn0D3-Zl1KYee0ucslAuVrBKz5yg-kTJuvEjsoTszWBXaxBNC_ICmeN_JT1SXliQgiGHSA5Gj-1EohjO2JDvejm_YKbnptUe7ikWkYC7j_GvDsF_BW4T7axczlljyS-tr_lxjSiW5iZ8y8swRPTazOQRTSdB9n33d3ulXDUFVTWg3MJlcq"
              />
              
              {/* Floating Accent Card */}
              <div 
                onClick={() => {
                  setCategoryFilter('Sleep & Stress');
                  setScreen('shop');
                }}
                className="absolute -bottom-8 -left-4 md:-left-12 bg-[#F7F4EE] border border-[#1A2420]/10 p-5 rounded shadow-lg max-w-[240px] text-left cursor-pointer group hover:border-[#8B5A4A] transition-all"
              >
                <p className="font-serif text-[16px] text-[#1A2420] font-semibold mb-1 group-hover:text-[#8B5A4A] transition-colors">
                  Restorative Sleep Complex
                </p>
                <p className="font-sans text-[13px] text-[#434845] leading-relaxed">
                  Award-winning formulation for deep, uninterrupted rest.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#1A2420] text-[#F7F4EE] py-8 px-4 select-none border-y border-[#2F4A3C]/20">
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center gap-6 md:gap-16">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-[#8B5A4A]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em]">Clinically Tested</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Leaf className="w-5 h-5 text-[#8B5A4A]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em]">100% Organic</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Award className="w-5 h-5 text-[#8B5A4A]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em]">Sustainably Sourced</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Shield className="w-5 h-5 text-[#8B5A4A]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em]">Third-Party Tested</span>
          </div>
          <div className="flex items-center space-x-2.5 hidden lg:flex">
            <Navigation className="w-5 h-5 text-[#8B5A4A]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em]">Carbon Neutral</span>
          </div>
        </div>
      </section>

      {/* Targeted Solutions / Bento Grid */}
      <section className="py-20 px-4 md:px-12 max-w-[1280px] mx-auto text-left">
        <div className="mb-12 flex justify-between items-end border-b border-[#1A2420]/10 pb-4">
          <div>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B5A4A]">Our Regimens</span>
            <h2 className="font-serif text-[28px] md:text-[36px] text-[#1A2420] font-medium mt-1">Targeted Solutions</h2>
          </div>
          <button
            onClick={() => {
              setCategoryFilter('All');
              setScreen('shop');
            }}
            className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8B5A4A] hover:text-[#1A2420] transition-colors border-b-2 border-[#8B5A4A] pb-1 hover:border-[#1A2420] hidden md:block"
          >
            View All Regimens
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Large Feature Tile - Sleep & Stress */}
          <div 
            onClick={() => handleConcernClick('Sleep & Stress')}
            className="md:col-span-2 relative group overflow-hidden rounded border border-[#1A2420]/10 aspect-square md:aspect-auto md:h-[500px] cursor-pointer"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              alt="Woman holding an amber glass dropper bottle"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI57FXInFPRZK9jgtcHugj2lq3HkHJO2TiTP4QqrFV6-hOanTvonFXpHBnSzJ6v_1HaAMAw8NH5dCEHdbtOsY1zS3TETSwdaJdfGbKCd3G53ZMfYN6xH3ew6ts7KDyt3g36W6ag0KA-Y8UB2jhzHnsb-FMQ2YWHwiZU0h5rA9ntmiZpYkWHx-Yq5ORTmnvg-M70Y81RRNqL_PhfjOSjgz4r5O9MPKiamEBqvUmtIexNx52-pn-svTaABoVTBrwB8nSGjRRi0WjE0Xt"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2420]/80 via-[#1A2420]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end text-left">
              <div>
                <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#F7F4EE]/70 mb-1">Restoration</p>
                <h3 className="font-serif text-[28px] md:text-[36px] text-[#F7F4EE] leading-tight font-medium">Deep Sleep &amp; Cortisol</h3>
              </div>
              <span className="bg-[#8B5A4A] text-[#F7F4EE] p-3 rounded-full hover:bg-[#9d430a] transition-colors shadow-md">
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Sub-grid with Categories */}
          <div className="grid grid-rows-3 gap-6 h-[500px]">
            {/* Skin Health */}
            <div
              onClick={() => handleConcernClick('Skin Health')}
              className="relative group overflow-hidden rounded border border-[#1A2420]/10 cursor-pointer"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                alt="Botanical leaves resting on ceramic plate"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4WW6aMQcRMaka4Fi2prDqycf1OMLT96N2Rz7Ij3BN5w78pihl_xWYlzUuScfP_rA0dPbaE1v9AWDaANdMgGmvfjqURCt7UGoUJSYGHMq356t2Sezp5rMk_tzMH6QNBVT-dUFftV802E8ImhtoMhlkYgxudqYKZxLrWQdsx_fKaYEPOBpl5b8UcWkbI_Fr5udo2FrtmjBeiqZeuDIbmCqK_qg9PFwBxjV2WWBbiQ_w1tkQxPw5FQGc7yo_X3uT_h8LqCpurGwAZQwA"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                <h3 className="font-serif text-[24px] text-white drop-shadow-xs font-semibold">Skin Health</h3>
                <p className="font-sans text-xs text-white/80 uppercase tracking-widest mt-1">Barrier &amp; Aging</p>
              </div>
            </div>

            {/* Gut Balance */}
            <div
              onClick={() => handleConcernClick('Gut Balance')}
              className="relative group overflow-hidden rounded border border-[#1A2420]/10 cursor-pointer"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                alt="Glass beaker filled with botanical extract"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzyJzSt7s-xohHPowP8SU03dbIQ5DCyLK4yGEYJgQdvldEuZUYc259tRX-42LuK9Hku0QQKmhjjAh8Wt59_wYVvuq_DgRSUWoR4BAC0tXFLlH8HYvjYvcJYPzdDNAuT1RyWNOKIzwU_FoAiIN_kB2eY1cYZOPvOOLWJYmBzlSRsxQKMw2ziQDPAWadpZh9WsgW-9_oWeUWBaq_L-hb3mZ5ZJ58og0MfrT-7kO45JCVJLzTgC8_DwBn6-GWYYtZvtVq7msyvUlDI97o"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                <h3 className="font-serif text-[24px] text-white drop-shadow-xs font-semibold">Gut Balance</h3>
                <p className="font-sans text-xs text-white/80 uppercase tracking-widest mt-1">Digestion &amp; Microbiome</p>
              </div>
            </div>

            {/* Daily Energy */}
            <div
              onClick={() => handleConcernClick('Daily Energy')}
              className="relative group overflow-hidden rounded border border-[#1A2420]/10 cursor-pointer"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                alt="Supplements capsules against bone background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIAHEOv3xYpxMSUxRTrw3CqRV_OCa9_UbdzpUjqeSm39foDKZQyXJ6_zymlP47l4P3Y99hlJQqFHA5soGl7q9Pclhn8v5L6NHiJCmiqzUV_3Crxg14voH0UW-7yOCOSlmN4Jbiwl_oklc0lw21PMsgPb6oJbOGXmT3IWc1055_N1HE0ZAC3lbqfcfz_jKOBva72IdWcCl5VF-mfbgebn18y_7WziFzj094o5RHR-cc-ot72H-LBSNf4PsuI0sk9DOHEhSdozrlm8U6"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                <h3 className="font-serif text-[24px] text-white drop-shadow-xs font-semibold">Daily Energy</h3>
                <p className="font-sans text-xs text-white/80 uppercase tracking-widest mt-1">ATP Production &amp; Vitality</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Commitment Highlight */}
      <section className="bg-[#f6f3ed] py-20 border-t border-[#1A2420]/10">
        <div className="max-w-[800px] mx-auto text-center px-4 space-y-6">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B5A4A]">Our Clinical Standard</span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-[#1A2420] font-medium text-balance">
            Zero Synthetics. 100% Transparency.
          </h2>
          <p className="font-sans text-[15px] text-[#434845] leading-relaxed max-w-2xl mx-auto">
            Unlike traditional supplement brands that rely on synthetic isolates, Verdant &amp; Co. preserves the complete, complex molecular structure of the botanicals we harvest. We test each batch three times for purity, safety, and molecular density.
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setScreen('science')}
              className="px-6 py-3 bg-[#1A2420] hover:bg-[#8B5A4A] text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Meet the Scientists
            </button>
            <button
              onClick={() => setScreen('journal')}
              className="px-6 py-3 border border-[#1A2420] text-[#1A2420] hover:bg-[#1A2420] hover:text-[#F7F4EE] rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Read our Journal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
