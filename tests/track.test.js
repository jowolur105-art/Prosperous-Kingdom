/**
 * tests/track.test.js
 * Node-executable test for track generator (spec section 5.6)
 * Run: node tests/track.test.js
 */
import { generateTrack, trackSignature, jumpDistance } from '../js/track.js';
import {
  SPEEDS,
  GAP_MIN,
  HOLE_MIN,
  HOLE_MAX,
  HOLE_WIDTH_FACTOR_MAX,
  ANGEL_HOLE_MIN_DIST,
  ANGEL_BLOCK_DIST,
  START_SAFE_MIN,
} from '../js/data/config.js';

console.log('--- Menjalankan Uji Generator Lintasan (1000 Lintasan) ---');

const TOTAL_RUNS = 1000;
const signatures = new Set();
let previousSig = null;
let consecutiveDuplicateCount = 0;
let invariantFailures = 0;

const groupCounts = [2, 3, 4, 5, 6];
const speedKeys = ['pelan', 'normal', 'cepat'];

for (let i = 0; i < TOTAL_RUNS; i++) {
  // Test across realistic group counts and speeds
  const groupCount = groupCounts[i % groupCounts.length];
  const angelCount = Math.floor(10 / groupCount);
  const speedKey = speedKeys[i % speedKeys.length];

  let track;
  try {
    track = generateTrack(angelCount, speedKey);
  } catch (err) {
    console.error(`Gagal menghasilkan lintasan pada iterasi ${i}:`, err);
    invariantFailures++;
    continue;
  }

  const sig = trackSignature(track);

  // Check consecutive duplicate
  if (previousSig !== null && sig === previousSig) {
    consecutiveDuplicateCount++;
  }
  previousSig = sig;
  signatures.add(sig);

  // Validate invariants
  const speed = SPEEDS[speedKey];
  const jDist = jumpDistance(speed);

  // 1. Hole count invariant
  if (track.holes.length < HOLE_MIN || track.holes.length > HOLE_MAX) {
    console.error(`[Iterasi ${i}] Jumlah lubang (${track.holes.length}) di luar batas [${HOLE_MIN}, ${HOLE_MAX}]`);
    invariantFailures++;
  }

  // 2. Angel count invariant
  if (track.angels.length !== angelCount) {
    console.error(`[Iterasi ${i}] Jumlah malaikat (${track.angels.length}) != expected (${angelCount})`);
    invariantFailures++;
  }

  // 3. Jumpable holes
  for (const h of track.holes) {
    if (h.width > jDist * HOLE_WIDTH_FACTOR_MAX) {
      console.error(`[Iterasi ${i}] Lubang terlalu lebar: ${h.width} > max ${jDist * HOLE_WIDTH_FACTOR_MAX}`);
      invariantFailures++;
    }
    if (h.x < START_SAFE_MIN) {
      console.error(`[Iterasi ${i}] Lubang muncul di area aman awal: ${h.x} < ${START_SAFE_MIN}`);
      invariantFailures++;
    }
  }

  // 4. Angel encounter vs hole distance
  for (const a of track.angels) {
    const encounterX = a.x - ANGEL_BLOCK_DIST;
    for (const h of track.holes) {
      const distLeft = Math.abs(encounterX - h.x);
      const distRight = Math.abs(encounterX - (h.x + h.width));
      const minDist = Math.min(distLeft, distRight);
      if (minDist < ANGEL_HOLE_MIN_DIST) {
        console.error(`[Iterasi ${i}] Jarak malaikat ke lubang terlalu dekat: ${minDist} < ${ANGEL_HOLE_MIN_DIST}`);
        invariantFailures++;
      }
    }
  }

  // 5. Inter-event spacing
  const positions = [];
  for (const a of track.angels) positions.push(a.x);
  for (const h of track.holes) positions.push(h.x);
  positions.sort((a, b) => a - b);

  for (let k = 1; k < positions.length; k++) {
    // Note: gap can be relaxed if needed, but should never be unreasonably small
    if (positions[k] - positions[k - 1] < 400) {
      console.error(`[Iterasi ${i}] Jarak antarkejadian terlalu sempit: ${positions[k] - positions[k - 1]}`);
      invariantFailures++;
    }
  }

  // 6. Finish position
  const maxEventX = positions[positions.length - 1];
  if (track.finishX <= maxEventX) {
    console.error(`[Iterasi ${i}] Garis finis (${track.finishX}) tidak di belakang kejadian terakhir (${maxEventX})`);
    invariantFailures++;
  }
}

const uniquenessPercent = ((signatures.size / TOTAL_RUNS) * 100).toFixed(2);

console.log(`\nHasil Pengujian Track Generator:`);
console.log(`- Total lintasan diuji: ${TOTAL_RUNS}`);
console.log(`- Tanda tangan unik: ${signatures.size} / ${TOTAL_RUNS} (${uniquenessPercent}%)`);
console.log(`- Duplikat berurutan: ${consecutiveDuplicateCount}`);
console.log(`- Pelanggaran invarian: ${invariantFailures}`);

let passed = true;
if (invariantFailures > 0) {
  console.error('❌ GAGAL: Ada pelanggaran invarian!');
  passed = false;
}
if (signatures.size / TOTAL_RUNS < 0.999) {
  console.error(`❌ GAGAL: Keunikan (${uniquenessPercent}%) kurang dari syarat 99.9%!`);
  passed = false;
}
if (consecutiveDuplicateCount > 0) {
  console.error('❌ GAGAL: Ada lintasan berurutan yang identik!');
  passed = false;
}

if (passed) {
  console.log('✅ SEMUA PENGUJIAN LINTASAN LULUS (100% Invarian Terpenuhi & Unik)!');
  process.exit(0);
} else {
  process.exit(1);
}
