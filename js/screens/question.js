/**
 * question.js — Kingdom Question Dialog (DOM Overlay):
 * Glassmorphism translucent modal, compact sizing that fits within viewport without scrolling,
 * 4-option shuffle, timer, locking, answer explanations, and sound effects.
 */
import { sfxCorrect, sfxWrong } from '../audio.js';

export class QuestionDialog {
  static show({ overlay, question, type = 'angel', timerSec = 60, onComplete }) {
    // 1. Shuffle options while tracking correct index
    const originalOptions = question.opsi.map((text, idx) => ({
      text,
      isCorrect: idx === question.benar,
    }));

    const shuffled = originalOptions.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    let selectedIdx = null;
    let isLocked = false;
    let timerInterval = null;
    let timeLeft = timerSec;

    const dialogBackdrop = document.createElement('div');
    dialogBackdrop.className = 'question-backdrop';

    const isDragon = (type === 'angel');

    dialogBackdrop.innerHTML = `
      <div class="question-dialog" role="dialog" aria-modal="true">
        <div class="question-header">
          <div class="header-left">
            ${isDragon ? `
              <div class="dragon-header-badge">
                <img src="assets/dragon.png" alt="Naga Ekonomi" class="dragon-avatar-img">
                <span class="label dragon-label">Naga Ekonomi Bertanya</span>
              </div>
            ` : `
              <div class="pit-header-badge">
                <span class="pit-avatar-icon">🕳️</span>
                <span class="label pit-label">Terjatuh ke Jurang Kuno</span>
              </div>
            `}
          </div>
          ${timerSec > 0 ? `<div class="question-timer" id="q-timer">${timeLeft}s</div>` : ''}
        </div>

        <div class="question-text" id="q-text">
          ${formatQuestionText(question.soal)}
        </div>

        <div class="options-grid" id="q-options" role="radiogroup">
          ${shuffled.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            return `
              <button class="option-btn" data-index="${i}" role="radio" aria-checked="false" id="opt-${i}">
                <span class="option-label">${letter}.</span>
                <span class="option-content">${opt.text}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="question-footer" id="q-footer">
          <span class="hint">Pilih opsi atau langsung klik Kunci Jawaban</span>
          <button class="btn-parchment" id="btn-lock">
            Kunci Jawaban
          </button>
        </div>

        <div id="q-result-area"></div>
      </div>
    `;

    overlay.appendChild(dialogBackdrop);

    const timerEl = dialogBackdrop.querySelector('#q-timer');
    const lockBtn = dialogBackdrop.querySelector('#btn-lock');
    const optionBtns = dialogBackdrop.querySelectorAll('.option-btn');
    const resultArea = dialogBackdrop.querySelector('#q-result-area');

    if (timerSec > 0) {
      timerInterval = setInterval(() => {
        timeLeft--;
        if (timerEl) {
          timerEl.textContent = `${timeLeft}s`;
          if (timeLeft <= 10) {
            timerEl.classList.add('warning');
          }
        }

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          handleTimeExpired();
        }
      }, 1000);
    }

    function selectOption(index) {
      if (isLocked) return;
      selectedIdx = index;

      optionBtns.forEach((btn, i) => {
        if (i === index) {
          btn.classList.add('selected');
          btn.setAttribute('aria-checked', 'true');
        } else {
          btn.classList.remove('selected');
          btn.setAttribute('aria-checked', 'false');
        }
      });

      lockBtn.disabled = false;
    }

    optionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        selectOption(idx);
      });
    });

    function lockAnswer(timeExpired = false) {
      if (isLocked) return;
      isLocked = true;
      if (timerInterval) clearInterval(timerInterval);

      const isCorrect = !timeExpired && selectedIdx !== null && shuffled[selectedIdx].isCorrect;

      if (isCorrect) {
        sfxCorrect();
      } else {
        sfxWrong();
      }

      optionBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (shuffled[i].isCorrect) {
          btn.classList.add('correct');
        } else if (i === selectedIdx && !isCorrect) {
          btn.classList.add('wrong');
        }
      });

      let scoreBadge = '';
      if (isDragon) {
        if (isCorrect) {
          scoreBadge = '<div class="score-change positive">+10 Poin (Jawaban Benar)</div>';
        } else if (selectedIdx === null) {
          scoreBadge = '<div class="score-change neutral">+0 Poin (Kunci Jawaban Dibuka)</div>';
        } else {
          scoreBadge = '<div class="score-change neutral">+0 Poin (Jawaban Kurang Tepat)</div>';
        }
      } else {
        if (isCorrect) {
          scoreBadge = '<div class="score-change neutral">+0 Poin (Berhasil Bangkit dari Jurang)</div>';
        } else if (selectedIdx === null) {
          scoreBadge = '<div class="score-change neutral">+0 Poin (Kunci Jawaban Dibuka)</div>';
        } else {
          scoreBadge = '<div class="score-change neutral">+0 Poin (Jawaban Kurang Tepat)</div>';
        }
      }

      const qFooter = dialogBackdrop.querySelector('#q-footer');
      if (qFooter) {
        qFooter.style.display = 'none';
      }

      resultArea.innerHTML = `
        ${scoreBadge}
        <div class="explanation-box">
          <strong>Pembahasan:</strong> ${question.penjelasan || ''}
        </div>
        <div style="display:flex; justify-content:flex-end; margin-top:8px;">
          <button class="btn-parchment" id="btn-next" style="min-width:170px;">
            Lanjut
          </button>
        </div>
      `;

      const nextBtn = resultArea.querySelector('#btn-next');
      nextBtn.focus();

      function finish() {
        window.removeEventListener('keydown', handleKey);
        dialogBackdrop.remove();
        onComplete({
          isCorrect,
          selectedIdx,
          timeExpired,
          questionId: question.id,
        });
      }

      nextBtn.addEventListener('click', finish);

      function handleAdvanceKey(e) {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          window.removeEventListener('keydown', handleAdvanceKey);
          finish();
        }
      }
      window.addEventListener('keydown', handleAdvanceKey);
    }

    function handleTimeExpired() {
      lockAnswer(true);
    }

    lockBtn.addEventListener('click', () => {
      lockAnswer(false);
    });

    function handleKey(e) {
      if (isLocked) return;

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') selectOption(0);
      else if (key === 'B' || key === '2') selectOption(1);
      else if (key === 'C' || key === '3') selectOption(2);
      else if (key === 'D' || key === '4') selectOption(3);
      else if (e.code === 'Enter') {
        e.preventDefault();
        lockAnswer(false);
      }
    }

    window.addEventListener('keydown', handleKey);
  }
}

function formatQuestionText(text) {
  if (!text) return '';
  return text
    .replace(/\b(BUKAN)\b/g, '<strong style="color:#9A3412; text-decoration:underline;">BUKAN</strong>')
    .replace(/\b(SALAH)\b/g, '<strong style="color:#9A3412; text-decoration:underline;">SALAH</strong>')
    .replace(/\b(BENAR)\b/g, '<strong style="color:#15803D; text-decoration:underline;">BENAR</strong>');
}
