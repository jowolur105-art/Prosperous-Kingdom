/**
 * engine.js — Kingdom Arcade Engine:
 * Endless arcade track generator, continuous dragon encounters and pit obstacles,
 * and game completion condition based solely on 20 total questions answered.
 */
import {
  CANVAS_W, CANVAS_H, GROUND_Y, PLAYER_SCREEN_X,
  SPEEDS, MAX_DT, ANGEL_ENCOUNTER_DIST, ANGEL_BLOCK_DIST,
  ANGEL_FLY_AWAY_DURATION, RISE_OFFSET_X, TOTAL_ARCADE_QUESTIONS,
} from '../data/config.js';
import { Player } from './player.js';
import {
  drawSky, drawClouds, drawHills, drawGround,
  drawHoleWarnings, drawPlayer, drawAngel, initScenery,
} from './draw.js';
import { drawHUD } from './hud.js';
import { sfxAngel, sfxFall, sfxRise, sfxFanfare } from '../audio.js';

export class Engine {
  constructor(canvas, ctx, options = {}) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.onAngelEncounter = options.onAngelEncounter || (() => {});
    this.onPitFall = options.onPitFall || (() => {});
    this.onFinish = options.onFinish || (() => {});

    this.running = false;
    this.paused = false;
    this.lastTime = 0;
    this.animTime = 0;

    this.track = null;
    this.group = null;
    this.speed = SPEEDS.normal;
    this.player = null;
    this.cameraX = 0;
    this.answeredCount = 0;

