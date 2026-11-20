/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, ReactNode } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MotionConfig, AnimatePresence, motion } from 'motion/react';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { ScrollProgressLine } from '@/src/components/MotionPrimitives';
import { HomePage } from '@/src/pages/HomePage';
import { ServicesPage } from '@/src/pages/ServicesPage';
import { ServiceDetailPage } from '@/src/pages/ServiceDetailPage';
import { ProductsPage } from '@/src/pages/ProductsPage';
import { ProductCategoryPage } from '@/src/pages/ProductCategoryPage';
import { ProductDetailPage } from '@/src/pages/ProductDetailPage';
import { WorkPage } from '@/src/pages/WorkPage';
import { CaseStudyPage } from '@/src/pages/CaseStudyPage';
import { AboutPage } from '@/src/pages/AboutPage';
import { ProcessPage } from '@/src/pages/ProcessPage';
import { CareersPage } from '@/src/pages/CareersPage';
import { InsightsPage } from '@/src/pages/InsightsPage';
import { ArticlePage } from '@/src/pages/ArticlePage';
import { ContactPage } from '@/src/pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />

          {/* Custom Development Services */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />

          {/* Digital Products (Separated from Services) */}
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products/shopify-apps"
            element={<ProductCategoryPage platform="shopify" />}
          />
          <Route
            path="/products/shopify-apps/:slug"
            element={<ProductDetailPage platform="shopify" />}
          />
          <Route
            path="/products/magento-extensions"
            element={<ProductCategoryPage platform="magento" />}
          />
          <Route
            path="/products/magento-extensions/:slug"
            element={<ProductDetailPage platform="magento" />}
          />
          <Route
            path="/products/wordpress-plugins"
            element={<ProductCategoryPage platform="wordpress" />}
          />
          <Route
            path="/products/wordpress-plugins/:slug"
            element={<ProductDetailPage platform="wordpress" />}
          />

          {/* Portfolio & Case Studies */}
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />

          {/* Company, Process, Careers, Insights, Contact */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function AppRouter({ children }: { children: ReactNode }) {
  const isGitHubPages =
    typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
  if (isGitHubPages) {
    return <HashRouter>{children}</HashRouter>;
  }
  return <BrowserRouter>{children}</BrowserRouter>;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppRouter>
        <ScrollToTop />
        <ScrollProgressLine />
        <div className="min-h-screen flex flex-col bg-[#F9F9F7] text-[#111214]">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </AppRouter>
    </MotionConfig>
  );
}
