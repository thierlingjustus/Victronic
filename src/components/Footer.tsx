import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AnalogClock({ timezone }: { timezone: string }) {
  const [timeParts, setTimeParts] = useState({ hours: 0, minutes: 0, seconds: 0, dateStr: '' });

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      });
      
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      try {
        const parts = formatter.formatToParts(date);
        const dateStr = dateFormatter.format(date);
        
        const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
        const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
        const seconds = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);
        
        setTimeParts({ hours, minutes, seconds, dateStr });
      } catch (e) {
        console.error(e);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const { hours, minutes, seconds, dateStr } = timeParts;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 md:w-36 md:h-36 relative mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="2.5" fill="none" className="opacity-90" />
          
          {/* Hour hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="28" 
            stroke="white" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            transform={`rotate(${hourAngle} 50 50)`} 
          />
          
          {/* Minute hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="18" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            transform={`rotate(${minuteAngle} 50 50)`} 
          />
          
          {/* Second hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="14" 
            stroke="#14b8a6" 
            strokeWidth="1" 
            strokeLinecap="round" 
            transform={`rotate(${secondAngle} 50 50)`} 
          />
          
          <circle cx="50" cy="50" r="2.5" fill="white" />
        </svg>
      </div>
      <div className="text-[12px] text-gray-400 font-medium tracking-wide">
        {dateStr}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#12131a] text-white py-20 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 items-start">
          
          {/* Bargteheide */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-light text-gray-300 mb-8 tracking-wide">Bargteheide</h3>
            <AnalogClock timezone="Europe/Berlin" />
          </div>

          {/* Tokio */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-light text-gray-300 mb-8 tracking-wide">Tokio</h3>
            <AnalogClock timezone="Asia/Tokyo" />
          </div>

          {/* Shenzhen */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-light text-gray-300 mb-8 tracking-wide">Shenzhen</h3>
            <AnalogClock timezone="Asia/Shanghai" />
          </div>

          {/* Contact */}
          <div className="flex flex-col text-left font-sans text-sm text-gray-300">
            <h3 className="text-xl font-light text-gray-100 mb-6 tracking-wide">Contact</h3>
            
            <div className="space-y-1 leading-relaxed text-gray-400 font-light">
              <p className="font-semibold text-gray-300">Victronic GmbH</p>
              <p>Otto-Hahn-Straße 19</p>
              <p>D-22941 Bargteheide</p>
            </div>

            <div className="border-t border-gray-800/80 my-5" />

            <div className="space-y-1.5 text-gray-400 font-light">
              <p>Phone: +49 4532 - 975 82 30</p>
              <p>Fax: +49 4532 - 975 82 39</p>
            </div>

            <div className="border-t border-gray-800/80 my-5" />

            <div className="space-y-1.5 font-light">
              <p>
                E-Mail: <a href="mailto:info@victronic-gmbh.de" className="text-[#14b8a6] hover:underline transition-all">info@victronic-gmbh.de</a>
              </p>
              <p>
                Web: <a href="https://www.victronic-gmbh.de" target="_blank" rel="noopener noreferrer" className="text-[#14b8a6] hover:underline transition-all">www.victronic-gmbh.de</a>
              </p>
            </div>

            <div className="mt-8 space-y-2 text-xs font-light">
              <Link to="/impressum" className="text-[#14b8a6] hover:underline block transition-all">
                Impressum
              </Link>
              <Link to="/datenschutz" className="text-[#14b8a6] hover:underline block transition-all">
                Datenschutzerklärung
              </Link>
              <Link to="/inhalt-recht" className="text-[#14b8a6] hover:underline block transition-all">
                Inhalt / Recht
              </Link>
              <button 
                onClick={() => {
                  const trigger = (window as any).UC_UI;
                  if (trigger && typeof trigger.showSecondLayer === 'function') {
                    trigger.showSecondLayer();
                  } else {
                    alert("Cookie-Einstellungen können über Ihren Browser verwaltet werden.");
                  }
                }} 
                className="text-[#14b8a6] hover:underline block text-left transition-all"
              >
                Cookie-Einstellungen
              </button>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
