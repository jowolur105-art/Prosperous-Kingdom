/**
 * rng.js — Seeded pseudo-random number generator (mulberry32) and utilities.
 */

/** Create a new random seed from crypto */
export function newSeed() {
  return crypto.getRandomValues(new Uint32Array(1))[0];
}

/**
 * Mulberry32 PRNG — returns a function that produces [0, 1) floats.
 * @param {number} seed - 32-bit unsigned integer seed
 * @returns {function(): number} next random float in [0, 1)
 */
export function mulberry32(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random integer in [min, max] inclusive, using provided PRNG */
export function randInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/** Random float in [min, max), using provided PRNG */
export function randFloat(rng, min, max) {
  return rng() * (max - min) + min;
}

/** Fisher–Yates shuffle (in-place) using provided PRNG */
export function shuffle(rng, arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Pick a random element from an array */
export function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}
