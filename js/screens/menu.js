/**
 * menu.js — Prosperous Kingdom Home Screen:
 * Displays medieval title "Prosperous Kingdom", majestic castle background,
 * and single static "PLAY" button that directly launches gameplay without rules/setup.
 */
import { CANVAS_W, CANVAS_H, BG_KINGDOM_ASSET } from '../data/config.js';
import { getSettings, updateSettings, setSession } from '../store.js';
import { isMuted, toggleMute, initAudio, playBGM } from '../audio.js';
import { drawClouds, drawAngel } from '../game/draw.js';
import { generateTrack } from '../track.js';
import { QUESTIONS_MALAIKAT, QUESTIONS_JURANG } from '../data/questions.js';

export class MenuScreen {
  constructor(router, ctx, overlay) {
    this.router = router;
    this.ctx = ctx;
    this.overlay = overlay;
    this.bgImage = new Image();
    this.bgLoaded = false;
    this.animId = null;
    this.animTime = 0;

    this.bgImage.src = BG_KINGDOM_ASSET;
    this.bgImage.onload = () => { this.bgLoaded = true; };
  }

  enter() {
    this._renderUI();
    this._startBackgroundLoop();
    playBGM();
  }

  exit() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this.overlay.innerHTML = '';
  }

  _renderUI() {
    this.overlay.innerHTML = '';

    const homeContainer = document.createElement('div');
    homeContainer.className = 'screen-overlay';

    homeContainer.innerHTML = `
      <div class="home-overlay"></div>

      <div class="home-content">
        <h1 class="home-title" style="font-family:'Cinzel', 'MedievalSharp', serif; font-size:78px; letter-spacing:4px; color:#FCD34D; text-shadow:0 4px 16px rgba(0,0,0,0.8), 0 0 35px rgba(245,158,11,0.7); margin-top:14%;">
          Prosperous Kingdom
        </h1>

        <div class="home-actions" style="margin-top:auto; margin-bottom:12%;">
          <button class="btn btn-primary" id="btn-play" style="font-family:'MedievalSharp', 'Cinzel', serif; font-size:38px; min-width:280px; min-height:80px; letter-spacing:3px; background:linear-gradient(135deg, #F59E0B 0%, #B45309 100%); border:3px solid #FCD34D; box-shadow:0 8px 32px rgba(0,0,0,0.6); cursor:pointer;">
            PLAY
          </button>

          <div style="margin-top:14px;">
            <button class="btn btn-secondary btn-sm" id="btn-settings" style="font-family:'MedievalSharp', serif; font-size:16px;">
              ⚙ Pengaturan
            </button>
          </div>
        </div>
      </div>
    `;

    this.overlay.appendChild(homeContainer);

    // DIRECT PLAY: Start gameplay immediately on click, no rules/setup screen
    const playBtn = homeContainer.querySelector('#btn-play');
    playBtn.addEventListener('click', () => {
      initAudio();
      playBGM();
      this._startDirectGame();
    });

    const settingsBtn = homeContainer.querySelector('#btn-settings');
    settingsBtn.addEventListener('click', () => {
      this._openSettingsModal();
    });
  }

  /** Initialize game session and jump straight into gameplay */
  _startDirectGame() {
    const settings = getSettings();

    // 1. Shuffle Dragon questions
    const shuffledAngelQuestions = [...QUESTIONS_MALAIKAT];
    for (let i = shuffledAngelQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAngelQuestions[i], shuffledAngelQuestions[j]] = [shuffledAngelQuestions[j], shuffledAngelQuestions[i]];
    }

    // 2. Shuffle Pit questions
    const shuffledPitQuestions = [...QUESTIONS_JURANG];
    for (let i = shuffledPitQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPitQuestions[i], shuffledPitQuestions[j]] = [shuffledPitQuestions[j], shuffledPitQuestions[i]];
    }

    // 3. Track (Balanced Dragons and Chasms)
    const track = generateTrack(6, settings.speed || 'normal');

    const session = {
      kelompok: [{
        id: 1,
        name: 'Ksatria Kerajaan',
        color: '#3B82F6',
        symbol: '⚔️',
        members: ['Ksatria'],
        activePlayer: 'Ksatria',
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
      }],
      giliranIndex: 0,
      answeredCount: 0,
      shuffledAngelQuestions,
      dragonPointer: 0,
      shuffledPitQuestions,
      pitPointer: 0,
      history: [],
      currentTrack: track,
    };

    setSession(session);

    // DIRECTLY GO TO PLAY — character immediately starts walking!
    this.router.goto('play');
  }

  _startBackgroundLoop() {
    const loop = () => {
      this.animTime += 0.016;
      this._renderBackground();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  _renderBackground() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    if (this.bgLoaded && this.bgImage) {
      ctx.drawImage(this.bgImage, 0, 0, CANVAS_W, CANVAS_H);
      drawClouds(ctx, this.animTime * 15, this.animTime);

      // Majestic Guardian Dragon hovering proudly in the kingdom sky!
      const dragonX = 990 + Math.sin(this.animTime * 1.5) * 25;
      drawAngel(ctx, dragonX, 260, {
        floatH: 80,
        animTime: this.animTime,
        flyAway: 0,
      });
    }
  }

  _openSettingsModal() {
    const settings = getSettings();
    const modal = document.createElement('div');
    modal.className = 'question-backdrop';
    modal.innerHTML = `
      <div class="question-dialog" style="max-width:540px;">
        <h2 style="font-family:'Cinzel', serif; color:#F59E0B; margin-bottom:16px; font-size:24px;">⚙️ Pengaturan Game</h2>

        <div style="display:flex; flex-direction:column; gap:16px; font-size:18px;">
          <div>
            <label style="font-weight:600; display:block; margin-bottom:6px;">Kecepatan Ksatria:</label>
            <select id="set-speed" style="width:100%; padding:8px; font-size:16px; border-radius:8px; border:1px solid #CBD5E1; background:#1E293B; color:#FFF;">
              <option value="pelan" ${settings.speed === 'pelan' ? 'selected' : ''}>Pelan (200 px/dtk)</option>
              <option value="normal" ${settings.speed === 'normal' ? 'selected' : ''}>Normal (240 px/dtk)</option>
              <option value="cepat" ${settings.speed === 'cepat' ? 'selected' : ''}>Cepat (280 px/dtk)</option>
            </select>
          </div>

          <div>
            <label style="font-weight:600; display:block; margin-bottom:6px;">Batas Waktu Soal:</label>
            <select id="set-timer" style="width:100%; padding:8px; font-size:16px; border-radius:8px; border:1px solid #CBD5E1; background:#1E293B; color:#FFF;">
              <option value="0" ${settings.timerSec === 0 ? 'selected' : ''}>Mati (Tanpa Batas Waktu)</option>
              <option value="45" ${settings.timerSec === 45 ? 'selected' : ''}>45 Detik</option>
              <option value="60" ${settings.timerSec === 60 ? 'selected' : ''}>60 Detik (Standar)</option>
              <option value="90" ${settings.timerSec === 90 ? 'selected' : ''}>90 Detik</option>
            </select>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
          <button class="btn btn-primary btn-sm" id="btn-save-settings">Simpan</button>
        </div>
      </div>
    `;

    this.overlay.appendChild(modal);

    const saveBtn = modal.querySelector('#btn-save-settings');
    saveBtn.addEventListener('click', () => {
      const speed = modal.querySelector('#set-speed').value;
      const timerSec = parseInt(modal.querySelector('#set-timer').value, 10);
      updateSettings({ speed, timerSec });
      modal.remove();
    });
  }
}
