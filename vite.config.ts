import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// Hinweis: Es gibt bewusst keinen `define`-Block mehr fuer Env-Variablen.
// Alles unter `define` landet 1:1 im oeffentlichen Client-Bundle. Diese Seite
// ist rein statisch (kein Backend, keine Secrets noetig) - falls jemals eine
// echte API-Anbindung dazukommt, gehoert ein Key niemals ins Frontend-Bundle,
// sondern in eine serverseitige Function/Proxy.
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
