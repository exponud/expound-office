import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<'services' | 'products' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F9F9F7]/92 backdrop-blur-md border-b border-[#E4E4DF]'
          : 'bg-[#F9F9F7]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-[#111214] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm"
        >
          Expound Coderz
        </Link>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#52555E]"
        >
          {/* Services Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('services')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'services' ? null : 'services')}
              aria-expanded={openMenu === 'services'}
              className={`inline-flex items-center gap-1 py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm ${
                isActive('/services') ? 'text-[#111214]' : 'hover:text-[#111214]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openMenu === 'services' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openMenu === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full pt-2 w-[340px]"
                >
                  <div className="bg-white border border-[#E4E4DF] rounded-xl shadow-lg p-3">
                    <Link
                      to="/services"
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#F9F9F7] transition-colors"
                    >
                      <span className="text-sm font-semibold text-[#111214]">
                        All Development Services
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#52555E]" aria-hidden="true" />
                    </Link>
                    <div className="my-1.5 border-t border-[#E4E4DF]" />
                    <div className="grid gap-0.5">
                      <Link
                        to="/services/shopify-plus-development"
                        className="px-3 py-2 rounded-lg text-sm text-[#52555E] hover:text-[#111214] hover:bg-[#F9F9F7] transition-colors"
                      >
                        Shopify & Shopify Plus
                      </Link>
                      <Link
                        to="/services/platform-migrations"
                        className="px-3 py-2 rounded-lg text-sm text-[#52555E] hover:text-[#111214] hover:bg-[#F9F9F7] transition-colors"
                      >
                        Enterprise Platform Migrations
                      </Link>
                      <Link
                        to="/services/magento-adobe-commerce"
                        className="px-3 py-2 rounded-lg text-sm text-[#52555E] hover:text-[#111214] hover:bg-[#F9F9F7] transition-colors"
                      >
                        Magento & Adobe Commerce
                      </Link>
                      <Link
                        to="/services/wordpress-woocommerce"
                        className="px-3 py-2 rounded-lg text-sm text-[#52555E] hover:text-[#111214] hover:bg-[#F9F9F7] transition-colors"
                      >
                        WordPress & WooCommerce
                      </Link>
                      <Link
                        to="/services/custom-software-saas"
                        className="px-3 py-2 rounded-lg text-sm text-[#52555E] hover:text-[#111214] hover:bg-[#F9F9F7] transition-colors"
                      >
                        Custom Web Apps & SaaS
                      </Link>
                      <Link
                        to="/services/ai-integrations-optimization"
                        className="px-3 py-2 rounded-lg text-sm text-[#52555E] hover:text-[#111214] hover:bg-[#F9F9F7] transition-colors"
                      >
                        AI Integrations & Performance
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Dropdown Trigger — Strictly Separated from Services */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('products')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'products' ? null : 'products')}
              aria-expanded={openMenu === 'products'}
              className={`inline-flex items-center gap-1 py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm ${
                isActive('/products') ? 'text-[#111214]' : 'hover:text-[#111214]'
              }`}
            >
              <span>Products</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openMenu === 'products' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openMenu === 'products' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full pt-2 w-[320px]"
                >
                  <div className="bg-white border border-[#E4E4DF] rounded-xl shadow-lg p-3">
                    <Link
                      to="/products"
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#F9F9F7] transition-colors"
                    >
                      <span className="text-sm font-semibold text-[#111214]">
                        Digital Products Overview
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#52555E]" aria-hidden="true" />
                    </Link>
                    <div className="my-1.5 border-t border-[#E4E4DF]" />
                    <div className="grid gap-1">
                      <Link
                        to="/products/shopify-apps"
                        className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9F7] transition-colors"
                      >
                        <div className="text-sm font-medium text-[#111214]">Shopify Apps</div>
                        <div className="text-xs text-[#52555E]">
                          30+ ESTS apps for B2B, bundling & ERP sync
                        </div>
                      </Link>
                      <Link
                        to="/products/magento-extensions"
                        className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9F7] transition-colors"
                      >
                        <div className="text-sm font-medium text-[#111214]">Magento Extensions</div>
                        <div className="text-xs text-[#52555E]">
                          35+ Adobe Commerce & Magento 2 modules
                        </div>
                      </Link>
                      <Link
                        to="/products/wordpress-plugins"
                        className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9F7] transition-colors"
                      >
                        <div className="text-sm font-medium text-[#111214]">WordPress Plugins</div>
                        <div className="text-xs text-[#52555E]">
                          WooCommerce ERP connectors & headless tools
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/work"
            className={`link-underline py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm ${
              isActive('/work') ? 'text-[#111214]' : 'hover:text-[#111214]'
            }`}
          >
            Work
          </Link>

          <Link
            to="/process"
            className={`link-underline py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm ${
              isActive('/process') ? 'text-[#111214]' : 'hover:text-[#111214]'
            }`}
          >
            Process
          </Link>

          <Link
            to="/about"
            className={`link-underline py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm ${
              isActive('/about') ? 'text-[#111214]' : 'hover:text-[#111214]'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            Start a Project
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E4E4DF] bg-white text-[#111214] hover:bg-[#F9F9F7] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-[#E4E4DF] bg-white overflow-hidden"
          >
            <div className="px-6 py-6 space-y-6 max-h-[82vh] overflow-y-auto">
              <div>
                <p className="text-xs font-medium text-[#52555E] mb-2">Development Services</p>
                <div className="grid gap-1">
                  <Link to="/services" className="py-2.5 text-base font-medium text-[#111214]">
                    Services Overview
                  </Link>
                  <Link
                    to="/services/shopify-plus-development"
                    className="py-2 text-sm text-[#52555E]"
                  >
                    Shopify & Shopify Plus
                  </Link>
                  <Link to="/services/platform-migrations" className="py-2 text-sm text-[#52555E]">
                    Platform Migrations
                  </Link>
                  <Link
                    to="/services/magento-adobe-commerce"
                    className="py-2 text-sm text-[#52555E]"
                  >
                    Magento & Adobe Commerce
                  </Link>
                  <Link to="/services/custom-software-saas" className="py-2 text-sm text-[#52555E]">
                    Custom Software & SaaS
                  </Link>
                </div>
              </div>

              <div className="border-t border-[#E4E4DF] pt-5">
                <p className="text-xs font-medium text-[#52555E] mb-2">Digital Products</p>
                <div className="grid gap-1">
                  <Link to="/products" className="py-2.5 text-base font-medium text-[#111214]">
                    All Digital Products
                  </Link>
                  <Link to="/products/shopify-apps" className="py-2 text-sm text-[#52555E]">
                    Shopify Apps
                  </Link>
                  <Link to="/products/magento-extensions" className="py-2 text-sm text-[#52555E]">
                    Magento Extensions
                  </Link>
                  <Link to="/products/wordpress-plugins" className="py-2 text-sm text-[#52555E]">
                    WordPress Plugins
                  </Link>
                </div>
              </div>

              <div className="border-t border-[#E4E4DF] pt-5 grid grid-cols-2 gap-3 text-base font-medium text-[#111214]">
                <Link to="/work" className="py-2">
                  Selected Work
                </Link>
                <Link to="/process" className="py-2">
                  Our Process
                </Link>
                <Link to="/about" className="py-2">
                  About Us
                </Link>
                <Link to="/insights" className="py-2">
                  Insights
                </Link>
                <Link to="/careers" className="py-2">
                  Careers
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-[#111214] rounded-lg"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
