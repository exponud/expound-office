import { useState, FormEvent } from 'react';
import { Check, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY } from '@/src/data/company';
import { PageHeader, Reveal } from '@/src/components/MotionPrimitives';

type EnquiryArea =
  | 'Shopify Plus / Storefront Build'
  | 'Platform Migration (Magento / WooCommerce)'
  | 'Magento 2 / Adobe Commerce'
  | 'Custom Software / SaaS / AI'
  | 'Digital Product Licensing & Support';

export function ContactPage() {
  const [area, setArea] = useState<EnquiryArea>('Shopify Plus / Storefront Build');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name.trim() || !email.trim() || !details.trim()) {
      setErrorMsg('Please complete your name, email address, and project scope.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title="Start a Technical Conversation"
        subtitle="Whether planning a zero-downtime migration, custom web build, or commercial product adaptation, connect directly with our engineering team."
        dark
      />

      <section className="bg-[#F9F9F7] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Verified Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214]">
                Direct Channels
              </h2>
              <p className="text-base text-[#52555E] leading-relaxed">
                Every enquiry goes directly to senior project architects—never an outsourced sales
                script.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="divide-y divide-[#E4E4DF] border-t border-b border-[#E4E4DF]">
              <div className="py-5 flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-medium text-[#52555E]">Email</div>
                  <a
                    href={`mailto:${COMPANY.contact.email}`}
                    className="text-base font-semibold text-[#111214] hover:text-[#1D4ED8]"
                  >
                    {COMPANY.contact.email}
                  </a>
                </div>
              </div>

              <div className="py-5 flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-medium text-[#52555E]">Phone / WhatsApp</div>
                  <a
                    href="tel:+917415752727"
                    className="text-base font-semibold text-[#111214] hover:text-[#1D4ED8] tabular-nums"
                  >
                    {COMPANY.contact.phone}
                  </a>
                </div>
              </div>

              <div className="py-5 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-medium text-[#52555E]">Headquarters</div>
                  <div className="text-sm font-medium text-[#111214]">
                    {COMPANY.headquarters.address}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="pt-2">
              <a
                href={COMPANY.contact.shopifyPartnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#111214] hover:text-[#1D4ED8] transition-colors"
              >
                <span>Shopify Partner App Directory</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          {/* Right: Project / Product Enquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-10">
            {submitted ? (
              <div className="py-8 space-y-4">
                <div className="inline-flex items-center gap-2.5 text-lg font-display font-semibold text-[#111214]">
                  <Check className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
                  <span>Enquiry Logged for {name}</span>
                </div>
                <p className="text-base text-[#52555E] leading-relaxed">
                  Your brief under <strong>{area}</strong> has been prepared for our engineering
                  team ({COMPANY.contact.email}). We respond to technical enquiries within one
                  business day.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setCompanyName('');
                      setStoreUrl('');
                      setDetails('');
                    }}
                    className="px-5 py-2.5 text-sm font-medium bg-[#111214] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-[#111214] mb-2">
                    Focus Area
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        'Shopify Plus / Storefront Build',
                        'Platform Migration (Magento / WooCommerce)',
                        'Magento 2 / Adobe Commerce',
                        'Custom Software / SaaS / AI',
                        'Digital Product Licensing & Support',
                      ] as const
                    ).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setArea(option)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors ${
                          area === option
                            ? 'bg-[#111214] text-white border-[#111214]'
                            : 'bg-[#F9F9F7] text-[#52555E] border-[#E4E4DF] hover:text-[#111214]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#111214] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#111214] mb-1.5"
                    >
                      Work Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-medium text-[#111214] mb-1.5"
                    >
                      Company / Brand
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Brand or Organization"
                      className="w-full px-4 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-url"
                      className="block text-xs font-medium text-[#111214] mb-1.5"
                    >
                      Existing Store or Website URL
                    </label>
                    <input
                      id="contact-url"
                      type="url"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-details"
                    className="block text-xs font-medium text-[#111214] mb-1.5"
                  >
                    Project Scope or Technical Requirements *
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Share SKU counts, source/target platforms, ERP integrations, or target launch dates..."
                    className="w-full px-4 py-3 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                {errorMsg && (
                  <p role="alert" className="text-sm text-red-700 font-medium">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                >
                  Submit Technical Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
