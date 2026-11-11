#!/usr/bin/env node

/**
 * ============================================================================
 * RashX (راش إكس) | Avatar Image Optimizer
 * ============================================================================
 * Converts full-resolution PNG animojis (1024x1024) into lightweight WebP
 * assets with alpha transparency preserved:
 *   - 256x256 WebP (quality 80) -> public/avatars/animoji-N.webp
 *   - 96x96 WebP (quality 80)  -> public/avatars/thumbs/animoji-N.webp
 *
 * Usage:
 *   node scripts/optimize-avatars.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const AVATARS_DIR = path.resolve(process.cwd(), 'public/avatars');
const THUMBS_DIR = path.resolve(AVATARS_DIR, 'thumbs');

async function optimizeAvatars() {
  if (!fs.existsSync(AVATARS_DIR)) {
    console.error(`❌ Avatars directory not found at ${AVATARS_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(THUMBS_DIR)) {
    fs.mkdirSync(THUMBS_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(AVATARS_DIR)
    .filter((file) => file.startsWith('animoji-') && file.endsWith('.png'));

  if (files.length === 0) {
    console.log('ℹ️ No PNG animojis found in public/avatars.');
    return;
  }

  console.log(`🖼️  Found ${files.length} PNG animojis to convert to WebP...`);

  let totalPngBytes = 0;
  let totalWebpBytes = 0;
  let totalThumbBytes = 0;

  let processedCount = 0;

  for (const file of files) {
    const pngPath = path.join(AVATARS_DIR, file);
    const pngStat = fs.statSync(pngPath);
    totalPngBytes += pngStat.size;

    const baseName = path.basename(file, '.png');
    const webpPath = path.join(AVATARS_DIR, `${baseName}.webp`);
    const thumbPath = path.join(THUMBS_DIR, `${baseName}.webp`);

    // 1. Generate 256x256 WebP
    await sharp(pngPath)
      .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 80, effort: 4 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    totalWebpBytes += webpStat.size;

    // 2. Generate 96x96 WebP thumb
    await sharp(pngPath)
      .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 80, effort: 4 })
      .toFile(thumbPath);

    const thumbStat = fs.statSync(thumbPath);
    totalThumbBytes += thumbStat.size;

    processedCount++;
    if (processedCount % 50 === 0 || processedCount === files.length) {
      process.stdout.write(`   Processed ${processedCount}/${files.length} animojis...\n`);
    }
  }

  const combinedWebpBytes = totalWebpBytes + totalThumbBytes;
  const reductionPct = (((totalPngBytes - combinedWebpBytes) / totalPngBytes) * 100).toFixed(2);

  const formatMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  const formatKB = (bytes) => (bytes / 1024).toFixed(1) + ' KB';

  console.log('\n============================================================');
  console.log('🎉 Avatar Optimization Completed!');
  console.log('============================================================');
  console.table({
    'Original PNGs (1024x1024)': {
      Count: files.length,
      TotalSize: formatMB(totalPngBytes),
      AvgPerImage: formatKB(totalPngBytes / files.length),
    },
    'WebP Main (256x256)': {
      Count: files.length,
      TotalSize: formatMB(totalWebpBytes),
      AvgPerImage: formatKB(totalWebpBytes / files.length),
    },
    'WebP Thumbs (96x96)': {
      Count: files.length,
      TotalSize: formatMB(totalThumbBytes),
      AvgPerImage: formatKB(totalThumbBytes / files.length),
    },
    'Total Optimized (Main + Thumbs)': {
      Count: files.length * 2,
      TotalSize: formatMB(combinedWebpBytes),
      AvgPerImage: formatKB(combinedWebpBytes / (files.length * 2)),
    },
  });

  console.log(`📉 Total payload reduced from ${formatMB(totalPngBytes)} to ${formatMB(combinedWebpBytes)} (${reductionPct}% reduction).`);
}

optimizeAvatars().catch((err) => {
  console.error('❌ Error optimizing avatars:', err);
  process.exit(1);
});