    // Encounters
    this.activeAngel = null;
    this.angelState = 'none'; // 'none' | 'gliding' | 'dialog' | 'flying_away'
    this.angelGlideProgress = 0;
    this.angelFlyProgress = 0;
    this.encounteredAngels = new Set();
    this.fellHoles = new Set();
    this.lastSpawnX = 1000;

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handlePointerDown = this._handlePointerDown.bind(this);
    this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
  }

  initRun(track, group, speedKey = 'normal', answeredCount = 0) {
    this.track = track;
    this.group = group;
    this.speed = SPEEDS[speedKey] || SPEEDS.normal;
    this.answeredCount = answeredCount;

    initScenery();

    this.player = new Player({
      shirtColor: group?.color || '#3B82F6',
    });

    this.cameraX = 0;
    this.animTime = 0;
    this.encounteredAngels.clear();
    this.fellHoles.clear();
    this.activeAngel = null;
    this.angelState = 'none';
    this.paused = false;
    this.finished = false;

    // Find furthest spawned obstacle
    this.lastSpawnX = Math.max(
      1500,
      ...this.track.angels.map(a => a.x),
      ...this.track.holes.map(h => h.x)
    );
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    this._attachInputs();
    requestAnimationFrame((t) => this._loop(t));
  }

  stop() {
    this.running = false;
    this._detachInputs();
  }

  togglePause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.lastTime = performance.now();
    }
  }

  updatePlayerMember(playerName) {
    if (this.group) {
      this.group.activePlayer = playerName;
    }
  }

  _loop(time) {
    if (!this.running) return;

    const rawDt = (time - this.lastTime) / 1000;
    this.lastTime = time;
    const dt = Math.min(rawDt, MAX_DT);

    if (!this.paused) {
      this.animTime += dt;
      this._update(dt);
    }

    this._render();
    requestAnimationFrame((t) => this._loop(t));
  }

  _update(dt) {
    if (!this.player || !this.track) return;

    // 1. Check Dragon (Naga) Encounter
    if (this.angelState === 'none') {
      for (const angel of this.track.angels) {
        if (!this.encounteredAngels.has(angel)) {
          const dist = angel.x - this.player.x;
          if (dist > 0 && dist <= ANGEL_ENCOUNTER_DIST) {
            this.activeAngel = angel;
            this.angelState = 'gliding';
            this.angelGlideProgress = 0;
            this.encounteredAngels.add(angel);
            sfxAngel();
            break;
          }
        }
      }
    }

    // 2. Dragon gliding toward player
    if (this.angelState === 'gliding') {
      this.angelGlideProgress += dt / 0.45;
      if (this.angelGlideProgress >= 1) {
        this.angelGlideProgress = 1;
        this.angelState = 'dialog';
        this.onAngelEncounter(this.activeAngel);
      }
    }

    // 3. Dragon flying away after answered
    if (this.angelState === 'flying_away') {
      this.angelFlyProgress += dt / ANGEL_FLY_AWAY_DURATION;
      if (this.angelFlyProgress >= 1) {
        this.angelFlyProgress = 0;
        this.angelState = 'none';
        if (this.activeAngel) {
          this.activeAngel.hasFlownAway = true;
        }
        this.activeAngel = null;
      }
    }

    const isInteractionPaused = (this.angelState === 'gliding' || this.angelState === 'dialog');

    // 4. Update Player
    this.player.update(dt, this.speed, this.track.holes, isInteractionPaused);

    // 5. Pit Fall Check
    if (this.player.isFalling && this.player.y > CANVAS_H + 30) {
      const fellHole = this.track.holes.find(h => (
        this.player.x >= h.x - 20 && this.player.x <= h.x + h.width + 20
      ));

      if (fellHole && !this.fellHoles.has(fellHole)) {
        this.fellHoles.add(fellHole);
        sfxFall();
        this.onPitFall(fellHole);
      }
    }

    // 6. Camera follows Knight
    this.cameraX = this.player.x - PLAYER_SCREEN_X;

    // 7. Dynamic Endless Arcade Spawn: keep generating obstacles ahead
    if (this.player.x + 2500 > this.lastSpawnX && this.answeredCount < TOTAL_ARCADE_QUESTIONS) {
      this._spawnNextArcadeObstacles();
    }

    // 8. Arcade Completion Check: Finish ONLY when 20 questions answered!
    if (this.answeredCount >= TOTAL_ARCADE_QUESTIONS && !this.finished) {
      this.finished = true;
      sfxFanfare();
      this.onFinish();
    }
  }

  /** Spawn additional obstacles along the endless arcade track (Hard & Exciting) */
  _spawnNextArcadeObstacles() {
    const spacing = 420 + Math.random() * 360;
    this.lastSpawnX += spacing;

    // Balanced: 50% chance dragon encounter, 50% hole
    const spawnDragon = Math.random() > 0.50;
    if (spawnDragon) {
      this.track.angels.push({
        x: this.lastSpawnX,
        floatH: 180 + Math.random() * 40,
        animTime: 0,
      });
    } else {
      const jDist = this.speed * (2 * 820 / 2200);
      const width = Math.round(jDist * (0.60 + Math.random() * 0.22));
      this.track.holes.push({
        x: this.lastSpawnX,
        width,
      });
      this.lastSpawnX += width;

      // 25% chance of double-pit sequence for extra excitement
      if (Math.random() < 0.25) {
        const landingStrip = 190 + Math.random() * 50;
        this.lastSpawnX += landingStrip;
        const secondWidth = Math.round(jDist * (0.58 + Math.random() * 0.20));
        this.track.holes.push({
          x: this.lastSpawnX,
          width: secondWidth,
        });
        this.lastSpawnX += secondWidth;
      }
    }
  }

  resumeAfterAngel() {
    if (this.angelState === 'dialog') {
      this.angelState = 'flying_away';
      this.angelFlyProgress = 0;
    }
  }

  resumeAfterPit(hole) {
    const targetX = hole ? (hole.x + hole.width + RISE_OFFSET_X) : (this.player.x + 120);
    sfxRise();
    this.player.startRise(targetX);
  }

  _render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    if (!this.track) return;

    // 1. Sky & Castle Kingdom Background
    drawSky(ctx, this.cameraX);
    drawClouds(ctx, this.cameraX, this.animTime);

    // 2. Parallax Haze
    drawHills(ctx, this.cameraX);

    // 3. Ground & Pit Chasms
    drawGround(ctx, this.cameraX, this.track.holes);
    drawHoleWarnings(ctx, this.cameraX, this.track.holes);

    // 4. Dragons (Naga Ekonomi)
    for (const a of this.track.angels) {
      if (a.hasFlownAway) continue;

      let screenX;
      let flyProgress = 0;

      if (a === this.activeAngel) {
        if (this.angelState === 'gliding') {
          const startX = a.x - this.cameraX;
          const targetX = PLAYER_SCREEN_X + ANGEL_BLOCK_DIST;
          screenX = startX + (targetX - startX) * this.angelGlideProgress;
        } else if (this.angelState === 'dialog') {
          screenX = PLAYER_SCREEN_X + ANGEL_BLOCK_DIST;
        } else if (this.angelState === 'flying_away') {
          screenX = PLAYER_SCREEN_X + ANGEL_BLOCK_DIST;
          flyProgress = this.angelFlyProgress;
        } else {
          screenX = a.x - this.cameraX;
        }
      } else {
        screenX = a.x - this.cameraX;
      }

      if (screenX > -150 && screenX < CANVAS_W + 150) {
        drawAngel(ctx, screenX, GROUND_Y, {
          ...a,
          animTime: this.animTime,
          flyAway: flyProgress,
        });
      }
    }

    // 5. Knight Player
    const playerScreenX = this.player.x - this.cameraX;
    drawPlayer(ctx, playerScreenX, this.player.y, {
      phase: this.player.phase,
      isGrounded: this.player.isGrounded,
      isFalling: this.player.isFalling,
      fallAngle: this.player.fallAngle,
    });

    // 6. HUD (Arcade 20 Questions Progress)
    drawHUD(ctx, {
      groupName: this.group?.name || 'Ksatria Kerajaan',
      groupColor: this.group?.color || '#3B82F6',
      groupSymbol: this.group?.symbol || '⚔️',
      score: this.group?.score || 0,
      playerName: this.group?.activePlayer || 'Ksatria 1',
      answeredCount: this.answeredCount,
      totalQuestions: TOTAL_ARCADE_QUESTIONS,
    });
  }

  _attachInputs() {
    window.addEventListener('keydown', this._handleKeyDown);
    window.addEventListener('pointerdown', this._handlePointerDown);
    document.addEventListener('visibilitychange', this._handleVisibilityChange);
  }

  _detachInputs() {
    window.removeEventListener('keydown', this._handleKeyDown);
    window.removeEventListener('pointerdown', this._handlePointerDown);
    document.removeEventListener('visibilitychange', this._handleVisibilityChange);
  }

  _handleKeyDown(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      if (this.player) this.player.requestJump();
    } else if (e.code === 'KeyP') {
      this.togglePause();
    }
  }

  _handlePointerDown(e) {
    // Ignore clicks if clicking inside UI buttons, links, or modals (except our jump button)
    if (e && e.target) {
      if (e.target.closest('#global-mute-btn') ||
          e.target.closest('.question-backdrop') ||
          e.target.closest('.teacher-panel') ||
          e.target.closest('select') ||
          e.target.closest('input') ||
          (e.target.closest('button') && !e.target.closest('#mobile-jump-btn'))) {
        return;
      }
    }

    if (this.player) {
      this.player.requestJump();
      if (navigator.vibrate) {
        try { navigator.vibrate(15); } catch (_) {}
      }
    }
  }

  _handleVisibilityChange() {
    if (document.hidden && this.running && !this.paused) {
      this.togglePause();
    }
  }
}
