/**
 * Gemeinsame Datentypen für die Inhalts-Arrays (products.ts, systems.ts).
 * InfoSlot lag früher in systems.ts – die Produktseiten nutzen dieselbe Form
 * für ihre Fakten-Karten, deshalb liegt der Typ jetzt neutral hier.
 */
export interface InfoSlot {
  title: string;
  desc: string;
  align: string;
}
