import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const SystemsHub = lazy(() => import('./pages/SystemsHub'));
const SystemDetail = lazy(() => import('./pages/SystemDetail'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const Impressum = lazy(() => import('./pages/Impressum'));
const InhaltRecht = lazy(() => import('./pages/InhaltRecht'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#14b8a6] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/systems" element={<SystemsHub />} />
          <Route path="/systems/:id" element={<SystemDetail />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/inhalt-recht" element={<InhaltRecht />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
