/**
 * teacher.js — Teacher Moderator Panel:
 * Opened via 'T' key. Allows teacher to adjust scores, change player manually,
 * restart turn, adjust timer/speed, or advance turn.
 */
import { getSession, getSettings, updateSettings, saveState } from '../store.js';

export class TeacherPanel {
  constructor(router, ctx, overlay) {
    this.router = router;
    this.ctx = ctx;
    this.overlay = overlay;
  }

  enter() {
    this.overlay.innerHTML = '';

    const session = getSession();
    const settings = getSettings();
    const currentGroup = session?.kelompok ? session.kelompok[session.giliranIndex] : null;

    const panelContainer = document.createElement('div');
    panelContainer.className = 'teacher-panel';

    panelContainer.innerHTML = `
      <div class="teacher-content" role="dialog" aria-modal="true">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h2 style="margin:0; font-size:30px; color:var(--primary);">👨‍🏫 Panel Guru (Moderator)</h2>
          <button class="btn btn-secondary btn-sm" id="btn-close-teacher" style="color:var(--text); border-color:#94A3B8;">
            ✕ Tutup [T / Esc]
          </button>
        </div>

        ${currentGroup ? `
          <div style="background:#F1F5F9; border-radius:14px; padding:18px; margin-bottom:20px;">
            <div style="font-size:20px; font-weight:700; margin-bottom:6px;">
              Kelompok Aktif: <span style="color:${currentGroup.color};">${currentGroup.name} ${currentGroup.symbol}</span>
            </div>
            <div style="font-size:18px; color:var(--text-muted); margin-bottom:12px;">
              Pemain Aktif: <strong>${currentGroup.activePlayer}</strong> &nbsp;|&nbsp;
              Skor: <strong style="color:var(--primary); font-size:22px;">${currentGroup.score}</strong> Poin
            </div>

            <!-- Score Adjustment -->
            <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
              <span style="font-weight:600; font-size:16px;">Sesuaikan Skor:</span>
              <button class="btn btn-sm btn-success" id="btn-add-score">+5 Poin</button>
              <button class="btn btn-sm btn-danger" id="btn-sub-score">−5 Poin</button>
            </div>
          </div>

          <!-- Group Actions -->
          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:24px;">
            <button class="btn btn-sm btn-secondary" id="btn-rotate-player" style="color:var(--text); border-color:#CBD5E1;">
              👤 Ganti Pemain Berikutnya
            </button>
            <button class="btn btn-sm btn-secondary" id="btn-restart-turn" style="color:var(--text); border-color:#CBD5E1;">
              🔄 Ulangi Lintasan Kelompok Ini
            </button>
            <button class="btn btn-sm btn-secondary" id="btn-next-turn" style="color:var(--text); border-color:#CBD5E1;">
              ⏭ Lanjut ke Kelompok Berikutnya
            </button>
          </div>
        ` : `
          <div style="padding:16px; background:#F8FAFC; border-radius:12px; margin-bottom:20px; color:var(--text-muted);">
            Tidak ada giliran kelompok yang sedang aktif.
          </div>
        `}

        <!-- Game Controls -->
        <h3 style="font-size:20px; margin-bottom:12px; color:var(--text);">Pengaturan Game Sesi Ini</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:24px;">
          <div>
            <label style="font-size:15px; font-weight:600; display:block; margin-bottom:4px;">Kecepatan:</label>
            <select id="teacher-speed" style="width:100%; padding:8px; border-radius:8px; border:1px solid #CBD5E1; font-size:16px;">
              <option value="pelan" ${settings.speed === 'pelan' ? 'selected' : ''}>Pelan</option>
              <option value="normal" ${settings.speed === 'normal' ? 'selected' : ''}>Normal</option>
              <option value="cepat" ${settings.speed === 'cepat' ? 'selected' : ''}>Cepat</option>
            </select>
          </div>

          <div>
            <label style="font-size:15px; font-weight:600; display:block; margin-bottom:4px;">Timer Pertanyaan:</label>
            <select id="teacher-timer" style="width:100%; padding:8px; border-radius:8px; border:1px solid #CBD5E1; font-size:16px;">
              <option value="0" ${settings.timerSec === 0 ? 'selected' : ''}>Mati</option>
              <option value="45" ${settings.timerSec === 45 ? 'selected' : ''}>45 Detik</option>
              <option value="60" ${settings.timerSec === 60 ? 'selected' : ''}>60 Detik</option>
              <option value="90" ${settings.timerSec === 90 ? 'selected' : ''}>90 Detik</option>
            </select>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn btn-sm btn-secondary" id="btn-view-review" style="color:var(--text); border-color:#94A3B8;">
            📖 Buka Review Pembahasan
          </button>
          <button class="btn btn-primary btn-sm" id="btn-resume-game">
            Lanjut Bermain
          </button>
        </div>
      </div>
    `;

    this.overlay.appendChild(panelContainer);

    const close = () => {
      window.removeEventListener('keydown', handleKey);
      panelContainer.remove();
      if (this.router.currentName === 'teacher') {
        this.router.goto('play');
      }
    };

    function handleKey(e) {
      if (e.code === 'KeyT' || e.code === 'Escape') {
        e.preventDefault();
        close();
      }
    }
    window.addEventListener('keydown', handleKey);

    panelContainer.querySelector('#btn-close-teacher').addEventListener('click', close);
    panelContainer.querySelector('#btn-resume-game').addEventListener('click', close);

    if (currentGroup) {
      // Add score
      panelContainer.querySelector('#btn-add-score').addEventListener('click', () => {
        currentGroup.score += 5;
        saveState();
        this.enter();
      });

      // Sub score
      panelContainer.querySelector('#btn-sub-score').addEventListener('click', () => {
        currentGroup.score = Math.max(0, currentGroup.score - 5);
        saveState();
        this.enter();
      });

      // Rotate player
      panelContainer.querySelector('#btn-rotate-player').addEventListener('click', () => {
        const members = currentGroup.members || ['Pemain 1'];
        currentGroup.activeMemberIdx = ((currentGroup.activeMemberIdx || 0) + 1) % members.length;
        currentGroup.activePlayer = members[currentGroup.activeMemberIdx];
        saveState();
        this.enter();
      });

      // Restart turn
      panelContainer.querySelector('#btn-restart-turn').addEventListener('click', () => {
        window.removeEventListener('keydown', handleKey);
        this.router.goto('turn');
      });

      // Next turn
      panelContainer.querySelector('#btn-next-turn').addEventListener('click', () => {
        window.removeEventListener('keydown', handleKey);
        session.giliranIndex++;
        saveState();
        if (session.giliranIndex < session.kelompok.length) {
          this.router.goto('turn');
        } else {
          this.router.goto('final');
        }
      });
    }

    // Speed setting change
    panelContainer.querySelector('#teacher-speed').addEventListener('change', (e) => {
      updateSettings({ speed: e.target.value });
    });

    // Timer setting change
    panelContainer.querySelector('#teacher-timer').addEventListener('change', (e) => {
      updateSettings({ timerSec: parseInt(e.target.value, 10) });
    });

    // Review button
    panelContainer.querySelector('#btn-view-review').addEventListener('click', () => {
      window.removeEventListener('keydown', handleKey);
      this.router.goto('review');
    });
  }

  exit() {
    this.overlay.innerHTML = '';
  }
}
