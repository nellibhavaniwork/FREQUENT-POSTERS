import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'clients');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Christiva Ministries
// Concept: Elegant cross intersecting with a dove/flame, royal blue & gold foil styling
const christiva = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- Brand Icon -->
    <circle cx="40" cy="40" r="38" fill="url(#chr_grad)" />
    <!-- Cross & Wings motif -->
    <path d="M40 18V62M27 32H53" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 45C26 52 33 56 40 56C47 56 54 52 58 45" stroke="#FDE047" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Wordmark -->
    <text x="96" y="44" font-family="'Manrope', 'Plus Jakarta Sans', system-ui, sans-serif" font-size="24" font-weight="900" fill="#071957" letter-spacing="-0.5">CHRISTIVA</text>
    <text x="97" y="62" font-family="'Inter', system-ui, sans-serif" font-size="9" font-weight="800" fill="#2855CE" letter-spacing="3.5">MINISTRIES</text>
  </g>
  <defs>
    <linearGradient id="chr_grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1E3A8A"/>
      <stop offset="1" stop-color="#2563EB"/>
    </linearGradient>
  </defs>
</svg>`;

// 2. i-Leaf Doors & Windows
// Concept: Modern architectural steel door frame with a vibrant green leaf silhouette accent
const ileaf = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- Door Emblem -->
    <rect x="8" y="10" width="60" height="60" rx="8" fill="#047857"/>
    <!-- Inner Door Panels -->
    <rect x="15" y="17" width="20" height="21" rx="3" fill="#FFFFFF" fill-opacity="0.2"/>
    <rect x="39" y="17" width="22" height="21" rx="3" fill="#FFFFFF" fill-opacity="0.2"/>
    <rect x="15" y="42" width="20" height="21" rx="3" fill="#FFFFFF" fill-opacity="0.2"/>
    <rect x="39" y="42" width="22" height="21" rx="3" fill="#FFFFFF" fill-opacity="0.2"/>
    <!-- Leaf curve accent -->
    <path d="M49 14C49 14 62 18 62 30C62 30 50 32 49 14Z" fill="#34D399"/>
    <!-- Wordmark -->
    <text x="82" y="44" font-family="'Manrope', system-ui, sans-serif" font-size="28" font-weight="900" fill="#064E3B" letter-spacing="-0.5">i-LEAF</text>
    <text x="83" y="62" font-family="'Inter', system-ui, sans-serif" font-size="9" font-weight="800" fill="#059669" letter-spacing="2.5">DOORS &amp; WINDOWS</text>
  </g>
</svg>`;

// 3. Kernel Masters
// Concept: Linux terminal prompt '>_' combined with a silicon microchip / CPU core symbol
const kernelmasters = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- Chip Base -->
    <rect x="6" y="12" width="56" height="56" rx="10" fill="#0F172A"/>
    <!-- Chip Pins -->
    <rect x="18" y="6" width="6" height="6" rx="1" fill="#38BDF8"/>
    <rect x="30" y="6" width="6" height="6" rx="1" fill="#38BDF8"/>
    <rect x="42" y="6" width="6" height="6" rx="1" fill="#38BDF8"/>
    <rect x="18" y="68" width="6" height="6" rx="1" fill="#38BDF8"/>
    <rect x="30" y="68" width="6" height="6" rx="1" fill="#38BDF8"/>
    <rect x="42" y="68" width="6" height="6" rx="1" fill="#38BDF8"/>
    <!-- Prompt terminal inside chip -->
    <path d="M22 34L32 40L22 46" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="36" y1="46" x2="46" y2="46" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
    <!-- Wordmark -->
    <text x="76" y="43" font-family="'Manrope', system-ui, sans-serif" font-size="22" font-weight="900" fill="#0F172A" letter-spacing="-0.5">KERNEL</text>
    <text x="172" y="43" font-family="'Manrope', system-ui, sans-serif" font-size="22" font-weight="800" fill="#0284C7" letter-spacing="-0.5">MASTERS</text>
    <text x="78" y="61" font-family="'Inter', system-ui, sans-serif" font-size="8.5" font-weight="800" fill="#64748B" letter-spacing="2.5">LINUX &amp; EMBEDDED ACADEMY</text>
  </g>
