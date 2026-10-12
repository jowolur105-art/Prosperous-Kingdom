/**
 * player.js — Player character physics, input handling, and walk/jump animation.
 */
import {
  GROUND_Y, GRAVITY, JUMP_V, COYOTE_TIME, JUMP_BUFFER,
  WALK_PHASE_FACTOR, RISE_DURATION, RISE_OFFSET_X,
  SKIN_COLORS, HAIR_COLORS,
} from '../data/config.js';
import { sfxJump, sfxLand } from '../audio.js';

export class Player {
  constructor(options = {}) {
    this.x = 0;              // world X position
    this.y = GROUND_Y;      // feet Y position
    this.vy = 0;             // vertical velocity (px/s)
    this.isGrounded = true;

    // Animation & appearance
    this.phase = 0;          // walk cycle phase
    this.isFalling = false;  // falling into a pit
    this.fallAngle = 0;
    this.isRising = false;   // ascending back after pit
    this.riseProgress = 0;   // 0 to 1
    this.riseStartX = 0;
    this.riseTargetX = 0;

    // Appearance
    this.shirtColor = options.shirtColor || '#3B82F6';
    this.skinColor = options.skinColor || SKIN_COLORS[0];
    this.hairColor = options.hairColor || HAIR_COLORS[0];

    // Timers
    this.coyoteTimer = 0;    // remaining seconds coyote jump is valid
    this.jumpBufferTimer = 0;// remaining seconds jump press is buffered
  }

  /** Randomize skin and hair for player change */
  randomizeAppearance(shirtColor) {
    if (shirtColor) this.shirtColor = shirtColor;
    this.skinColor = SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)];
    this.hairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
  }

  /** Queue jump request (from Space, ArrowUp, Click, Touch) */
  requestJump() {
    if (this.isFalling || this.isRising) return;

    if (this.isGrounded || this.coyoteTimer > 0) {
      this._executeJump();
    } else {
      // Buffer jump input
      this.jumpBufferTimer = JUMP_BUFFER;
    }
  }

  _executeJump() {
    this.vy = -JUMP_V;
    this.isGrounded = false;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    sfxJump();
  }

  /**
   * Update player physics for a frame.
   * @param {number} dt - delta time in seconds
   * @param {number} speed - horizontal speed px/s
   * @param {Array} holes - track holes [{ x, width }]
   * @param {boolean} isPaused - if gameplay movement is paused (e.g. angel dialog)
   */
  update(dt, speed, holes = [], isPaused = false) {
    // Handling rising animation
    if (this.isRising) {
      this.riseProgress += dt / RISE_DURATION;
      if (this.riseProgress >= 1) {
        this.riseProgress = 1;
        this.isRising = false;
        this.isFalling = false;
        this.x = this.riseTargetX;
        this.y = GROUND_Y;
        this.vy = 0;
        this.isGrounded = true;
      } else {
        // Smooth ease-out cubic
        const t = this.riseProgress;
        const easeOut = 1 - Math.pow(1 - t, 3);
        this.x = this.riseStartX + (this.riseTargetX - this.riseStartX) * easeOut;
        // Float upward from pit to ground level
        this.y = GROUND_Y + (1 - easeOut) * 160;
      }
      return;
    }

    if (isPaused) return;

    // 1. Advance horizontal position
    if (!this.isFalling) {
      this.x += speed * dt;
      if (this.isGrounded) {
        this.phase += speed * dt * WALK_PHASE_FACTOR;
      }
    }

    // 2. Check if player stepped into a hole
    let overHole = null;
    for (const h of holes) {
      // Give a tiny 12px margin so walking near edge is forgiving
      if (this.x > h.x + 10 && this.x < h.x + h.width - 10) {
        overHole = h;
        break;
      }
    }

    // 3. Vertical physics
    if (overHole && this.y >= GROUND_Y) {
      // Drop into pit
      this.isGrounded = false;
      this.isFalling = true;
      this.fallAngle = Math.min(0.6, (this.fallAngle || 0) + dt * 2.5);
    }

    if (!this.isGrounded) {
      // Apply gravity
      this.vy += GRAVITY * dt;
      this.y += this.vy * dt;

      // Decrement coyote time
      if (this.coyoteTimer > 0) {
        this.coyoteTimer -= dt;
      }

      // Check landing on solid ground (when not falling into a hole)
      if (!this.isFalling && this.y >= GROUND_Y) {
        this.y = GROUND_Y;
        this.vy = 0;
        this.isGrounded = true;
        this.coyoteTimer = 0;
        sfxLand();

        // Check if a jump was buffered right before landing
        if (this.jumpBufferTimer > 0) {
          this._executeJump();
        }
      }
    } else {
      // On ground: keep coyote timer ready if walking off edge
      if (overHole) {
        this.coyoteTimer = 0;
      } else {
        this.coyoteTimer = COYOTE_TIME;
      }
    }

    // Decrement jump buffer
    if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer -= dt;
    }
  }

  /** Trigger start of rising animation back to surface */
  startRise(targetX) {
    this.isRising = true;
    this.riseProgress = 0;
    this.riseStartX = this.x;
    this.riseTargetX = targetX;
  }
}
