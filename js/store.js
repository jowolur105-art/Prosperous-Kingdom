import { STORAGE_KEY } from './data/config.js';

/**
 * Store — session state + localStorage persistence.
 * All access wrapped in try/catch; falls back to in-memory if storage unavailable.
 */

const DEFAULT_SETTINGS = {
  speed: 'normal',
  timerSec: 60,
  sound: true,
  volume: 0.6,
  textScale: 1,
  reducedMotion: false,
};

const DEFAULT_STATE = {
  version: 1,
  settings: { ...DEFAULT_SETTINGS },
  session: null,
};

let state = structuredClone(DEFAULT_STATE);
let storageAvailable = true;

/** Try to load from localStorage */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === 1) {
        state = parsed;
        // Ensure settings have all keys
        state.settings = { ...DEFAULT_SETTINGS, ...state.settings };
      }
    }
  } catch (e) {
    storageAvailable = false;
    console.warn('[Store] localStorage unavailable, running in-memory.', e);
  }
}

/** Save current state to localStorage */
export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    if (storageAvailable) {
      storageAvailable = false;
      console.warn('[Store] Cannot save to localStorage.', e);
    }
  }
}

/** Get the full state object (read-only reference) */
export function getState() {
  return state;
}

/** Get settings */
export function getSettings() {
  return state.settings;
}

/** Update settings (partial) and save */
export function updateSettings(partial) {
  Object.assign(state.settings, partial);
  saveState();
}

/** Get current session (or null) */
export function getSession() {
  return state.session;
}

/** Set session data and save */
export function setSession(session) {
  state.session = session;
  saveState();
}

/** Clear session (game finished or reset) */
export function clearSession() {
  state.session = null;
  saveState();
}

/** Check if there's a resumable session */
export function hasResumableSession() {
  return state.session !== null && state.session.giliranIndex < (state.session.kelompok?.length ?? 0);
}

/** Check if storage is available */
export function isStorageAvailable() {
  return storageAvailable;
}

/** Reset everything */
export function resetAll() {
  state = structuredClone(DEFAULT_STATE);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) { /* ignore */ }
}

// Load on module init
loadState();
