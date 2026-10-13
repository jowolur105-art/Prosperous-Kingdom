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
      <div class="final-card">
        <div class="final-crown-icon">👑</div>
        <h1 class="final-title">
          Papan Kejayaan Prosperous Kingdom
        </h1>
        <p class="final-subtitle">
          🎉 20 Teka-Teki Ekonomi Kerajaan Berhasil Ditaklukkan!
        </p>

        <div class="final-rank-list">
          ${sortedGroups.map((g, idx) => {
            const rank = idx + 1;
            const badgeIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;

            return `
              <div class="rank-card-row ${rank === 1 ? 'rank-card-first' : ''}">
                <div class="rank-left-section">
                  <span class="rank-badge-icon">
                    ${badgeIcon}
                  </span>
                  <div class="group-symbol-circle" style="background:${g.color};">
                    ${g.symbol}
                  </div>
                  <div class="group-info-col">
                    <div class="group-name-text">${g.name}</div>
                    <div class="group-stats-text">
                      Benar: ${g.correctAnswers || 0} soal &nbsp;|&nbsp; Salah: ${g.wrongAnswers || 0} soal
                    </div>
                  </div>
                </div>

                <div class="rank-score-section">
                  <span class="rank-score-num">${g.score}</span>
                  <span class="rank-score-label">Poin</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="final-actions-row">
          <button class="btn btn-secondary btn-action-final" id="btn-review-questions">
            📖 Review Pembahasan Soal
          </button>
          <button class="btn btn-primary btn-action-final" id="btn-new-session">
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
