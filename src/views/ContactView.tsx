import { useState, FormEvent } from 'react';
import { ChevronRight, Send, CheckCircle, AlertCircle, Compass } from 'lucide-react';
import { ScreenType } from '../types';

interface ContactViewProps {
  setScreen: (screen: ScreenType) => void;
  userEmail?: string;
}

export default function ContactView({ setScreen, userEmail = '' }: ContactViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setSuccess(true);
      setName('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to connect to the laboratory server.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-24 text-center animate-fade-in space-y-6">
        <div className="flex justify-center select-none">
          <div className="bg-[#2F4A3C]/10 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-[#2F4A3C]" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="font-sans text-[11px] font-bold text-[#8B5A4A] uppercase tracking-[0.15em]">
            Message Received
          </span>
          <h1 className="font-serif text-[32px] md:text-[40px] text-[#1A2420] font-medium leading-none">
            We will be in touch.
          </h1>
          <p className="font-sans text-[15px] text-[#434845] leading-relaxed max-w-md mx-auto">
            Your dispatch has been successfully recorded at our laboratory operations center. An apothecary coordinator will address your compound inquiry within 24 business hours.
          </p>
        </div>

        <div className="pt-6">
          <button
            onClick={() => setScreen('home')}
            className="px-8 py-3 bg-[#1A2420] text-white hover:bg-[#8B5A4A] rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all scale-100 active:scale-95 shadow-md"
          >
            Return to Apothecary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-16 animate-fade-in text-left">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center space-x-2 font-sans text-[11px] font-bold text-[#737875] uppercase tracking-[0.15em] select-none">
        <button onClick={() => setScreen('home')} className="hover:text-[#1A2420] transition-colors focus:outline-none">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1A2420]">Contact</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#1A2420]/10 pb-6 mb-12">
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B5A4A]">Laboratory Dispatch</span>
        <h1 className="font-serif text-[36px] md:text-[48px] text-[#1A2420] font-medium leading-none mt-1">
          Contact Our Team
        </h1>
        <p className="font-sans text-[15px] text-[#434845] mt-4 leading-relaxed">
          Send a direct request to our compounding laboratory, bulk wholesale department, or clinical research coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Info Column (4 cols) */}
        <div className="md:col-span-4 space-y-8 font-sans text-sm">
          <div className="space-y-2">
            <h3 className="font-bold text-[#1A2420] uppercase tracking-wider text-[11px]">Laboratory Address</h3>
            <p className="text-[#434845] leading-relaxed">
              Verdant & Co. Laboratories<br />
              108 Circadian Blvd, Suite A<br />
              Seattle, WA 98101
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-[#1A2420] uppercase tracking-wider text-[11px]">Direct Support</h3>
            <p className="text-[#434845] leading-relaxed">
              Email: support@verdant.co<br />
              Phone: 1 (800) 555-0199
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-[#1A2420] uppercase tracking-wider text-[11px]">Business Hours</h3>
            <p className="text-[#434845] leading-relaxed">
              Monday – Friday<br />
              9:00 AM – 5:00 PM PST
            </p>
          </div>
        </div>

        {/* Form Column (8 cols) */}
        <form onSubmit={handleSubmit} className="md:col-span-8 space-y-8">
          {error && (
            <div className="bg-[#c44d2f]/10 border border-[#c44d2f]/30 p-4 rounded flex items-center gap-3 text-[#c44d2f]">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-sans text-sm font-semibold">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr./Mr./Ms. Name"
                className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] transition-all"
                id="contact-name"
              />
              <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                Full Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] transition-all"
                id="contact-email"
              />
              <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
                Email Address
              </label>
            </div>
          </div>

          <div className="relative">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] transition-all appearance-none"
              id="contact-subject"
            >
              <option>Product Inquiry</option>
              <option>Clinical Study Request</option>
              <option>Wholesale Partnerships</option>
              <option>Circadian Consultation</option>
              <option>Shipping & Logistics Support</option>
            </select>
            <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
              Department/Subject
            </label>
          </div>

          <div className="relative">
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please detail your compound request or order issue..."
              className="w-full bg-transparent border-b border-[#1A2420]/30 focus:border-[#8B5A4A] focus:border-b-2 focus:ring-0 py-3 text-sm text-[#1A2420] placeholder:text-[#c3c8c4] transition-all resize-none"
              id="contact-message"
            />
            <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#737875] absolute -top-3 left-0">
              Message/Inquiry Details
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-4 bg-[#1A2420] text-white hover:bg-[#8B5A4A] rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all scale-100 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{submitting ? 'Transmitting...' : 'Transmit Message'}</span>
              {!submitting && <Send className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
