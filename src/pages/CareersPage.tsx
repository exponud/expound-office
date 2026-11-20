import { useState, FormEvent } from 'react';
import { Check } from 'lucide-react';
import { COMPANY } from '@/src/data/company';
import { PageHeader, Reveal } from '@/src/components/MotionPrimitives';

export function CareersPage() {
  const [selectedRole, setSelectedRole] = useState(COMPANY.careers[0].title);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: 'Careers' },
        ]}
        title="Build commerce infrastructure and software products with us."
        subtitle={`Join our engineering and design team in ${COMPANY.headquarters.city}, India—working on Shopify Plus builds, Adobe Commerce extensions, and full-stack SaaS applications.`}
      />

      <section className="bg-[#F9F9F7] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Open Roles List */}
          <div className="lg:col-span-7 divide-y divide-[#E4E4DF] border-t border-b border-[#E4E4DF]">
            {COMPANY.careers.map((role, idx) => (
              <Reveal key={role.id} delay={idx * 0.05} className="py-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#52555E] mb-1">
                      <span>{role.department}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{role.location}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{role.type}</span>
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-[#111214]">
                      {role.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole(role.title);
                      setSubmitted(false);
                    }}
                    className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      selectedRole === role.title
                        ? 'bg-[#111214] text-white border-[#111214]'
                        : 'bg-white text-[#111214] border-[#E4E4DF] hover:border-[#111214]'
                    }`}
                  >
                    {selectedRole === role.title ? 'Selected in Form' : 'Apply for Role'}
                  </button>
                </div>

                <p className="text-sm sm:text-base text-[#52555E] leading-relaxed">
                  {role.summary}
                </p>

                <ul className="space-y-2 pt-1">
                  {role.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2.5 text-sm text-[#111214]">
                      <Check
                        className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Application Form */}
          <div className="lg:col-span-5 bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-8 sticky top-24">
            <h3 className="font-display text-xl font-semibold text-[#111214]">
              Candidate Application
            </h3>
            <p className="text-sm text-[#52555E] mt-1">
              Or email your CV directly to{' '}
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="text-[#1D4ED8] hover:underline"
              >
                {COMPANY.contact.email}
              </a>
              .
            </p>

            {submitted ? (
              <div className="mt-6 p-5 bg-[#F9F9F7] border border-[#E4E4DF] rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#111214]">
                  <Check className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
                  <span>Application Prepared</span>
                </div>
                <p className="text-sm text-[#52555E] leading-relaxed">
                  Thank you, {name}. Your application for <strong>{selectedRole}</strong> has been
                  recorded. Our recruitment desk reviews technical portfolios weekly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPortfolioUrl('');
                    setNote('');
                  }}
                  className="text-xs font-medium text-[#1D4ED8] hover:underline pt-1"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#111214] mb-1.5">
                    Target Position
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                  >
                    {COMPANY.careers.map((r) => (
                      <option key={r.id} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111214] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111214] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111214] mb-1.5">
                    GitHub / Portfolio / LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111214] mb-1.5">
                    Experience Summary
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Key platforms, languages, and production projects shipped..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F7] border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
