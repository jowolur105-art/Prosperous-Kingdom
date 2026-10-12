/**
 * review.js — Review Pembahasan Screen:
 * Displays all questions answered during the session, sorted by most wrong answers first
 * to help teacher focus on concepts that need reinforcement.
 */
import { getSession } from '../store.js';

export class ReviewScreen {
  constructor(router, ctx, overlay) {
    this.router = router;
    this.ctx = ctx;
    this.overlay = overlay;
  }

  enter() {
    this.overlay.innerHTML = '';

    const session = getSession();
    if (!session) {
      this.router.goto('menu');
      return;
    }

    const history = session.history || [];

    // Aggregate statistics per question
    const questionStatsMap = new Map();

    for (const record of history) {
      const q = record.questionObj;
      if (!q) continue;

      if (!questionStatsMap.has(q.id)) {
        questionStatsMap.set(q.id, {
          question: q,
          totalAsked: 0,
          totalWrong: 0,
          totalCorrect: 0,
        });
      }

      const stat = questionStatsMap.get(q.id);
      stat.totalAsked++;
      if (record.isCorrect) {
        stat.totalCorrect++;
      } else {
        stat.totalWrong++;
      }
    }

    // Sort questions by totalWrong descending
    const sortedStats = Array.from(questionStatsMap.values()).sort((a, b) => {
      if (b.totalWrong !== a.totalWrong) return b.totalWrong - a.totalWrong;
      return b.totalAsked - a.totalAsked;
    });

    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'setup-screen';
    reviewContainer.style.background = '#F8FAFC';
    reviewContainer.style.color = 'var(--text)';

    reviewContainer.innerHTML = `
      <div style="max-width:960px; width:100%; padding-bottom:40px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <div>
            <h1 style="font-size:36px; font-weight:900; color:var(--primary); margin:0;">
              Review Pembahasan Soal
            </h1>
            <p style="font-size:18px; color:var(--text-muted); margin-top:4px;">
              Diurutkan dari soal yang paling banyak dijawab salah oleh siswa
            </p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-back-final" style="color:var(--text); border-color:#94A3B8;">
            ← Kembali ke Peringkat
          </button>
        </div>

        ${sortedStats.length === 0 ? `
          <div style="text-align:center; padding:40px; font-size:22px; color:var(--text-muted);">
            Belum ada soal yang dijawab dalam sesi ini.
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:24px;">
            ${sortedStats.map((item, idx) => {
              const q = item.question;
              const wrongRate = Math.round((item.totalWrong / item.totalAsked) * 100);

              return `
                <div style="background:#FFFFFF; border-radius:18px; padding:24px; box-shadow:var(--shadow); border-left:8px solid ${item.totalWrong > 0 ? '#EF4444' : '#22C55E'};">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; gap:12px;">
                    <div>
                      <span style="background:#E2E8F0; padding:4px 10px; border-radius:6px; font-size:14px; font-weight:700;">
                        Soal ${q.id}
                      </span>
                      <span style="background:#CCFBF1; color:#0F766E; padding:4px 10px; border-radius:6px; font-size:14px; font-weight:700; margin-left:6px;">
                        TP ${q.tp} · ${q.level}
                      </span>
                    </div>

                    <div style="font-size:15px; font-weight:700; color:${item.totalWrong > 0 ? '#DC2626' : '#16A34A'};">
                      ${item.totalWrong} salah dari ${item.totalAsked} percobaan (${wrongRate}% salah)
                    </div>
                  </div>

                  <div style="font-size:22px; font-weight:600; line-height:1.45; margin-bottom:18px;">
                    ${q.soal}
                  </div>

                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px;">
                    ${q.opsi.map((opt, optIdx) => {
                      const isCorrect = (optIdx === q.benar);
                      return `
                        <div style="padding:12px 16px; border-radius:10px; font-size:17px; background:${isCorrect ? '#DCFCE7' : '#F1F5F9'}; border:2px solid ${isCorrect ? '#22C55E' : '#E2E8F0'}; color:${isCorrect ? '#14532D' : 'inherit'}; font-weight:${isCorrect ? '700' : 'normal'};">
                          <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt} ${isCorrect ? '✓ (Kunci)' : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <div style="background:#FFFBEB; border-left:4px solid #F59E0B; padding:14px 18px; border-radius:0 10px 10px 0; font-size:17px; line-height:1.5;">
                    <strong style="color:#B45309;">Pembahasan:</strong><br>
                    ${q.penjelasan}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    this.overlay.appendChild(reviewContainer);

    reviewContainer.querySelector('#btn-back-final').addEventListener('click', () => {
      this.router.goto('final');
    });
  }

  exit() {
    this.overlay.innerHTML = '';
  }
}
