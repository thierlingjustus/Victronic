import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import logo from '../logo.png';

type NavbarProps = {
  /** Wenn gesetzt, zeigt die Navbar statt des Menüs einen Zurück-Link auf dieses Ziel. */
  backTo?: string;
  backLabel?: string;
};

export default function Navbar({ backTo, backLabel = 'Zurück zur Startseite' }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm text-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Victronic GmbH Logo" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        {backTo ? (
          <Link to={backTo} className="text-sm font-medium text-gray-500 hover:text-brand-700 flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a href="#about" className="hover:text-brand-700 transition-colors">Über uns</a>
              <a href="#services" className="hover:text-brand-700 transition-colors">Leistungen</a>
              <a href="#products" className="hover:text-brand-700 transition-colors">Produkte</a>
              <a href="#process" className="hover:text-brand-700 transition-colors">Prozess</a>

              {/* Impressum Dropdown */}
              <div className="relative group py-2">
                <span className="hover:text-brand-700 transition-colors flex items-center gap-1 cursor-pointer">
                  Impressum
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </span>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                  <Link to="/impressum" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-700 transition-colors">
                    Impressum
                  </Link>
                  <Link to="/datenschutz" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-700 transition-colors">
                    Datenschutz
                  </Link>
                  <Link to="/inhalt-recht" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-700 transition-colors">
                    Inhalt / Recht
                  </Link>
                  <Link to="/agb" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-700 transition-colors">
                    AGB
                  </Link>
                </div>
              </div>
            </div>
            <a href="#contact" className="text-sm font-medium bg-brand-700 text-white px-5 py-2 rounded-md hover:bg-brand-800 transition-colors shadow-sm">
              Kontakt
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
