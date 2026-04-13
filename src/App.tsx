import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const SystemsHub = lazy(() => import('./pages/SystemsHub'));
const SystemDetail = lazy(() => import('./pages/SystemDetail'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#050505] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#00dfd8] border-t-transparent rounded-full animate-spin" />
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
        </Routes>
      </Suspense>
    </Router>
  );
}
