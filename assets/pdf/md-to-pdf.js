#!/usr/bin/env node
/**
 * md-to-pdf wrapper — bypasses the CLI's get-stdin hang.
 *
 * Usage: node md-to-pdf.js <input.md> [--stylesheet <path>]
 *
 * The md-to-pdf CLI calls `await getStdin()` before processing file
 * arguments. In non-piped terminal environments (like Antigravity IDE),
 * get-stdin waits forever for an EOF that never arrives. This wrapper
 * calls the library API directly, skipping the CLI entirely.
 */

const fs = require('fs');
const path = require('path');

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  let inputFile = null;
  let stylesheetPath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--stylesheet' && args[i + 1]) {
      stylesheetPath = args[++i];
    } else if (!args[i].startsWith('--')) {
      inputFile = args[i];
    }
  }

  if (!inputFile) {
    console.error('Usage: node md-to-pdf.js <input.md> [--stylesheet <path>]');
    process.exit(1);
  }

  // Resolve paths
  inputFile = path.resolve(inputFile);
  if (!fs.existsSync(inputFile)) {
    console.error(`File not found: ${inputFile}`);
    process.exit(1);
  }

  // Load the md-to-pdf library (from npx cache or local)
  let mdToPdf;
  try {
    ({ mdToPdf } = require('md-to-pdf'));
  } catch {
    // Fallback: search the npx cache
    const cacheRoot = path.join(
      process.env.npm_config_cache || path.join(process.env.LOCALAPPDATA || '', 'npm-cache'),
      '_npx'
    );
    const dirs = fs.readdirSync(cacheRoot);
    for (const dir of dirs) {
      const candidate = path.join(cacheRoot, dir, 'node_modules', 'md-to-pdf');
      if (fs.existsSync(candidate)) {
        ({ mdToPdf } = require(candidate));
        break;
      }
    }
    if (!mdToPdf) {
      console.error('Could not find md-to-pdf. Run: npx -y md-to-pdf --version');
      process.exit(1);
    }
  }

  // Build config
  const config = {
    launch_options: { headless: 'new', args: ['--no-sandbox', '--disable-gpu'] },
  };

  if (stylesheetPath) {
    stylesheetPath = path.resolve(stylesheetPath);
    if (!fs.existsSync(stylesheetPath)) {
      console.error(`Stylesheet not found: ${stylesheetPath}`);
      process.exit(1);
    }
    config.stylesheet = [stylesheetPath];
  }

  // Convert
  console.log(`Converting: ${inputFile}`);
  const start = Date.now();

  const pdf = await mdToPdf({ path: inputFile }, config);

  if (!pdf || !pdf.content) {
    console.error('Conversion failed: no PDF output generated.');
    process.exit(1);
  }

  // Write output
  const outputFile = inputFile.replace(/\.md$/i, '.pdf');
  fs.writeFileSync(outputFile, pdf.content);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`Done in ${elapsed}s: ${outputFile} (${pdf.content.length} bytes)`);
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
