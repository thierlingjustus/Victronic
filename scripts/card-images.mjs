/**
 * Erzeugt die Hover-Bilder der Produkt- und Systemkarten
 * (src/assets/products/cards, siehe src/components/CardPhoto.tsx).
 *
 * Je Quellfoto: Produkt erkennen, Studio-Hintergrund samt Lichtflecken auf den
 * Ton --color-studio (#e2e3e5) ebnen, eng zuschneiden, auf reines Weiß
 * normieren und zum Rand hin weiß auslaufen lassen. Die Karte legt das Bild
 * per mix-blend-multiply über den Ton – Weiß wird dort exakt zum Ton.
 *
 * Aufruf aus dem Repo-Stamm (sharp ist keine Projekt-Abhängigkeit):
 *   npm i --no-save sharp
 *   node scripts/card-images.mjs [Pfad/zum/netzteil-rendering.png]
 *
 * Das Netzteil hat kein Foto: Quelle ist ein three.js-Rendering von
 * Information/Stromversorgungen/netzteil.glb auf flachem #e2e3e5 (Kamera
 * Azimut 35°, Elevation 24°). Ohne Pfad wird es übersprungen.
 */
import sharp from 'sharp';
const P = 'src/assets/products';
const OUT = `${P}/cards`;
const NETZTEIL = process.argv[2];
const TONE = [226, 227, 229]; // --color-studio in src/index.css
const ITEMS = [
  ['tft-displays', `${P}/tft-displays/tft-panel-front.jpg`],
  ['lcm-lcd-module', `${P}/lcm-lcd-module/cob-module.jpg`],
  ['touchscreens', `${P}/touchscreens/pcap-sensor.jpg`],
  ['stromversorgungen', NETZTEIL],
  ['luefter', `${P}/luefter/axial-fan.jpg`],
  ['kunststoffkomponenten', `${P}/kunststoffkomponenten/housing-interior.jpg`],
  ['glasloesungen', `${P}/glasloesungen/cover-glass-cutout.jpg`],
  ['montage-gehaeuse', `${P}/montage-gehaeuse/box-build-module.jpg`],
  ['system-tft-touch', `${P}/touchscreens/ogs-panel.jpg`],
].filter(([, file]) => file);

// Quadratischer Hintergrund-Fit je Kanal (kleinste Quadrate, 6 Koeffizienten).
function fit(samples) {
  const A = Array.from({ length: 6 }, () => new Float64Array(6));
  const b = [new Float64Array(6), new Float64Array(6), new Float64Array(6)];
  for (const [u, v, c] of samples) {
    const f = [1, u, v, u * u, u * v, v * v];
    for (let i = 0; i < 6; i++) { for (let j = 0; j < 6; j++) A[i][j] += f[i] * f[j]; for (let k = 0; k < 3; k++) b[k][i] += f[i] * c[k]; }
  }
  return b.map((bk) => solve(A.map((r) => Float64Array.from(r)), Float64Array.from(bk)));
}
function solve(A, b) {
  const n = b.length;
  for (let i = 0; i < n; i++) {
    let m = i; for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[m][i])) m = r;
    [A[i], A[m]] = [A[m], A[i]]; [b[i], b[m]] = [b[m], b[i]];
    for (let r = i + 1; r < n; r++) { const f = A[r][i] / A[i][i]; for (let c = i; c < n; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; }
  }
  const x = new Float64Array(n);
  for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let c = i + 1; c < n; c++) s -= A[i][c] * x[c]; x[i] = s / A[i][i]; }
  return x;
}
const evalBg = (co, u, v) => co.map((c) => c[0] + c[1] * u + c[2] * v + c[3] * u * u + c[4] * u * v + c[5] * v * v);
const smooth = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

