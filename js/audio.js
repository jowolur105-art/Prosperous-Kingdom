/**
 * audio.js — Medieval Adventure BGM & Web Audio API SFX.
 * Background Music plays continuously from Home Screen into active gameplay.
 */
import { BGM_ASSET } from './data/config.js';

let audioCtx = null;
let muted = false;
let volume = 0.6;
let bgmAudio = null;
let bgmVolume = 0.45;

/** Get or initialize background music instance */
export function getBgmAudio() {
  if (!bgmAudio && typeof Audio !== 'undefined') {
    bgmAudio = new Audio(BGM_ASSET);
    bgmAudio.loop = true;
    bgmAudio.volume = bgmVolume;
    bgmAudio.muted = muted;
    bgmAudio.preload = 'auto';
  }
  return bgmAudio;
}

/** Play background music across screens seamlessly */
export function playBGM() {
  const bgm = getBgmAudio();
  if (!bgm) return;
  bgm.muted = muted;
  if (bgm.paused) {
    const playPromise = bgm.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be restricted until first user gesture
      });
    }
  }
}

/** Pause background music */
export function pauseBGM() {
  if (bgmAudio) {
    bgmAudio.pause();
  }
}

/** Stop and rewind background music */
export function stopBGM() {
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
  }
}

/** Set BGM volume (0 to 1) */
export function setBgmVolume(v) {
  bgmVolume = Math.max(0, Math.min(1, v));
  if (bgmAudio) {
    bgmAudio.volume = bgmVolume;
  }
}

/** Initialise or resume AudioContext and BGM (call on user interaction) */
export function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  playBGM();
}

/** Set mute state */
export function setMuted(m) {
  muted = m;
  if (bgmAudio) bgmAudio.muted = muted;
}

export function isMuted() { return muted; }

export function toggleMute() {
  if (bgmAudio && bgmAudio.paused && !muted) {
    // If not muted but paused (e.g. autoplay was waiting for interaction), start playback!
    bgmAudio.play().catch(() => {});
    return false;
  }
  muted = !muted;
  if (bgmAudio) {
    bgmAudio.muted = muted;
    if (!muted && bgmAudio.paused) {
      bgmAudio.play().catch(() => {});
    }
  }
  return muted;
}

/** Set master SFX volume (0–1) */
export function setVolume(v) { volume = Math.max(0, Math.min(1, v)); }
export function getVolume() { return volume; }

// Autoplay immediately on window load and any early user interaction
if (typeof window !== 'undefined') {
  const startAutoplay = () => {
    initAudio();
    playBGM();
  };

  // Immediate attempt
  startAutoplay();

  // On page load events
  window.addEventListener('DOMContentLoaded', startAutoplay);
  window.addEventListener('load', startAutoplay);

  // First interaction fallback (unlocks web audio if browser blocks zero-click autoplay)
  const onFirstGesture = () => {
    startAutoplay();
    ['pointerdown', 'keydown', 'click', 'touchstart'].forEach(evt => {
      window.removeEventListener(evt, onFirstGesture);
      document.removeEventListener(evt, onFirstGesture);
    });
  };

  ['pointerdown', 'keydown', 'click', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, onFirstGesture, { once: true, passive: true });
    document.addEventListener(evt, onFirstGesture, { once: true, passive: true });
  });
}

/** Play a tone with given frequency, duration, and type */
function playTone(freq, duration, type = 'sine', vol = 0.3) {
  if (muted || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol * volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

/** Play a frequency sweep (slide) */
function playSweep(startFreq, endFreq, duration, type = 'sine', vol = 0.25) {
  if (muted || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(endFreq, audioCtx.currentTime + duration);
  gain.gain.setValueAtTime(vol * volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// === Sound effects ===

export function sfxJump() {
  playTone(440, 0.12, 'sine', 0.2);
  playTone(587, 0.08, 'sine', 0.15);
}

export function sfxLand() {
  playTone(150, 0.1, 'triangle', 0.15);
}

export function sfxStep() {
  playTone(200, 0.04, 'triangle', 0.05);
}

export function sfxAngel() {
  // Soft bell chime
  playTone(784, 0.3, 'sine', 0.2);
  setTimeout(() => playTone(1047, 0.25, 'sine', 0.15), 100);
  setTimeout(() => playTone(1319, 0.2, 'sine', 0.1), 200);
}

export function sfxCorrect() {
  // Two ascending notes: C5 → E5
  playTone(523, 0.15, 'sine', 0.25);
  setTimeout(() => playTone(659, 0.2, 'sine', 0.25), 120);
}

export function sfxWrong() {
  // Single low tone, not harsh
  playTone(180, 0.2, 'square', 0.12);
}

export function sfxFall() {
  playSweep(600, 150, 0.5, 'sine', 0.25);
}

export function sfxRise() {
  playSweep(200, 700, 0.5, 'sine', 0.25);
}

export function sfxFanfare() {
  // Simple arpeggio
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.3, 'sine', 0.2), i * 120);
  });
}
