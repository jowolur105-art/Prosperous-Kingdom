/**
 * turnresult.js — Turn Result Screen:
 * Displays group achievements (score, correct/wrong answers, game percentage grade),
 * and advances to next group or final results.
 */
import { getSession, saveState } from '../store.js';

export class TurnResultScreen {
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

    const currentGroup = session.kelompok[session.giliranIndex];
    const isLastGroup = (session.giliranIndex + 1 >= session.kelompok.length);
    const maxScore = (10 * session.angelCount);
    const grade = Math.round(Math.max(0, currentGroup.score) / (maxScore || 1) * 100);

    const resultContainer = document.createElement('div');
    resultContainer.className = 'results-screen';

    resultContainer.innerHTML = `
      <div style="max-width:760px; width:100%; padding:40px; background:#FFFFFF; border-radius:24px; box-shadow:var(--shadow-lg); text-align:center; color:var(--text); border-top:10px solid ${currentGroup.color};">
        <div style="font-size:48px; margin-bottom:8px;">🎉</div>

        <h1 style="font-size:38px; color:var(--text); margin-bottom:6px;">
          Hasil Perjalanan: ${currentGroup.name}
        </h1>
        <p style="font-size:20px; color:var(--text-muted); margin-bottom:28px;">
          Telah berhasil mencapai Kota Ekonomi!
        </p>

        <!-- Stats Grid -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:32px;">
          <div style="background:#F0FDF4; border:2px solid #BBF7D0; border-radius:16px; padding:20px;">
            <div style="font-size:16px; font-weight:600; color:#15803D;">SKOR AKHIR</div>
            <div style="font-size:46px; font-weight:900; color:#16A34A;">${currentGroup.score}</div>
            <div style="font-size:14px; color:var(--text-muted);">Maksimal: ${maxScore} Poin</div>
          </div>

          <div style="background:#FEF3C7; border:2px solid #FDE68A; border-radius:16px; padding:20px;">
            <div style="font-size:16px; font-weight:600; color:#B45309;">NILAI GAME</div>
            <div style="font-size:46px; font-weight:900; color:#D97706;">${grade}%</div>
            <div style="font-size:14px; color:var(--text-muted);">Tingkat Keberhasilan</div>
          </div>
        </div>

        <div style="background:#F8FAFC; border-radius:12px; padding:16px; margin-bottom:32px; font-size:18px; color:var(--text-muted);">
          Benar: <strong>${currentGroup.correctAnswers || 0}</strong> soal &nbsp;|&nbsp;
          Salah: <strong>${currentGroup.wrongAnswers || 0}</strong> soal
        </div>

        <div>
          ${isLastGroup ? `
            <button class="btn btn-primary" id="btn-next-step" style="min-width:320px; font-size:26px;">
              Lihat Hasil Akhir Kelas 🏆
            </button>
          ` : `
            <button class="btn btn-primary" id="btn-next-step" style="min-width:320px; font-size:26px;">
              Kelompok Berikutnya ➔
            </button>
          `}
        </div>
      </div>
    `;

    this.overlay.appendChild(resultContainer);

    const nextBtn = resultContainer.querySelector('#btn-next-step');
    nextBtn.addEventListener('click', () => {
      if (isLastGroup) {
        this.router.goto('final');
      } else {
        session.giliranIndex++;
        saveState();
        this.router.goto('turn');
      }
    });
  }

  exit() {
    this.overlay.innerHTML = '';
  }
}
