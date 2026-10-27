/* =============================================================
   Vibefolio Route — small drawings for picture choices
   Each entry is SVG shapes inside a 120 × 80 box, keyed by the
   option id it illustrates (see the option lists in content.js).
   Shape classes (colors set in style.css → .art):
     a = light grey   b = step color   k = text color
     w = surface      s = dashed outline
   ============================================================= */

const PICTURES = {
  agent: `
    <circle class="s" cx="60" cy="40" r="26"/>
    <polygon class="b" points="60,24 64,36 76,40 64,44 60,56 56,44 44,40 56,36"/>`,

  /* layouts */
  cards: `
    <rect class="b" x="10" y="8" width="100" height="20" rx="2"/>
    <rect class="a" x="10" y="34" width="31" height="36" rx="3"/>
    <rect class="a" x="45" y="34" width="31" height="36" rx="3"/>
    <rect class="a" x="80" y="34" width="30" height="36" rx="3"/>`,
  editorial: `
    <rect class="k" x="28" y="10" width="64" height="9"/>
    <rect class="a" x="28" y="26" width="64" height="4"/>
    <rect class="a" x="28" y="34" width="60" height="4"/>
    <rect class="a" x="28" y="42" width="64" height="4"/>
    <rect class="a" x="28" y="50" width="56" height="4"/>
    <rect class="b" x="28" y="60" width="30" height="4"/>`,
  split: `
    <rect class="b" x="8" y="8" width="50" height="64" rx="3"/>
    <rect class="k" x="66" y="20" width="44" height="8"/>
    <rect class="a" x="66" y="34" width="40" height="4"/>
    <rect class="a" x="66" y="42" width="44" height="4"/>
    <rect class="a" x="66" y="50" width="34" height="4"/>`,
  magazine: `
    <rect class="b" x="8" y="8" width="66" height="38" rx="3"/>
    <rect class="a" x="80" y="8" width="32" height="18" rx="2"/>
    <rect class="a" x="80" y="30" width="32" height="16" rx="2"/>
    <rect class="a" x="8" y="52" width="32" height="20" rx="2"/>
    <rect class="a" x="44" y="52" width="30" height="20" rx="2"/>
    <rect class="a" x="80" y="52" width="32" height="20" rx="2"/>`,

  /* top of the page */
  text: `
    <rect class="k" x="12" y="18" width="96" height="12"/>
    <rect class="k" x="12" y="34" width="70" height="12"/>
    <rect class="b" x="12" y="54" width="40" height="5"/>`,
  portrait: `
    <circle class="b" cx="36" cy="40" r="20"/>
    <rect class="k" x="64" y="28" width="46" height="8"/>
    <rect class="a" x="64" y="42" width="40" height="4"/>
    <rect class="a" x="64" y="50" width="34" height="4"/>`,
  abstract: `
    <circle class="b" cx="34" cy="34" r="18"/>
    <rect class="a" x="44" y="38" width="30" height="30" rx="4" transform="rotate(15 59 53)"/>
    <polygon class="k" points="86,16 108,52 64,52" opacity=".75"/>`,
  image: `
    <rect class="a" x="10" y="10" width="100" height="60" rx="4"/>
    <circle class="w" cx="34" cy="30" r="7"/>
    <polygon class="b" points="20,64 50,38 70,56 82,46 104,64"/>`,

  /* light / dark (fixed colors on purpose) */
  light: `
    <rect x="14" y="10" width="92" height="60" rx="5" fill="#F7F7F2" stroke="#999"/>
    <rect x="24" y="22" width="50" height="7" fill="#222"/>
    <rect x="24" y="34" width="70" height="4" fill="#888"/>
    <rect x="24" y="42" width="60" height="4" fill="#888"/>`,
  dark: `
    <rect x="14" y="10" width="92" height="60" rx="5" fill="#16191C"/>
    <rect x="24" y="22" width="50" height="7" fill="#EEE"/>
    <rect x="24" y="34" width="70" height="4" fill="#888"/>
    <rect x="24" y="42" width="60" height="4" fill="#888"/>`,
  auto: `
    <rect x="14" y="10" width="46" height="60" rx="5" fill="#F7F7F2" stroke="#999"/>
    <rect x="60" y="10" width="46" height="60" rx="5" fill="#16191C"/>
    <rect x="22" y="22" width="30" height="6" fill="#222"/>
    <rect x="68" y="22" width="30" height="6" fill="#EEE"/>`,

  /* motion */
  none: `
    <rect class="b" x="45" y="25" width="30" height="30" rx="4"/>`,
  subtle: `
    <rect class="b" x="45" y="22" width="30" height="30" rx="4"/>
    <rect class="a" x="49" y="58" width="22" height="3" rx="1.5"/>
    <rect class="a" x="53" y="64" width="14" height="3" rx="1.5"/>`,
  expressive: `
    <rect class="b" x="30" y="24" width="26" height="26" rx="4" transform="rotate(-15 43 37)"/>
    <rect class="a" x="62" y="30" width="26" height="26" rx="4" transform="rotate(12 75 43)"/>
    <circle class="k" cx="96" cy="20" r="5"/>
    <circle class="k" cx="22" cy="62" r="3"/>`,
};

// Wraps a drawing in its SVG frame, or returns "" when an option has none.
function picture(id) {
  if (!PICTURES[id]) return "";
  return `<svg class="art" viewBox="0 0 120 80" aria-hidden="true">${PICTURES[id]}</svg>`;
}
