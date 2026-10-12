/**
 * main.js — Entry point for Prosperous Kingdom: Ekspedisi Pelaku Ekonomi.
 * Initialises canvas scaling with DPR support, registers service worker,
 * configures screen router, and starts the game.
 */
import { CANVAS_W, CANVAS_H } from './data/config.js';
import { Router } from './router.js';
import { MenuScreen } from './screens/menu.js';
import { SetupScreen } from './screens/setup.js';
import { IntroScreen } from './screens/intro.js';
import { TurnScreen } from './screens/turn.js';
import { PlayScreen } from './screens/play.js';
import { TurnResultScreen } from './screens/turnresult.js';
import { FinalScreen } from './screens/final.js';
import { ReviewScreen } from './screens/review.js';
import { TeacherPanel } from './screens/teacher.js';
import { initAudio, playBGM, toggleMute, isMuted } from './audio.js';

// === DOM references ===
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('ui-overlay');

/** Scale canvas to window while maintaining 16:9 aspect ratio (letterbox) */
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  // Fit 1280×720 into window
  const scale = Math.min(winW / CANVAS_W, winH / CANVAS_H);
  const displayW = Math.floor(CANVAS_W * scale);
  const displayH = Math.floor(CANVAS_H * scale);

  // CSS display size
  canvas.style.width = `${displayW}px`;
  canvas.style.height = `${displayH}px`;

  // Actual pixel buffer (crisp on HiDPI)
  canvas.width = Math.floor(CANVAS_W * dpr);
  canvas.height = Math.floor(CANVAS_H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Position UI overlay to match canvas exactly
  const offsetX = Math.floor((winW - displayW) / 2);
  const offsetY = Math.floor((winH - displayH) / 2);
  overlay.style.width = `${displayW}px`;
  overlay.style.height = `${displayH}px`;
  overlay.style.left = `${offsetX}px`;
  overlay.style.top = `${offsetY}px`;

  canvas._scale = scale;
  canvas._offsetX = offsetX;
  canvas._offsetY = offsetY;

  // Re-render current screen if it provides a render method
  if (window._router && window._router.currentScreen && window._router.currentScreen.render) {
    window._router.currentScreen.render();
  }
}

/** Register service worker for offline PWA */
async function registerSW() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const reg = await navigator.serviceWorker.register('./sw.js');
    console.log('[SW] Registered successfully:', reg.scope);

    // Listen for updates
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
          showUpdateToast();
        }
      });
    });
  } catch (err) {
    console.warn('[SW] Registration failed:', err);
  }
}

/** Show "new version available" toast */
function showUpdateToast() {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>Versi baru tersedia.</span>
    <button onclick="location.reload()">Muat ulang</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 15000);
}

// Capture PWA install prompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window._deferredPrompt = e;
});

// === Initialise on page load ===
window.addEventListener('load', () => {
  // Autoplay Medieval BGM immediately on window load
  initAudio();
  playBGM();

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Register Service Worker
  registerSW();

  // Set up router and register all screens
  const router = new Router(canvas, ctx, overlay);
  window._router = router;

  router.register('menu', new MenuScreen(router, ctx, overlay));
  router.register('setup', new SetupScreen(router, ctx, overlay));
  router.register('intro', new IntroScreen(router, ctx, overlay));
  router.register('turn', new TurnScreen(router, ctx, overlay));
  router.register('play', new PlayScreen(router, ctx, overlay));
  router.register('turnresult', new TurnResultScreen(router, ctx, overlay));
  router.register('final', new FinalScreen(router, ctx, overlay));
  router.register('review', new ReviewScreen(router, ctx, overlay));
  router.register('teacher', new TeacherPanel(router, ctx, overlay));

  // Global Mute Button & Keyboard Shortcut (M)
  const globalMuteBtn = document.getElementById('global-mute-btn');
  if (globalMuteBtn) {
    globalMuteBtn.textContent = isMuted() ? '🔇' : '🔊';
    globalMuteBtn.addEventListener('click', () => {
      initAudio();
      const mutedNow = toggleMute();
      globalMuteBtn.textContent = mutedNow ? '🔇' : '🔊';
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyM' && !e.target.matches('input, textarea')) {
      initAudio();
      const mutedNow = toggleMute();
      if (globalMuteBtn) {
        globalMuteBtn.textContent = mutedNow ? '🔇' : '🔊';
      }
    }
  });

  // Start at menu
  router.goto('menu');
  playBGM();

  console.log('[Prosperous Kingdom] Game successfully initialized with Medieval BGM!');
});
