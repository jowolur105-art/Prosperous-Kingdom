/**
 * track.js — Random track generator.
 * Generates angel and hole positions for each group's run.
 */
import {
  SPEEDS, GRAVITY, JUMP_V,
  START_SAFE_MIN, START_SAFE_MAX,
  GAP_MIN, GAP_MAX,
  HOLE_MIN, HOLE_MAX,
  HOLE_WIDTH_FACTOR_MIN, HOLE_WIDTH_FACTOR_MAX,
  FINISH_PADDING_MIN, FINISH_PADDING_MAX,
  ANGEL_HOLE_MIN_DIST, ANGEL_BLOCK_DIST,
  ANGEL_FLOAT_MIN, ANGEL_FLOAT_MAX,
  ANGEL_PASTEL_COLORS,
  MAX_GENERATION_ATTEMPTS, GAP_MIN_RELAX,
} from './data/config.js';
import { newSeed, mulberry32, randInt, randFloat, shuffle, pick } from './rng.js';

/**
 * Calculate maximum jump distance for given speed.
 * jumpDist = speed * (2 * JUMP_V / GRAVITY)
 */
export function jumpDistance(speed) {
  return speed * (2 * JUMP_V / GRAVITY);
}

/**
 * Generate a random track.
 * @param {number} angelCount - number of angel encounters
 * @param {string} speedKey - 'pelan' | 'normal' | 'cepat'
 * @param {number} [forcedSeed] - optional seed for testing
 * @returns {{ seed, events, holes, angels, finishX, jumpDist }}
 */
export function generateTrack(angelCount, speedKey = 'normal', forcedSeed) {
  const speed = SPEEDS[speedKey] || SPEEDS.normal;
  const jDist = jumpDistance(speed);
  const seed = forcedSeed ?? newSeed();

  let gapMin = GAP_MIN;
  let attempts = 0;

  while (attempts < MAX_GENERATION_ATTEMPTS * 2) {
    const result = _tryGenerate(seed, angelCount, jDist, gapMin);
    if (result) {
      result.seed = seed;
      result.jumpDist = jDist;
      return result;
    }

    attempts++;
    // After MAX_GENERATION_ATTEMPTS, relax gap
    if (attempts >= MAX_GENERATION_ATTEMPTS && attempts % MAX_GENERATION_ATTEMPTS === 0) {
      gapMin = Math.max(400, gapMin - GAP_MIN_RELAX);
    }
  }

  // Fallback: should never happen with relaxed constraints
  throw new Error(`Track generation failed after ${attempts} attempts`);
}

/**
 * Internal: attempt to generate a valid track.
 * Returns null if validation fails.
 */
function _tryGenerate(seed, angelCount, jDist, gapMin) {
  const rng = mulberry32(seed + _tryGenerate._callCount++);
  const holeCount = randInt(rng, HOLE_MIN, HOLE_MAX);

  // Build event list and shuffle
  const events = [
    ...Array(angelCount).fill('angel'),
    ...Array(holeCount).fill('hole'),
  ];
  shuffle(rng, events);

  // Place events along the track
  let x = randInt(rng, START_SAFE_MIN, START_SAFE_MAX);
  const holes = [];
  const angels = [];

  for (const type of events) {
    x += randInt(rng, gapMin, GAP_MAX);

    if (type === 'hole') {
      const width = Math.round(jDist * randFloat(rng, HOLE_WIDTH_FACTOR_MIN, HOLE_WIDTH_FACTOR_MAX));
      holes.push({ x, width });
      x += width;
    } else {
      const floatH = randInt(rng, ANGEL_FLOAT_MIN, ANGEL_FLOAT_MAX);
      const color = pick(rng, ANGEL_PASTEL_COLORS);
      const wingVariant = rng() > 0.5 ? 1 : 0;
      const sizeFactor = randFloat(rng, 0.9, 1.1);
      angels.push({ x, floatH, color, wingVariant, sizeFactor });
    }
  }

  const finishX = x + randInt(rng, FINISH_PADDING_MIN, FINISH_PADDING_MAX);

  // === Validate invariants (spec 5.4) ===

  // 1. All holes jumpable
  for (const h of holes) {
    if (h.width > jDist * HOLE_WIDTH_FACTOR_MAX) return null;
  }

  // 2. Angel encounter point vs hole edge distance
  for (const a of angels) {
    const encounterX = a.x - ANGEL_BLOCK_DIST;
    for (const h of holes) {
      const holeLeft = h.x;
      const holeRight = h.x + h.width;
      const distToLeft = Math.abs(encounterX - holeLeft);
      const distToRight = Math.abs(encounterX - holeRight);
      if (Math.min(distToLeft, distToRight) < ANGEL_HOLE_MIN_DIST) return null;
    }
  }

  // 3. Minimum inter-event distance
  const allPositions = events.map((_, i) => {
    let pos = 0;
    const holeIdx = holes.findIndex(h => true); // recalculate below
    return 0; // will be validated differently
  });

  // Re-check inter-event distances using actual positions
  const eventPositions = [];
  for (const a of angels) eventPositions.push(a.x);
  for (const h of holes) eventPositions.push(h.x);
  eventPositions.sort((a, b) => a - b);

  for (let i = 1; i < eventPositions.length; i++) {
    if (eventPositions[i] - eventPositions[i - 1] < gapMin) return null;
  }

  return {
    events: events.slice(), // copy
    holes,
    angels,
    finishX,
    holeCount,
    angelCount,
  };
}
_tryGenerate._callCount = 0;

/**
 * Compute a track "signature" for uniqueness testing.
 * Signature = concatenation of [type, round(x), round(width)] for each event.
 */
export function trackSignature(track) {
  const parts = [];
  let angelIdx = 0;
  let holeIdx = 0;
  for (const type of track.events) {
    if (type === 'angel') {
      const a = track.angels[angelIdx++];
      parts.push(`a:${Math.round(a.x)}`);
    } else {
      const h = track.holes[holeIdx++];
      parts.push(`h:${Math.round(h.x)}:${Math.round(h.width)}`);
    }
  }
  return parts.join('|');
}
