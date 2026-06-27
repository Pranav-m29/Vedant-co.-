import { useState, FormEvent } from 'react';
import { ArrowRight, Mail, Instagram, Compass } from 'lucide-react';
import { ScreenType } from '../types';

interface FooterProps {
  setScreen: (screen: ScreenType) => void;
}

export default function Footer({ setScreen }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        alert(data.message || 'Subscription failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to subscription server.');
    }
  };

  return (
    <footer className="bg-[#F7F4EE] border-t border-[#1A2420]/10 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-12 py-16 max-w-[1280px] mx-auto text-left">
        
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <button
            onClick={() => setScreen('home')}
            className="font-serif text-[28px] text-[#1A2420] block mb-4 font-semibold hover:text-[#8B5A4A] transition-colors"
          >
            Verdant & Co.
          </button>
          <p className="font-sans text-[15px] text-[#434845] leading-relaxed max-w-xs">
            Modern Apothecary.<br />
            Clinical botanicals designed for the discerning individual.
          </p>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-2 grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#1A2420]">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setScreen('science')}
                  className="font-sans text-[15px] text-[#434845] hover:text-[#8B5A4A] transition-colors text-left"
                >
                  About Our Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => setScreen('science')}
                  className="font-sans text-[15px] text-[#434845] hover:text-[#8B5A4A] transition-colors text-left"
                >
                  Sustainability Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => setScreen('journal')}
                  className="font-sans text-[15px] text-[#434845] hover:text-[#8B5A4A] transition-colors text-left"
                >
                  Apothecary Journal
                </button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#1A2420]">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setScreen('shop')}
                  className="font-sans text-[15px] text-[#434845] hover:text-[#8B5A4A] transition-colors text-left"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => setScreen('faq')}
                  className="font-sans text-[15px] text-[#434845] hover:text-[#8B5A4A] transition-colors text-left"
                >
                  Frequently Answered (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setScreen('contact')}
                  className="font-sans text-[15px] text-[#434845] hover:text-[#8B5A4A] transition-colors text-left"
                >
                  Contact Our Lab
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription Column */}
        <div className="space-y-4 md:col-span-1">
          <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#1A2420]">
            Newsletter
          </h4>
          <p className="font-sans text-[13px] text-[#434845] leading-relaxed">
            Subscribe for science-backed journal entries and early access to clinical formulations.
          </p>

          {subscribed ? (
            <div className="bg-[#1A2420]/5 border border-[#8B5A4A] p-4 rounded animate-fade-in text-left">
              <p className="font-serif text-[15px] text-[#1A2420] font-medium">Thank you for joining.</p>
              <p className="font-sans text-[12px] text-[#434845] mt-1">Your 15% discount code has been sent to your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-[#1A2420]/20 pb-2 mt-4 focus-within:border-[#8B5A4A] transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="bg-transparent border-none focus:outline-none focus:ring-0 font-sans text-sm flex-grow px-0 placeholder:text-[#434845]/50 text-[#1A2420]"
                id="footer-newsletter-email"
              />
              <button
                type="submit"
                className="text-[#8B5A4A] hover:text-[#1A2420] transition-colors flex items-center justify-center p-1"
                aria-label="Subscribe"
                id="footer-newsletter-submit"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Bottom Row */}
        <div className="col-span-1 md:col-span-4 pt-8 mt-8 border-t border-[#1A2420]/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="font-sans text-[13px] text-[#434845]">
            © 2026 Verdant & Co. Modern Apothecary.
          </p>
          <div className="flex space-x-6 items-center">
            <a
              href="#"
              className="text-[#434845] hover:text-[#8B5A4A] transition-colors text-xs flex items-center gap-1 uppercase tracking-wider font-bold"
              onClick={(e) => { e.preventDefault(); alert("Follow us on Instagram @verdant_co for botanical research notes."); }}
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <button
              onClick={() => setScreen('journal')}
              className="text-[#434845] hover:text-[#8B5A4A] transition-colors text-xs flex items-center gap-1 uppercase tracking-wider font-bold"
            >
              <Compass className="w-4 h-4" />
              <span>Journal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
