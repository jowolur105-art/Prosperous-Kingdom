/**
 * play.js — Kingdom Arcade Direct Gameplay:
 * Direct continuous runner. When encountering dragon or pit: answer question,
 * update score, and immediately resume running without player rotation or pause banners.
 * Completes when 20 total questions are answered.
 */
import { Engine } from '../game/engine.js';
import { QuestionDialog } from './question.js';
import { getSession, saveState, getSettings } from '../store.js';
import { QUESTIONS_MALAIKAT, QUESTIONS_JURANG } from '../data/questions.js';
import { TOTAL_ARCADE_QUESTIONS } from '../data/config.js';

export class PlayScreen {
  constructor(router, ctx, overlay) {
    this.router = router;
    this.ctx = ctx;
    this.overlay = overlay;
    this.engine = null;
    this.session = null;
    this.currentGroup = null;
    this.track = null;
  }

  enter() {
    this.session = getSession();
    if (!this.session) {
      this.router.goto('menu');
      return;
    }

    if (this.session.answeredCount === undefined) {
      this.session.answeredCount = 0;
    }

    const giliranIdx = this.session.giliranIndex || 0;
    this.currentGroup = this.session.kelompok[giliranIdx] || this.session.kelompok[0];
    this.track = this.session.currentTrack;

    if (!this.track || !this.currentGroup) {
      this.router.goto('menu');
      return;
    }

    const settings = getSettings();

    this.engine = new Engine(this.router.canvas, this.ctx, {
      onAngelEncounter: (angel) => this._handleDragonEncounter(angel),
      onPitFall: (hole) => this._handlePitFall(hole),
      onFinish: () => this._handleFinish(),
    });

    this.engine.initRun(this.track, this.currentGroup, settings.speed || 'normal', this.session.answeredCount);
    this.engine.start();

    // Teacher Panel shortcut (T)
    this._onKeyDown = (e) => {
      if (e.code === 'KeyT') {
        this.router.goto('teacher');
      }
    };
    window.addEventListener('keydown', this._onKeyDown);
  }

  exit() {
    window.removeEventListener('keydown', this._onKeyDown);
    if (this.engine) {
      this.engine.stop();
      this.engine = null;
    }
    this.overlay.innerHTML = '';
  }

  /** Handle Dragon Encounter */
  _handleDragonEncounter(angel) {
    if (!this.session.dragonPointer) this.session.dragonPointer = 0;
    const questions = this.session.shuffledAngelQuestions || QUESTIONS_MALAIKAT;
    const question = questions[this.session.dragonPointer % questions.length];
    this.session.dragonPointer++;

    const settings = getSettings();
    const timerSec = settings.timerSec ?? 60;

    QuestionDialog.show({
      overlay: this.overlay,
      question,
      type: 'angel',
      timerSec,
      onComplete: ({ isCorrect }) => {
        this._recordQuestionHistory(question, isCorrect);

        if (isCorrect) {
          this.currentGroup.score += 10;
          this.currentGroup.correctAnswers = (this.currentGroup.correctAnswers || 0) + 1;
        } else {
          this.currentGroup.wrongAnswers = (this.currentGroup.wrongAnswers || 0) + 1;
        }

        this.session.answeredCount = (this.session.answeredCount || 0) + 1;
        if (this.engine) {
          this.engine.answeredCount = this.session.answeredCount;
        }
        saveState();

        // Resume running immediately! No player rotation, no pause banner!
        this.engine.resumeAfterAngel();

        if (this.session.answeredCount >= TOTAL_ARCADE_QUESTIONS) {
          setTimeout(() => this._handleFinish(), 400);
        }
      },
    });
  }

  /** Handle Pit Fall */
  _handlePitFall(hole) {
    if (!this.session.pitPointer) this.session.pitPointer = 0;
    const pitQuestions = this.session.shuffledPitQuestions || QUESTIONS_JURANG;
    const question = pitQuestions[this.session.pitPointer % pitQuestions.length];
    this.session.pitPointer++;

    const settings = getSettings();
    const timerSec = settings.timerSec ?? 60;

    QuestionDialog.show({
      overlay: this.overlay,
      question,
      type: 'pit',
      timerSec,
      onComplete: ({ isCorrect }) => {
        this._recordQuestionHistory(question, isCorrect);

        if (isCorrect) {
          this.currentGroup.correctAnswers = (this.currentGroup.correctAnswers || 0) + 1;
        } else {
          // No minus system: wrong answer gives 0 points
          this.currentGroup.wrongAnswers = (this.currentGroup.wrongAnswers || 0) + 1;
        }

        this.session.answeredCount = (this.session.answeredCount || 0) + 1;
        if (this.engine) {
          this.engine.answeredCount = this.session.answeredCount;
        }
        saveState();

        // Rise from pit and resume immediately!
        this.engine.resumeAfterPit(hole);

        if (this.session.answeredCount >= TOTAL_ARCADE_QUESTIONS) {
          setTimeout(() => this._handleFinish(), 400);
        }
      },
    });
  }

  _recordQuestionHistory(question, isCorrect) {
    if (!this.session.history) this.session.history = [];
    this.session.history.push({
      questionId: question.id,
      questionObj: question,
      groupName: this.currentGroup.name,
      isCorrect,
    });
  }

  _handleFinish() {
    this.router.goto('final');
  }
}
