/**
 * hud.js — Kingdom Arcade HUD:
 * Displays active Guild/Group, Score, Active Knight Player,
 * and Arcade Progress (Total Answered Questions: X / 20).
 */
import { CANVAS_W, CANVAS_H, TOTAL_ARCADE_QUESTIONS } from '../data/config.js';

export function drawHUD(ctx, info) {
  const {
    score = 0,
    answeredCount = 0,
    totalQuestions = TOTAL_ARCADE_QUESTIONS,
  } = info;

  ctx.save();

  // Subtle clean text-shadow for readability over game background
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Tengah: Soal Terjawab
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "MedievalSharp", "Cinzel", "Segoe UI", sans-serif';
  ctx.fillText(`Soal Terjawab: ${answeredCount} / ${totalQuestions}`, CANVAS_W / 2, 42);

  ctx.restore();
}
