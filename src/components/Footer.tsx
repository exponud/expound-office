import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY } from '@/src/data/company';

export function Footer() {
  return (
    <footer className="bg-[#0B0C0E] text-[#F9F9F7] border-t border-[#262930]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="font-display text-xl font-bold tracking-tight text-white inline-block"
            >
              Expound Coderz
            </Link>
            <p className="text-sm text-[#9EA3AE] leading-relaxed max-w-sm">
              Enterprise eCommerce engineering, zero-downtime platform migrations, and custom
              software products crafted in Dewas, India since {COMPANY.founded}.
            </p>
            <div className="pt-2 space-y-1.5 text-sm text-[#9EA3AE]">
              <p>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="text-white hover:text-[#60A5FA] transition-colors"
                >
                  {COMPANY.contact.email}
                </a>
              </p>
              <p>
                <a
                  href="tel:+917415752727"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {COMPANY.contact.phone}
                </a>
              </p>
              <p className="text-xs text-[#717682] pt-1">{COMPANY.headquarters.address}</p>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white">Engineering Services</h3>
            <ul className="space-y-2.5 text-sm text-[#9EA3AE]">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/services/shopify-plus-development"
                  className="hover:text-white transition-colors"
                >
                  Shopify & Shopify Plus
                </Link>
              </li>
              <li>
                <Link
                  to="/services/platform-migrations"
                  className="hover:text-white transition-colors"
                >
                  Platform Migrations
                </Link>
              </li>
              <li>
                <Link
                  to="/services/magento-adobe-commerce"
                  className="hover:text-white transition-colors"
                >
                  Magento & Adobe Commerce
                </Link>
              </li>
              <li>
                <Link
                  to="/services/wordpress-woocommerce"
                  className="hover:text-white transition-colors"
                >
                  WordPress & WooCommerce
                </Link>
              </li>
              <li>
                <Link
                  to="/services/custom-software-saas"
                  className="hover:text-white transition-colors"
                >
                  Custom Software & SaaS
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ai-integrations-optimization"
                  className="hover:text-white transition-colors"
                >
                  AI & Speed Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white">Digital Products</h3>
            <ul className="space-y-2.5 text-sm text-[#9EA3AE]">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products/shopify-apps" className="hover:text-white transition-colors">
                  Shopify Apps
                </Link>
              </li>
              <li>
                <Link
                  to="/products/magento-extensions"
                  className="hover:text-white transition-colors"
                >
                  Magento Extensions
                </Link>
              </li>
              <li>
                <Link
                  to="/products/wordpress-plugins"
                  className="hover:text-white transition-colors"
                >
                  WordPress Plugins
                </Link>
              </li>
              <li>
                <a
                  href={COMPANY.contact.shopifyPartnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Shopify Partner Store</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2.5 text-sm text-[#9EA3AE]">
              <li>
                <Link to="/work" className="hover:text-white transition-colors">
                  Portfolio & Case Studies
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Expound Coderz
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-white transition-colors">
                  Our Delivery Process
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-white transition-colors">
                  Engineering Insights
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Project Enquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#262930] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#717682]">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName} All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span>Shopify Partner</span>
            <span aria-hidden="true">·</span>
            <span>Adobe Commerce Specialists</span>
            <span aria-hidden="true">·</span>
            <span>Est. {COMPANY.founded}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