</svg>`;

// 4. Golden Eye Security
// Concept: Iconic security shield enclosing a sharp gold eagle/aperture eye
const goldeneye = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- Security Shield -->
    <path d="M38 10L68 21V43C68 57 55 68 38 73C21 68 8 57 8 43V21L38 10Z" fill="url(#gold_grad)"/>
    <!-- Eye Shape inside Shield -->
    <path d="M22 41C22 41 29 30 38 30C47 30 54 41 54 41C54 41 47 52 38 52C29 52 22 41 22 41Z" fill="#0B132B"/>
    <circle cx="38" cy="41" r="5" fill="#FBBF24"/>
    <circle cx="39.5" cy="39.5" r="1.5" fill="#FFFFFF"/>
    <!-- Wordmark -->
    <text x="82" y="43" font-family="'Manrope', system-ui, sans-serif" font-size="22" font-weight="900" fill="#0F172A" letter-spacing="-0.5">GOLDEN EYE</text>
    <text x="84" y="61" font-family="'Inter', system-ui, sans-serif" font-size="8.5" font-weight="800" fill="#B45309" letter-spacing="3">SECURITY SYSTEMS</text>
  </g>
  <defs>
    <linearGradient id="gold_grad" x1="8" y1="10" x2="68" y2="73" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F59E0B"/>
      <stop offset="1" stop-color="#D97706"/>
    </linearGradient>
  </defs>
</svg>`;

// 5. Sri Durga Ladies Tailor
// Concept: Luxury haute couture boutique emblem, rose-gold needle & scissors monogram with floral crest
const sridurga = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- Designer Emblem Circle -->
    <circle cx="38" cy="40" r="34" fill="#FDF2F8" stroke="#DB2777" stroke-width="2"/>
    <!-- Scissors / Stitch motif -->
    <path d="M28 48C30 48 32 46 32 44C32 42 30 40 28 40C26 40 24 42 24 44C24 46 26 48 28 48Z" stroke="#BE185D" stroke-width="2.5"/>
    <path d="M48 48C50 48 52 46 52 44C52 42 50 40 48 40C46 40 44 42 44 44C44 46 46 48 48 48Z" stroke="#BE185D" stroke-width="2.5"/>
    <path d="M30 41L45 27M46 41L31 27" stroke="#BE185D" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="38" cy="34" r="2.5" fill="#F43F5E"/>
    <!-- Wordmark -->
    <text x="86" y="42" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="900" fill="#831843" letter-spacing="0.5">SRI DURGA</text>
    <text x="87" y="60" font-family="'Inter', system-ui, sans-serif" font-size="9" font-weight="800" fill="#DB2777" letter-spacing="3.5">LADIES TAILOR</text>
  </g>
</svg>`;

// 6. Swift Digitals
// Concept: Dynamic cyan & royal blue forward chevron / printing speed bolt with CMYK dots
const swiftdigitals = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- Modern Dynamic Icon -->
    <path d="M12 18L38 18L26 42L48 42L18 72L26 48L12 48L12 18Z" fill="url(#swift_grad)"/>
    <!-- CMYK Accent Dots -->
    <circle cx="56" cy="22" r="3.5" fill="#06B6D4"/>
    <circle cx="56" cy="34" r="3.5" fill="#EC4899"/>
    <circle cx="56" cy="46" r="3.5" fill="#EAB308"/>
    <circle cx="56" cy="58" r="3.5" fill="#1E293B"/>
    <!-- Wordmark -->
    <text x="74" y="43" font-family="'Manrope', system-ui, sans-serif" font-size="26" font-weight="900" fill="#1E3A8A" letter-spacing="-0.5">SWIFT</text>
    <text x="162" y="43" font-family="'Manrope', system-ui, sans-serif" font-size="26" font-weight="700" fill="#0284C7" letter-spacing="-0.5">DIGITALS</text>
    <text x="76" y="61" font-family="'Inter', system-ui, sans-serif" font-size="9" font-weight="800" fill="#64748B" letter-spacing="2.5">PRINT &amp; BRAND SOLUTIONS</text>
  </g>
  <defs>
    <linearGradient id="swift_grad" x1="12" y1="18" x2="48" y2="72" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2563EB"/>
      <stop offset="1" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
</svg>`;

