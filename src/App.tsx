import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Scrollt bei Routenwechsel nach oben; Anker-Links (z.B. /#contact) springen zum Ziel.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const SystemsHub = lazy(() => import('./pages/SystemsHub'));
const SystemDetail = lazy(() => import('./pages/SystemDetail'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const Impressum = lazy(() => import('./pages/Impressum'));
const InhaltRecht = lazy(() => import('./pages/InhaltRecht'));
const AGB = lazy(() => import('./pages/AGB'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/systems" element={<SystemsHub />} />
          <Route path="/systems/:id" element={<SystemDetail />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/inhalt-recht" element={<InhaltRecht />} />
          <Route path="/agb" element={<AGB />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
