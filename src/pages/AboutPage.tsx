import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COMPANY } from '@/src/data/company';
import { PageHeader, Reveal, AnimatedCounter, ResilientImage } from '@/src/components/MotionPrimitives';
import heroStudioImg from '@/src/assets/images/hero_commerce_architecture_1795162904296.jpg';

export function AboutPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        title="Engineering reliable commerce software since 2011."
        subtitle={`${COMPANY.legalName} is a product-led eCommerce and software development company headquartered in ${COMPANY.headquarters.city}, India—trusted by global brands for complex migrations, storefronts, and marketplace applications.`}
      />

      {/* Verified Metrics Strip */}
      <section className="bg-white py-14 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {COMPANY.verifiedMetrics.map((metric, idx) => (
            <Reveal key={metric.label} delay={idx * 0.05}>
              <div className="font-display text-3xl sm:text-4xl font-semibold text-[#111214]">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  animateAsYear={metric.animateAsYear}
                />
              </div>
              <div className="text-sm font-semibold text-[#111214] mt-1">{metric.label}</div>
              <p className="text-xs sm:text-sm text-[#52555E] mt-1 leading-relaxed">
                {metric.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story & Studio Image */}
      <section className="bg-[#F9F9F7] py-20 lg:py-28 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6 space-y-6">
            <p className="text-sm font-medium text-[#1D4ED8]">Company Background</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111214] leading-[1.14]">
              Two complementary disciplines: bespoke client engineering and commercial products.
            </h2>
            <p className="text-base text-[#52555E] leading-relaxed">
              Operating continuously since 2011 from Dewas, Madhya Pradesh, Expound Coderz grew out
              of deep hands-on PHP, Magento, and full-stack web engineering. As merchants shifted
              toward cloud commerce, we expanded into an official Shopify Partner practice and
              built the ESTS product suite—shipping more than 30 Shopify apps and 35 Magento 2
              extensions alongside WordPress plugins.
            </p>
            <p className="text-base text-[#52555E] leading-relaxed">
              Because our engineers build and maintain commercial marketplace apps reviewed daily by
              merchants, we bring product-grade discipline—clean APIs, zero core overrides, and
              strict QA—to every custom client storefront and migration.
            </p>
            <div className="pt-2 flex flex-wrap gap-6">
              <Link
                to="/process"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#111214] hover:text-[#1D4ED8] transition-colors"
              >
                <span>Explore Our Delivery Process</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/careers"
                className="link-underline text-sm font-medium text-[#52555E] hover:text-[#111214]"
              >
                Join Our Engineering Team
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E4E4DF] bg-[#14161A]">
              <ResilientImage
                src={heroStudioImg}
                alt="Expound Coderz engineering studio environment"
                fallbackTitle="Expound Coderz Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Verified Credentials */}
      <section className="bg-white py-20 lg:py-24 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-sm font-medium text-[#1D4ED8] mb-2">Verified Credentials</p>
            <h2 className="font-display text-3xl font-semibold text-[#111214]">
              Partner standing across global commerce ecosystems.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMPANY.credentials.map((cred, idx) => (
              <Reveal
                key={cred.title}
                delay={idx * 0.06}
                className="bg-[#F9F9F7] border border-[#E4E4DF] rounded-2xl p-8 space-y-3"
              >
                <div className="font-mono text-xs text-[#1D4ED8]">0{idx + 1}.</div>
                <h3 className="font-display text-xl font-semibold text-[#111214]">{cred.title}</h3>
                <p className="text-sm text-[#52555E] leading-relaxed">{cred.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
