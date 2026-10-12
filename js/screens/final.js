/**
 * final.js — Kingdom Arcade Victory & Leaderboard:
 * Displays final rankings when all 20 arcade questions have been conquered,
 * awards crowns and badges, and allows review of questions or restarting a session.
 */
import { getSession, clearSession } from '../store.js';

export class FinalScreen {
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

    const sortedGroups = [...session.kelompok].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.wrongAnswers || 0) - (b.wrongAnswers || 0);
    });

    const finalContainer = document.createElement('div');
    finalContainer.className = 'results-screen';
    finalContainer.style.background = 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)';

    finalContainer.innerHTML = `
      <div style="max-width:920px; width:100%; padding:36px; background:rgba(30, 41, 59, 0.95); border:2px solid #F59E0B; border-radius:24px; box-shadow:0 16px 48px rgba(0,0,0,0.7); color:#F8FAFC; text-align:center;">
        <div style="font-size:52px; margin-bottom:6px;">👑</div>
        <h1 style="font-size:38px; font-weight:900; margin-bottom:6px; color:#FCD34D;">
          Papan Kejayaan Prosperous Kingdom
        </h1>
        <p style="font-size:18px; color:#94A3B8; margin-bottom:24px;">
          🎉 20 Teka-Teki Ekonomi Kerajaan Berhasil Ditaklukkan!
        </p>

        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px; text-align:left;">
          ${sortedGroups.map((g, idx) => {
            const rank = idx + 1;
            const badgeIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;

            return `
              <div style="display:flex; align-items:center; justify-content:space-between; background:${rank === 1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(15, 23, 42, 0.7)'}; border:2px solid ${rank === 1 ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; border-radius:14px; padding:14px 20px;">
                <div style="display:flex; align-items:center; gap:14px;">
                  <span style="font-size:28px; font-weight:800; min-width:36px; text-align:center;">
                    ${badgeIcon}
                  </span>
                  <div style="background:${g.color}; color:#FFF; width:40px; height:40px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:20px; font-weight:bold;">
                    ${g.symbol}
                  </div>
                  <div>
                    <div style="font-size:22px; font-weight:800; color:#FFF;">${g.name}</div>
                    <div style="font-size:14px; color:#94A3B8;">
                      Benar: ${g.correctAnswers || 0} soal &nbsp;|&nbsp; Salah: ${g.wrongAnswers || 0} soal
                    </div>
                  </div>
                </div>

                <div style="text-align:right;">
                  <div style="font-size:28px; font-weight:900; color:#FCD34D;">${g.score} <span style="font-size:16px;">Poin</span></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
          <button class="btn btn-secondary" id="btn-review-questions" style="min-height:56px; font-size:18px;">
            📖 Review Pembahasan Soal
          </button>
          <button class="btn btn-primary" id="btn-new-session" style="min-height:56px; font-size:18px; background:linear-gradient(135deg, #F59E0B, #B45309);">
            🔄 Main Ekspedisi Baru
          </button>
        </div>
      </div>
    `;

    this.overlay.appendChild(finalContainer);

    finalContainer.querySelector('#btn-review-questions').addEventListener('click', () => {
      this.router.goto('review');
    });

    finalContainer.querySelector('#btn-new-session').addEventListener('click', () => {
      clearSession();
      this.router.goto('menu');
    });
  }

  exit() {
    this.overlay.innerHTML = '';
  }
}
