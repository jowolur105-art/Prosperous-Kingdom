/**
 * intro.js — Intro Screen:
 * Displays story intro explaining the quest towards Kota Ekonomi,
 * Malaikat Ekonomi challenges, and teamwork mechanics.
 */
import { STRINGS } from '../data/strings.js';

export class IntroScreen {
  constructor(router, ctx, overlay) {
    this.router = router;
    this.ctx = ctx;
    this.overlay = overlay;
  }

  enter() {
    this.overlay.innerHTML = '';

    const introLines = STRINGS.intro || [
      'Selamat datang di Prosperous Kingdom! Jelajahi jalan kerajaan menuju kejayaan ekonomi.',
      'Di tengah perjalanan, Naga Ekonomi akan menguji pemahamanmu tentang siapa saja pelaku kegiatan ekonomi.',
      'Hati-hati dengan jurang kuno di jalan! Bekerjasamalah dengan kelompokmu, jawab tantangannya, dan raih nilai tertinggi!',
    ];

    const introContainer = document.createElement('div');
    introContainer.className = 'screen-overlay';
    introContainer.style.background = 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)';

    introContainer.innerHTML = `
      <div style="max-width:840px; padding:36px; background:rgba(255,255,255,0.95); border-radius:24px; box-shadow:var(--shadow-lg); color:var(--text); text-align:center;">
        <div style="font-size:48px; margin-bottom:12px;">🌟</div>
        <h1 style="font-size:40px; color:var(--primary); margin-bottom:24px; font-weight:800;">
          Petualangan Menuju Kota Ekonomi
        </h1>

        <div style="font-size:24px; line-height:1.6; display:flex; flex-direction:column; gap:20px; text-align:left; margin-bottom:36px; padding:0 12px;">
          ${introLines.map((line, i) => `
            <div style="display:flex; gap:16px; align-items:flex-start;">
              <span style="background:var(--primary); color:#FFF; width:32px; height:32px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:18px; font-weight:bold; flex-shrink:0; margin-top:4px;">
                ${i + 1}
              </span>
              <span>${line}</span>
            </div>
          `).join('')}
        </div>

        <button class="btn btn-primary" id="btn-start-intro" style="min-width:320px; font-size:28px;">
          Lanjut ke Giliran [Spasi]
        </button>
      </div>
    `;

    this.overlay.appendChild(introContainer);

    const startBtn = introContainer.querySelector('#btn-start-intro');
    const advance = () => {
      window.removeEventListener('keydown', handleKey);
      this.router.goto('turn');
    };

    function handleKey(e) {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        advance();
      }
    }

    startBtn.addEventListener('click', advance);
    window.addEventListener('keydown', handleKey);
  }

  exit() {
    this.overlay.innerHTML = '';
  }
}
