import { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import { ScreenType } from '../types';

interface FAQViewProps {
  setScreen: (screen: ScreenType) => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'Sourcing' | 'Science & Purity' | 'Shipping & Policy';
}

export default function FAQView({ setScreen }: FAQViewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      category: 'Sourcing',
      question: 'Where are your raw botanicals sourced?',
      answer: 'We partner directly with certified regenerative family farms in the Pacific Northwest, Northern Europe, and Hokkaido. These agricultural partners prioritize soil biodiversity and natural microbiological health, which elevates the active phytocompound concentration in our raw inputs.'
    },
    {
      category: 'Sourcing',
      question: 'What is regenerative agriculture, and why does it matter?',
      answer: 'Regenerative agriculture focuses on rebuilding soil organic matter and restoring degraded soil biodiversity. Healthy soil contains rich mycorrhizal fungal networks that encourage plants to generate robust biochemical defense systems—yielding much denser concentrations of active molecules for our formulations.'
    },
    {
      category: 'Science & Purity',
      question: 'Are your supplements vegan and non-GMO?',
      answer: 'Yes, 100% of our clinical adaptogens, tinctures, and serums are vegan, non-GMO, and free from synthetic preservatives, binding agents, artificial colorants, and common allergens.'
    },
    {
      category: 'Science & Purity',
      question: 'How do you test for purity and quality assurance?',
      answer: 'Every single raw batch is quarantined and undergoes rigorous testing. We perform High-Performance Liquid Chromatography (HPLC) to verify active compound density, and mass spectrometry to guarantee the absolute absence of heavy metals, pesticides, and microbial contaminants.'
    },
    {
      category: 'Science & Purity',
      question: 'What does "double-blind clinical verification" mean?',
      answer: 'Unlike companies that rely on generic ingredient literature, we run independent, double-blind, placebo-controlled trials on our final formulated products. Neither the researchers nor the participants know who receives the active compound or the placebo, ensuring completely objective scientific data.'
    },
    {
      category: 'Shipping & Policy',
      question: 'How does carbon-neutral shipping work?',
      answer: 'We offset 100% of carbon emissions from our transit routes by partnering with certified forestry projects and soil carbon capture initiatives. Your package arrives in compostable boxes made from agricultural waste fibers and soy-based inks.'
    },
    {
      category: 'Shipping & Policy',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day trial period on all first-time purchases. If a formulation does not align with your physiology, contact us for a full refund. We do not require you to ship the bottle back to minimize carbon transit footprint.'
    }
  ];

  return (
    <div className="max-w-[800px] mx-auto px-4 py-16 animate-fade-in text-left">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center space-x-2 font-sans text-[11px] font-bold text-[#737875] uppercase tracking-[0.15em] select-none">
        <button onClick={() => setScreen('home')} className="hover:text-[#1A2420] transition-colors focus:outline-none">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1A2420]">FAQ</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#1A2420]/10 pb-6 mb-12">
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B5A4A]">Customer Support</span>
        <h1 className="font-serif text-[36px] md:text-[48px] text-[#1A2420] font-medium leading-none mt-1">
          Frequently Answered
        </h1>
        <p className="font-sans text-[15px] text-[#434845] mt-4 leading-relaxed">
          Detailed clarifications on our clinical trials, sourcing standards, carbon-neutral shipping, and holistic botanical philosophy.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-6">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="border border-[#1A2420]/10 rounded bg-[#f6f3ed]/40 hover:border-[#8B5A4A]/40 transition-colors"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-serif text-[20px] md:text-[22px] font-medium text-[#1A2420] hover:text-[#8B5A4A] focus:outline-none transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="font-sans text-[9px] font-bold uppercase text-[#8B5A4A] tracking-wider px-2 py-0.5 border border-[#8B5A4A]/20 bg-[#8B5A4A]/5 rounded-sm shrink-0">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[#8B5A4A] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[300px] border-t border-[#1A2420]/5' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-5 font-sans text-[15px] text-[#434845] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Banner */}
      <div className="mt-16 bg-[#1A2420]/5 border border-[#1A2420]/10 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <p className="font-serif text-[20px] text-[#1A2420] font-medium">Have a specific question?</p>
          <p className="font-sans text-xs text-[#434845]">Our laboratory team is available to clarify compound details.</p>
        </div>
        <button
          onClick={() => setScreen('contact')}
          className="px-6 py-3 bg-[#8B5A4A] text-white hover:bg-[#1A2420] rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
        >
          Send us a Message
        </button>
      </div>
    </div>
  );
}