for (const [name, file] of ITEMS) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const px = (x, y) => { const i = (y * W + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
  let mask = null, co;
  for (let pass = 0; pass < 3; pass++) {
    const samples = [];
    for (let y = 0; y < H; y += 6) for (let x = 0; x < W; x += 6) {
      const border = x < W * 0.1 || x > W * 0.9 || y < H * 0.1 || y > H * 0.9;
      if (mask ? !mask[y * W + x] : border) samples.push([x / W, y / H, px(x, y)]);
    }
    co = fit(samples);
    mask = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const p = px(x, y), g = evalBg(co, x / W, y / H);
      if (Math.max(Math.abs(p[0] - g[0]), Math.abs(p[1] - g[1]), Math.abs(p[2] - g[2])) > 16) mask[y * W + x] = 1;
    }
    // Maske etwas aufweiten, damit Kanten und Schatten nicht in den Fit gehen.
    const grown = mask.slice(); const R = 10;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (mask[y * W + x])
      for (let dy = -R; dy <= R; dy += 5) for (let dx = -R; dx <= R; dx += 5) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H) grown[yy * W + xx] = 1; }
    mask = grown;
  }
  // Begrenzungsrahmen über Zeilen/Spalten mit genug Treffern (ohne Rauschen).
  const rows = new Uint32Array(H), cols = new Uint32Array(W);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (mask[y * W + x]) { rows[y]++; cols[x]++; }
  const minHit = 14;
  let y0 = rows.findIndex((c) => c > minHit), y1 = H - 1 - [...rows].reverse().findIndex((c) => c > minHit);
  let x0 = cols.findIndex((c) => c > minHit), x1 = W - 1 - [...cols].reverse().findIndex((c) => c > minHit);
  const bw = x1 - x0, bh = y1 - y0;
  const m = Math.round(Math.max(bw, bh) * 0.1) + 16;
  const cx0 = Math.max(0, x0 - m), cy0 = Math.max(0, y0 - m), cx1 = Math.min(W, x1 + m), cy1 = Math.min(H, y1 + m);
  const cw = cx1 - cx0, ch = cy1 - cy0;
  // 1) Grob ebnen mit dem globalen Fit.
  const flat = new Float32Array(cw * ch * 3);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const sx = cx0 + x, sy = cy0 + y, p = px(sx, sy), g = evalBg(co, sx / W, sy / H);
    for (let k = 0; k < 3; k++) flat[(y * cw + x) * 3 + k] = (p[k] * TONE[k]) / g[k];
  }
  // 2) Lokale Lichtflecken ausgleichen: Restabweichung des Hintergrunds auf
  //    einem Raster sammeln (nur Hintergrund-Pixel), per normierter
  //    Gauß-Faltung glätten und über das Produkt hinweg interpolieren.
  const C = 8, gw = Math.ceil(cw / C), gh = Math.ceil(ch / C);
  const sum = new Float64Array(gw * gh * 3), wsum = new Float64Array(gw * gh);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    if (mask[(cy0 + y) * W + cx0 + x]) continue;
    const c = Math.floor(y / C) * gw + Math.floor(x / C);
    for (let k = 0; k < 3; k++) sum[c * 3 + k] += TONE[k] / Math.max(1, flat[(y * cw + x) * 3 + k]);
    wsum[c]++;
  }
  const sigma = 5, R = sigma * 3, kern = [];
  for (let i = -R; i <= R; i++) kern.push(Math.exp(-(i * i) / (2 * sigma * sigma)));
  const blur = (arr, n) => {
    const tmp = new Float64Array(arr.length), res = new Float64Array(arr.length);
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) for (let k = 0; k < n; k++) {
      let s = 0; for (let i = -R; i <= R; i++) { const xx = x + i; if (xx >= 0 && xx < gw) s += arr[(y * gw + xx) * n + k] * kern[i + R]; }
      tmp[(y * gw + x) * n + k] = s;
    }
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) for (let k = 0; k < n; k++) {
      let s = 0; for (let i = -R; i <= R; i++) { const yy = y + i; if (yy >= 0 && yy < gh) s += tmp[(yy * gw + x) * n + k] * kern[i + R]; }
      res[(y * gw + x) * n + k] = s;
    }
    return res;
  };
  const bs = blur(sum, 3), bw2 = blur(wsum, 1);
  const q = (gx, gy, k) => { const c = gy * gw + gx; return bw2[c] > 1e-6 ? bs[c * 3 + k] / bw2[c] : 1; };
  const out = Buffer.alloc(cw * ch * 4);
  const f = m * 0.9;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const gx = Math.min(gw - 1, Math.max(0, x / C - 0.5)), gy = Math.min(gh - 1, Math.max(0, y / C - 0.5));
    const x0g = Math.floor(gx), y0g = Math.floor(gy), x1g = Math.min(gw - 1, x0g + 1), y1g = Math.min(gh - 1, y0g + 1), tx = gx - x0g, ty = gy - y0g;
    const o = (y * cw + x) * 4;
    for (let k = 0; k < 3; k++) {
      const qq = (q(x0g, y0g, k) * (1 - tx) + q(x1g, y0g, k) * tx) * (1 - ty) + (q(x0g, y1g, k) * (1 - tx) + q(x1g, y1g, k) * tx) * ty;
      const v = flat[(y * cw + x) * 3 + k] * qq;
      out[o + k] = Math.max(0, Math.min(255, Math.round(v)));
    }
    // Auf Weiß normieren und zum Rand hin in reines Weiß auslaufen lassen:
    // Die Karte legt das Bild per mix-blend-mode: multiply über den
    // Studio-Ton – Weiß ergibt dort exakt den Ton, also keine sichtbare Kante.
    const a = smooth(Math.min(x, cw - 1 - x, y, ch - 1 - y) / f);
    for (let k = 0; k < 3; k++) {
      const w = Math.min(255, (out[o + k] * 255) / TONE[k]);
      out[o + k] = Math.round(255 - (255 - w) * a);
    }
    out[o + 3] = 255;
  }
  // Kontrolle: mittlere Abweichung vom Studio-Ton je Rasterzelle (nur Hintergrund).
  let worst = 0;
  for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) {
    let s = 0, n = 0;
    for (let y = gy * C; y < Math.min(ch, gy * C + C); y++) for (let x = gx * C; x < Math.min(cw, gx * C + C); x++) {
      if (mask[(cy0 + y) * W + cx0 + x]) continue; const o = (y * cw + x) * 4; s += (out[o] + out[o + 1] + out[o + 2]) / 3 - (TONE[0] + TONE[1] + TONE[2]) / 3; n++;
    }
    if (n > C * C * 0.8) worst = Math.max(worst, Math.abs(s / n));
  }
  const longest = 560;
  const scale = Math.min(1, longest / Math.max(cw, ch));
  const res = await sharp(out, { raw: { width: cw, height: ch, channels: 4 } })
    .removeAlpha()
    .resize(Math.round(cw * scale), Math.round(ch * scale))
    .webp({ quality: 84, smartSubsample: true, effort: 6 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(name.padEnd(22), `bbox ${x0},${y0}-${x1},${y1}`, `crop ${cw}x${ch}`, `→ ${res.width}x${res.height}`, `${(res.size / 1024).toFixed(1)} KB`, `ratio ${(res.width / res.height).toFixed(2)}`, `max. Abw. Hintergrund ${worst.toFixed(1)}`);
}
