/**
 * setup.js — Kingdom Guild Setup Screen:
 * Configures Guilds/Groups with Kingdom symbols (⚔️, 🛡️, 👑, etc.),
 * and starts the game directly bypassing intro/rules screens.
 */
import { GROUP_THEMES } from '../data/config.js';
import { QUESTIONS_MALAIKAT, QUESTIONS_JURANG } from '../data/questions.js';
import { setSession } from '../store.js';

export class SetupScreen {
  constructor(router, ctx, overlay) {
    this.router = router;
    this.ctx = ctx;
    this.overlay = overlay;
    this.groupCount = 5;
    this.groupsData = [];
  }

  enter() {
    this._initDefaults();
    this._render();
  }

  exit() {
    this.overlay.innerHTML = '';
  }

  _initDefaults() {
    this.groupsData = [];
    for (let i = 0; i < this.groupCount; i++) {
      const theme = GROUP_THEMES[i % GROUP_THEMES.length];
      this.groupsData.push({
        id: i + 1,
        name: theme.name || `Ksatria ${i + 1}`,
        color: theme.color,
        symbol: theme.symbol,
        memberCount: 4,
        members: ['Ksatria 1', 'Ksatria 2', 'Ksatria 3', 'Ksatria 4'],
        activeMemberIdx: 0,
        activePlayer: 'Ksatria 1',
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
      });
    }
  }

  _render() {
    this.overlay.innerHTML = '';

    const setupContainer = document.createElement('div');
    setupContainer.className = 'setup-screen';
    setupContainer.style.background = 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)';

    setupContainer.innerHTML = `
      <div style="max-width:960px; width:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <div>
            <h1 style="margin:0; font-size:36px; color:#FCD34D;">🏰 Pembentukan Guild Ksatria</h1>
            <p style="font-size:16px; color:#CBD5E1; margin-top:4px;">Mode Arcade: Berpetualang bersama menyelesaikan 20 teka-teki ekonomi kerajaan</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-back">← Kembali</button>
        </div>

        <div style="background:rgba(255,255,255,0.08); backdrop-filter:blur(8px); border:1px solid rgba(245,158,11,0.4); border-radius:16px; padding:16px 24px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; gap:20px;">
          <div>
            <label style="font-size:18px; font-weight:700; margin-right:12px; color:#FFF;">Jumlah Guild / Kelompok:</label>
            <select id="group-count-select" style="font-size:18px; font-weight:700; padding:6px 14px; border-radius:8px; border:none; cursor:pointer; background:#F8FAFC; color:#0F172A;">
              ${[2, 3, 4, 5, 6].map(n => `<option value="${n}" ${n === this.groupCount ? 'selected' : ''}>${n} Guild</option>`).join('')}
            </select>
          </div>
          <div style="font-size:16px; font-weight:700; color:#FDE68A;">
            🎯 Misi Arcade: Selesaikan <strong>20 Pertanyaan Naga & Jurang</strong>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:28px;" id="groups-container">
          ${this.groupsData.map((g, idx) => `
            <div style="background:rgba(30, 41, 59, 0.9); border:2px solid ${g.color}; border-radius:16px; padding:18px; color:#F8FAFC; box-shadow:var(--shadow);">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <span style="background:${g.color}; color:#FFF; width:40px; height:40px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:22px; font-weight:bold;">
                  ${g.symbol}
                </span>
                <input type="text" class="group-name-input" data-index="${idx}" value="${g.name}" style="font-size:18px; font-weight:700; border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:4px 8px; width:100%; background:rgba(15,23,42,0.6); color:#FFF;">
              </div>

              <div style="margin-bottom:10px;">
                <label style="font-size:14px; color:#94A3B8; display:block; margin-bottom:4px;">
                  Jumlah Anggota:
                </label>
                <select class="member-count-select" data-index="${idx}" style="width:100%; padding:6px; border-radius:6px; border:1px solid rgba(255,255,255,0.2); font-size:15px; background:rgba(15,23,42,0.6); color:#FFF;">
                  ${[2, 3, 4, 5, 6, 7, 8].map(m => `<option value="${m}" ${m === g.memberCount ? 'selected' : ''}>${m} Anggota</option>`).join('')}
                </select>
              </div>

              <div style="font-size:13px; color:#CBD5E1;">
                Ksatria pertama: <strong style="color:#FCD34D;">${g.members[0]}</strong>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display:flex; justify-content:center; margin-bottom:32px;">
          <button class="btn btn-primary" id="btn-start-game" style="min-width:320px; font-size:26px; background:linear-gradient(135deg, #F59E0B, #B45309); border:2px solid #FCD34D;">
            ⚔️ Mulai Ekspedisi Langsung ➔
          </button>
        </div>
      </div>
    `;

    this.overlay.appendChild(setupContainer);

    setupContainer.querySelector('#group-count-select').addEventListener('change', (e) => {
      this.groupCount = parseInt(e.target.value, 10);
      this._initDefaults();
      this._render();
    });

    setupContainer.querySelectorAll('.group-name-input').forEach((input) => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.index, 10);
        this.groupsData[idx].name = e.target.value.trim() || `Guild ${idx + 1}`;
      });
    });

    setupContainer.querySelectorAll('.member-count-select').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        const idx = parseInt(sel.dataset.index, 10);
        const count = parseInt(e.target.value, 10);
        this.groupsData[idx].memberCount = count;
        this.groupsData[idx].members = Array.from({ length: count }, (_, i) => `Ksatria ${i + 1}`);
        this.groupsData[idx].activePlayer = this.groupsData[idx].members[0];
        this._render();
      });
    });

    setupContainer.querySelector('#btn-back').addEventListener('click', () => {
      this.router.goto('menu');
    });

    // Directly starts turn, skipping rules/intro completely
    setupContainer.querySelector('#btn-start-game').addEventListener('click', () => {
      this._startGameSession();
    });
  }

  _startGameSession() {
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

    const session = {
      kelompok: this.groupsData,
      giliranIndex: 0,
      answeredCount: 0,
      shuffledAngelQuestions,
      dragonPointer: 0,
      shuffledPitQuestions,
      pitPointer: 0,
      history: [],
      currentTrack: null,
    };

    setSession(session);

    // DIRECTLY go to turn screen without showing rules / intro
    this.router.goto('turn');
  }
}
