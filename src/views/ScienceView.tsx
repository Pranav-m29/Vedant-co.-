import { CheckCircle, ArrowRight, Shield, Award, Sparkles, Navigation } from 'lucide-react';
import { ScreenType } from '../types';
import { TEAM_MEMBERS } from '../data';

interface ScienceViewProps {
  setScreen: (screen: ScreenType) => void;
  setCategoryFilter: (category: string) => void;
}

export default function ScienceView({ setScreen, setCategoryFilter }: ScienceViewProps) {
  
  const handleCTAExplore = () => {
    setCategoryFilter('All');
    setScreen('shop');
  };

  return (
    <div className="animate-fade-in text-left">
      {/* Editorial Landing Hero Block */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        {/* Main Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center select-none"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBq60Q-4VVdqJOKqT5Gcsw91C2Qwfgo-wYB4XGNOEPdjo4mSsACxQqPzm88dls2G5xPuEvQFwng7uNFqdpJ5_rTbfXEbwIhaQJSfGsUGBVEim4kWtZ_JixxUOpjx03Da1JUWvJQr3JEsS1-rzODyH8uW6SVuTEg0h9bLiA2XBxID1E7AflBDh88FDaK4YmkaaDM6hJmrNxDlWJ592r1ZPB1kuePZCrl9mOiV7_1PgcvD8OzsJCR6TjxChxuLX4f9XIozv_L63npiIIY')" }}
          aria-hidden="true"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#1A2420]/50 mix-blend-multiply" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center select-none">
          <span className="font-sans text-[11px] font-bold text-[#F7F4EE]/80 mb-4 uppercase tracking-[0.2em] block">
            Our Philosophy
          </span>
          <h1 className="font-serif text-[40px] md:text-[56px] text-[#F7F4EE] leading-[1.1] font-medium tracking-tight text-balance">
            Nature’s Potency,<br />Clinically Proven.
          </h1>
          <p className="font-sans text-[15px] text-[#F7F4EE]/90 mt-6 max-w-xl leading-relaxed text-pretty">
            We bridge the gap between ancient botanical wisdom and modern biochemical science, creating formulations that are as uncompromising on efficacy as they are on purity.
          </p>
        </div>
      </section>

      {/* Sourcing Split Section */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-24 md:py-32 space-y-24 md:space-y-36">
        
        {/* Split 1: Sourcing (Image Left, Text Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 relative">
            <div className="aspect-[4/5] bg-[#e5e2dc] w-full rounded border border-[#1A2420]/10 overflow-hidden shadow-xs">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGqFN7U8lBNPsDMQ6IbVmKjatFVPcwrqYrhs5ChPu-e17oEdGU0aVo_W2SRdmOmCjGlCFnzZXcjlqi46ecuq5NziWrn_GnTpHp4NgaE_xw_xvyHztUXzHQvfFXOCpde3vUbOAy6xFKx9_fJv0EDE9KbuilAg2TtOVRwzczikgFB8Zjk4bgYV8VbtA08vMtfZbyt48eBT0olALue8JwSnDZfNIpPhWRqVkctousCFDExoQ0RPi-DlntqTvyDSYYz35bHVEt1LEseYow"
                alt="A stark laboratory setting with raw rosemary"
                className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply"
              />
            </div>
            {/* Outline box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#1A2420]/15 z-[-1] hidden md:block rounded" />
          </div>

          <div className="md:col-span-5 md:col-start-8 space-y-6">
            <span className="font-sans text-[11px] font-bold text-[#8B5A4A] uppercase tracking-[0.15em] block">
              Rigorous Sourcing
            </span>
            <h2 className="font-serif text-[28px] md:text-[36px] text-[#1A2420] font-medium leading-tight">
              Cultivated with Intention
            </h2>
            <p className="font-sans text-[15px] text-[#434845] leading-relaxed">
              Every ingredient in our apothecary is selected through a meticulous vetting process. We partner directly with regenerative farms that prioritize soil health and biodiversity. Our botanicals are harvested at peak potency, ensuring the active compounds remain intact and bio-effective.
            </p>
            
            <ul className="space-y-3 font-sans text-sm text-[#1A2420] font-semibold">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B5A4A]" />
                <span>100% Traceable supply chain</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B5A4A]" />
                <span>Regenerative, organic agricultural standards</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B5A4A]" />
                <span>Zero synthetic pesticides or additives</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Split 2: Testing (Text Left, Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-6 order-2 md:order-1">
            <span className="font-sans text-[11px] font-bold text-[#8B5A4A] uppercase tracking-[0.15em] block">
              Clinical Validation
            </span>
            <h2 className="font-serif text-[28px] md:text-[36px] text-[#1A2420] font-medium leading-tight">
              Tested Beyond the Standard
            </h2>
            <p className="font-sans text-[15px] text-[#434845] leading-relaxed">
              Nature provides the raw materials; science ensures their precise delivery. Our formulations undergo independent, double-blind clinical trials to substantiate bio-compatibility, cellular absorption rates, and systemic support without unwanted dependency.
            </p>
            
            <div className="pt-2">
              <button
                onClick={handleCTAExplore}
                className="inline-flex items-center gap-2 font-sans text-[11px] font-bold text-[#1A2420] uppercase border-b-2 border-[#1A2420] pb-1 hover:text-[#8B5A4A] hover:border-[#8B5A4A] transition-colors focus:outline-none"
              >
                <span>Read the Clinical Data</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 relative">
            <div className="aspect-[4/5] md:aspect-square bg-[#e5e2dc] w-full rounded border border-[#1A2420]/10 overflow-hidden shadow-xs">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL2f0lW8g7IIksplwnpoxgM8u3f9zJCwX_flPAtuREfnQVpSIqWTjZBmzS-5cXjzuLiWnasFUevDpQlY6ilYG4U-jrHOCSLU9m83cZGW7Yosn1oUiDSZF05RoXCsvYD5-r-3uqb_1WCGoZwfphdSFAIlPi0hkLWKfx2lOoXAobNS4zzOCMW3MKx_4hACZtiGvJkXgpEdgLQFejbNicoEsbhhbQJDfdZwERGZf5OcMyUUGPakDet6XYhi0AKQGiKb_RlFw9UjBi3Jnx"
                alt="viscous serum droplet suspended above white background"
                className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#1A2420]/15 z-[-1] hidden md:block rounded" />
          </div>
        </div>

      </section>

      {/* Directors Profiles */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-24 border-t border-[#1A2420]/10 text-left">
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-[28px] md:text-[36px] text-[#1A2420] font-medium leading-tight">
            The Minds Behind the Formulations
          </h2>
          <p className="font-sans text-[15px] text-[#434845] leading-relaxed">
            A multi-disciplinary team of biochemists, master herbalists, and clinical dermatologists dedicated to redefining modern supplement architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="group border border-[#1A2420]/5 rounded p-4 bg-[#F7F4EE] hover:border-[#8B5A4A] transition-all duration-300">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 border border-[#1A2420]/5 select-none relative">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                />
              </div>
              <h3 className="font-serif text-[22px] text-[#1A2420] leading-tight font-medium">
                {member.name}
              </h3>
              <p className="font-sans text-[11px] font-bold text-[#8B5A4A] uppercase tracking-wider mt-1">
                {member.role}
              </p>
              <p className="font-sans text-[13px] text-[#434845] mt-3 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="bg-[#1A2420] py-24 px-4 text-center border-t-4 border-[#8B5A4A]">
        <div className="max-w-2xl mx-auto flex flex-col items-center space-y-6 select-none">
          <Sparkles className="w-10 h-10 text-[#8B5A4A] stroke-[1.2]" />
          <h2 className="font-serif text-[28px] md:text-[36px] text-[#F7F4EE] font-medium">
            Experience the Efficacy
          </h2>
          <p className="font-sans text-[15px] text-[#F7F4EE]/80 leading-relaxed max-w-lg">
            Discover our collection of clinically proven, botanically driven formulations engineered for absolute bodily wellness.
          </p>
          <div className="pt-4">
            <button
              onClick={handleCTAExplore}
              className="bg-[#F7F4EE] hover:bg-[#8B5A4A] text-[#1A2420] hover:text-[#F7F4EE] px-10 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 scale-100 active:scale-95 shadow-md"
            >
              Explore Our Products
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