// 7. Newline Show Production LLP
// Concept: Live concert spotlights, stage waveform beam in purple & violet
const newline = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- Stage emblem -->
    <rect x="8" y="10" width="58" height="58" rx="14" fill="url(#nl_grad)"/>
    <!-- Stage production light beam icon -->
    <path d="M22 47L37 25L52 47H22Z" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="37" cy="38" r="4" fill="#38BDF8"/>
    <path d="M18 55H56" stroke="#C084FC" stroke-width="3" stroke-linecap="round"/>
    <!-- Wordmark -->
    <text x="78" y="42" font-family="'Manrope', system-ui, sans-serif" font-size="24" font-weight="900" fill="#4C1D95" letter-spacing="-0.5">NEWLINE</text>
    <text x="79" y="60" font-family="'Inter', system-ui, sans-serif" font-size="9" font-weight="800" fill="#7C3AED" letter-spacing="2.5">SHOW PRODUCTION LLP</text>
  </g>
  <defs>
    <linearGradient id="nl_grad" x1="8" y1="10" x2="66" y2="68" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6D28D9"/>
      <stop offset="1" stop-color="#4F46E5"/>
    </linearGradient>
  </defs>
</svg>`;

// 8. Traditions Event Management & Marketing
// Concept: Luxury celebratory ribbon/star motif with rich sunset orange/maroon tones
const traditions = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- Emblem -->
    <circle cx="38" cy="40" r="34" fill="url(#tr_grad)"/>
    <!-- 8-point celebration star -->
    <path d="M38 18L42 32L56 32L45 40L49 54L38 45L27 54L31 40L20 32L34 32Z" fill="#FEF08A"/>
    <!-- Wordmark -->
    <text x="86" y="42" font-family="'Manrope', system-ui, sans-serif" font-size="22" font-weight="900" fill="#7C2D12" letter-spacing="0.5">TRADITIONS</text>
    <text x="87" y="60" font-family="'Inter', system-ui, sans-serif" font-size="8" font-weight="800" fill="#EA580C" letter-spacing="2.5">EVENTS &amp; MARKETING</text>
  </g>
  <defs>
    <linearGradient id="tr_grad" x1="4" y1="6" x2="72" y2="74" gradientUnits="userSpaceOnUse">
      <stop stop-color="#EA580C"/>
      <stop offset="1" stop-color="#C2410C"/>
    </linearGradient>
  </defs>
</svg>`;

// 9. Ekranfix
// Concept: Precision electronic display / screen with neon repair pulse in azure blue
const ekranfix = `<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- TV / Screen monitor frame -->
    <rect x="8" y="14" width="60" height="44" rx="6" fill="#0C4A6E" stroke="#0284C7" stroke-width="2"/>
    <!-- Stand -->
    <path d="M30 58H46M38 58V66M28 66H48" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Display pulse / check fix line -->
    <path d="M16 36L26 36L31 26L38 46L44 33L49 36L60 36" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Wordmark -->
    <text x="82" y="44" font-family="'Manrope', system-ui, sans-serif" font-size="26" font-weight="900" fill="#0C4A6E" letter-spacing="-0.5">EKRAN<tspan fill="#0284C7">FIX</tspan></text>
    <text x="84" y="62" font-family="'Inter', system-ui, sans-serif" font-size="8.5" font-weight="800" fill="#0369A1" letter-spacing="3">DISPLAY &amp; TECH SOLUTIONS</text>
  </g>
</svg>`;

const logos = {
  'christiva.svg': christiva,
  'ileaf.svg': ileaf,
  'kernelmasters.svg': kernelmasters,
  'goldeneye.svg': goldeneye,
  'sridurga.svg': sridurga,
  'swiftdigitals.svg': swiftdigitals,
  'newline.svg': newline,
  'traditions.svg': traditions,
  'ekranfix.svg': ekranfix,
};

for (const [filename, svg] of Object.entries(logos)) {
  fs.writeFileSync(path.join(outDir, filename), svg);
}

console.log('All 9 authentic professional logos generated in public/clients/');
