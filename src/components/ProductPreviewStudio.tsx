import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Check, PhoneCall, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { PRODUCTS, DigitalProduct } from '@/src/data/products';

const FEATURED_PREVIEW_PRODUCTS = PRODUCTS.filter((p) => p.featuredOnHome);

export function ProductPreviewStudio() {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    FEATURED_PREVIEW_PRODUCTS[0]?.slug || ''
  );
  // Interactive demo states for each product preview
  const [b2bUnlocked, setB2bUnlocked] = useState(false);
  const [bundleQty, setBundleQty] = useState(2);
  const [cartTotal, setCartTotal] = useState(65);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);
  const [buyNowTriggered, setBuyNowTriggered] = useState(false);

  const selectedProduct: DigitalProduct =
    FEATURED_PREVIEW_PRODUCTS.find((p) => p.slug === selectedSlug) ||
    FEATURED_PREVIEW_PRODUCTS[0];

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    setCallbackSent(false);
    setBuyNowTriggered(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
      {/* Left: Product Selector List */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
        <div className="divide-y divide-[#E4E4DF] border-t border-b border-[#E4E4DF]">
          {FEATURED_PREVIEW_PRODUCTS.map((product) => {
            const active = product.slug === selectedProduct.slug;
            return (
              <button
                key={product.slug}
                type="button"
                onClick={() => handleSelect(product.slug)}
                aria-pressed={active}
                className={`w-full text-left py-5 px-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                  active ? 'bg-white' : 'hover:bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#52555E] mb-1">
                      <span>{product.platformLabel}</span>
                      <span className="mx-1.5" aria-hidden="true">
                        ·
                      </span>
                      <span>{product.category}</span>
                    </div>
                    <div className="font-display text-lg font-semibold text-[#111214]">
                      {product.name}
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      active ? 'text-[#1D4ED8] translate-x-0.5' : 'text-[#9EA3AE]'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#111214] hover:text-[#1D4ED8] transition-colors"
          >
            <span>Browse all Shopify, Magento & WordPress products</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Right: Interactive Live Storefront Preview Frame */}
      <div className="lg:col-span-7 bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProduct.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Top Product Summary */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#E4E4DF]">
              <div>
                <div className="text-xs text-[#52555E] mb-1">
                  <span>{selectedProduct.platformLabel}</span>
                  <span className="mx-1.5" aria-hidden="true">
                    ·
                  </span>
                  <span>Interactive Storefront Simulation</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#111214]">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-[#52555E] mt-1.5 leading-relaxed max-w-xl">
                  {selectedProduct.tagline}
                </p>
              </div>
              <Link
                to={`/products/${
                  selectedProduct.platform === 'shopify'
                    ? 'shopify-apps'
                    : selectedProduct.platform === 'magento'
                    ? 'magento-extensions'
                    : 'wordpress-plugins'
                }/${selectedProduct.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#111214] border border-[#E4E4DF] hover:border-[#111214] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Product Specs</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Interactive Widget Stage */}
            <div className="bg-[#F9F9F7] border border-[#E4E4DF] rounded-xl p-5 sm:p-6">
              {selectedProduct.interactivePreviewType === 'shipping-booster' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[#111214]">
                      Cart Free-Shipping Threshold ($100.00)
                    </span>
                    <span className="font-mono text-xs text-[#52555E] tabular-nums">
                      ${cartTotal}.00 / $100.00
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#E4E4DF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1D4ED8] transition-all duration-300"
                      style={{ width: `${Math.min(100, cartTotal)}%` }}
                    />
                  </div>
                  <p className="text-sm text-[#111214]">
                    {cartTotal >= 100
                      ? 'Free Express Shipping unlocked for this order.'
                      : `Add $${100 - cartTotal}.00 more to unlock Free Express Shipping.`}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E4E4DF]">
                    <span className="text-xs text-[#52555E]">
                      AI Complementary Suggestion: Merino Care Kit ($20)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCartTotal((v) => Math.max(25, v - 20))}
                        className="px-3 py-1.5 text-xs font-medium bg-white border border-[#E4E4DF] rounded-md hover:border-[#111214] transition-colors"
                      >
                        - $20
                      </button>
                      <button
                        type="button"
                        onClick={() => setCartTotal((v) => Math.min(140, v + 20))}
                        className="px-3 py-1.5 text-xs font-medium bg-[#111214] text-white rounded-md hover:bg-[#1D4ED8] transition-colors"
                      >
                        + Add $20 Item
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedProduct.interactivePreviewType === 'b2b-lock' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-[#111214]">
                        Industrial Valve Assembly — SKU #EC-409
                      </div>
                      <div className="text-xs text-[#52555E]">Wholesale Collection Access Rule</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setB2bUnlocked(!b2bUnlocked)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors ${
                        b2bUnlocked
                          ? 'bg-[#111214] text-white border-[#111214]'
                          : 'bg-white text-[#111214] border-[#E4E4DF] hover:border-[#111214]'
                      }`}
                    >
                      {b2bUnlocked ? (
                        <>
                          <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Viewing as Approved Dealer</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Simulate Dealer Login</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-white border border-[#E4E4DF] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#52555E]">Wholesale Unit Price</div>
                      {b2bUnlocked ? (
                        <div className="font-mono text-xl font-semibold text-[#111214] tabular-nums mt-0.5">
                          $142.00 <span className="text-xs font-sans font-normal text-[#52555E]">(MOQ 10 units)</span>
                        </div>
                      ) : (
                        <div className="text-sm font-medium text-[#52555E] mt-1">
                          Sign in with an approved B2B trade account to view dealer pricing.
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setB2bUnlocked(!b2bUnlocked)}
                      className="px-4 py-2 text-xs font-medium rounded-lg bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
                    >
                      {b2bUnlocked ? 'Add Trade Case to Order' : 'Sign In to View Price'}
                    </button>
                  </div>
                </div>
              )}

              {selectedProduct.interactivePreviewType === 'bundler' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#111214]">
                        Custom Workstation Cooling Kit Bundle
                      </div>
                      <div className="text-xs text-[#52555E]">
                        Tiered Savings: 10% off 2+ items · 15% off 3+ items
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease bundle items"
                        onClick={() => setBundleQty((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 inline-flex items-center justify-center bg-white border border-[#E4E4DF] rounded-md"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-sm w-6 text-center tabular-nums">
                        {bundleQty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase bundle items"
                        onClick={() => setBundleQty((q) => Math.min(4, q + 1))}
                        className="w-8 h-8 inline-flex items-center justify-center bg-white border border-[#E4E4DF] rounded-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white border border-[#E4E4DF] rounded-lg p-4 flex items-center justify-between">
                    <div className="text-sm text-[#52555E]">
                      {bundleQty >= 3
                        ? '15% Tier Applied · Individual SKUs synced'
                        : bundleQty >= 2
                        ? '10% Tier Applied · Add 1 more for 15% off'
                        : 'Add 1 more component to unlock bundle discount'}
                    </div>
                    <div className="font-mono text-base font-semibold text-[#111214] tabular-nums">
                      $
                      {(
                        bundleQty *
                        120 *
                        (bundleQty >= 3 ? 0.85 : bundleQty >= 2 ? 0.9 : 1)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              )}

              {selectedProduct.interactivePreviewType === 'call-to-order' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#111214]">
                        High-Consideration Variant Consultation
                      </div>
                      <div className="text-xs text-[#52555E]">
                        Direct phone order & specialist callback inside Product Page
                      </div>
                    </div>
                    <PhoneCall className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                  </div>
                  {callbackSent ? (
                    <div className="bg-white border border-[#E4E4DF] rounded-lg p-4 flex items-center gap-3 text-sm text-[#111214]">
                      <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                      <span>
                        Callback request logged with active SKU reference. Sales desk notified.
                      </span>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (callbackPhone.trim()) setCallbackSent(true);
                      }}
                      className="flex flex-col sm:flex-row gap-2.5"
                    >
                      <input
                        type="tel"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="Enter phone number for order callback"
                        className="flex-1 px-3.5 py-2 text-sm bg-white border border-[#E4E4DF] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-medium bg-[#111214] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
                      >
                        Request Order Call
                      </button>
                    </form>
                  )}
                </div>
              )}

              {selectedProduct.interactivePreviewType === 'buy-now' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#111214]">
                        Magento 2 PDP — Instant Checkout Bypass
                      </div>
                      <div className="text-xs text-[#52555E]">
                        Compatible with Luma & Hyvä themes
                      </div>
                    </div>
                    <ShoppingBag className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                  </div>
                  <div className="bg-white border border-[#E4E4DF] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-sm text-[#52555E]">
                      {buyNowTriggered
                        ? 'Cart validated · Redirected directly to Magento 2 One-Page Checkout.'
                        : 'Skip intermediate /checkout/cart step with 1-click Buy Now.'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setBuyNowTriggered(!buyNowTriggered)}
                      className="px-4 py-2 text-xs font-medium bg-[#1D4ED8] text-white rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
                    >
                      {buyNowTriggered ? 'Reset Preview' : 'Buy Now — Instant Checkout'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Key Features Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#52555E]">
              {selectedProduct.features.slice(0, 2).map((feat) => (
                <div key={feat} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
