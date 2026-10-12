/**
 * turn.js — Kingdom Turn Start Screen:
 * Displays active guild badge, assigned active knight, generates arcade track,
 * and starts running on Space/Enter or click.
 */
import { getSession, getSettings, saveState } from '../store.js';
import { generateTrack } from '../track.js';
import { TOTAL_ARCADE_QUESTIONS } from '../data/config.js';

export class TurnScreen {
  constructor(router, ctx, overlay) {
    this.router = router;
    this.ctx = ctx;
    this.overlay = overlay;
  }

  enter() {
    this.overlay.innerHTML = '';

    const session = getSession();
    if (!session || !session.kelompok) {
      this.router.goto('menu');
      return;
    }

    const currentGroup = session.kelompok[session.giliranIndex || 0];
    if (!currentGroup) {
      this.router.goto('final');
      return;
    }

    const settings = getSettings();
    const speedKey = settings.speed || 'normal';

    // Generate fresh track
    const track = generateTrack(4, speedKey);
    session.currentTrack = track;
    saveState();

    const answered = session.answeredCount || 0;

    const turnContainer = document.createElement('div');
    turnContainer.className = 'screen-overlay';
    turnContainer.style.background = 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,27,75,0.95) 100%)';

    turnContainer.innerHTML = `
      <div style="max-width:720px; padding:36px; background:rgba(30, 41, 59, 0.95); border:2px solid ${currentGroup.color}; border-radius:24px; box-shadow:0 16px 40px rgba(0,0,0,0.6); text-align:center; color:#F8FAFC;">
        <div style="background:${currentGroup.color}; color:#FFF; width:64px; height:64px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; margin-bottom:14px; box-shadow:0 0 20px ${currentGroup.color};">
          ${currentGroup.symbol}
        </div>

        <h1 style="font-size:40px; font-weight:900; margin-bottom:6px; color:#FCD34D;">
          Giliran: ${currentGroup.name}
        </h1>

        <p style="font-size:18px; color:#94A3B8; margin-bottom:20px;">
          Progress Misi: <strong>${answered} / ${TOTAL_ARCADE_QUESTIONS} Soal Terjawab</strong>
        </p>

        <div style="background:rgba(15, 23, 42, 0.7); border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:16px; margin-bottom:28px; text-align:left; font-size:17px; line-height:1.5;">
          <div>🛡️ Ksatria Pelari: <strong style="color:#38BDF8;">${currentGroup.activePlayer}</strong></div>
          <div style="color:#CBD5E1; margin-top:4px;">🐉 Hindari jurang kuno dan jawab teka-teki Naga Ekonomi untuk membawa kejayaan guild!</div>
        </div>

        <div>
          <button class="btn btn-primary" id="btn-start-turn" style="min-width:300px; font-size:24px; background:linear-gradient(135deg, #F59E0B, #B45309); border:2px solid #FCD34D;">
            ⚔️ Mulai Berlari [Spasi]
          </button>
        </div>
      </div>
    `;

    this.overlay.appendChild(turnContainer);

    const startBtn = turnContainer.querySelector('#btn-start-turn');
    const startRun = () => {
      window.removeEventListener('keydown', handleKey);
      this.router.goto('play');
    };

    function handleKey(e) {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        startRun();
      }
    }

    startBtn.addEventListener('click', startRun);
    window.addEventListener('keydown', handleKey);
  }

  exit() {
    this.overlay.innerHTML = '';
  }
}
