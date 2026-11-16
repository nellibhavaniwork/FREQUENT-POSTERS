import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import fs from 'fs';

async function buildCSS() {
  const css = fs.readFileSync('src/app/globals.css', 'utf-8');
  const result = await postcss([tailwind]).process(css, { from: 'src/app/globals.css' });
  fs.writeFileSync('public/styles.css', result.css, 'utf-8');
  console.log('✓ Compiled Tailwind CSS to public/styles.css (', result.css.length, 'bytes)');
}

buildCSS();

