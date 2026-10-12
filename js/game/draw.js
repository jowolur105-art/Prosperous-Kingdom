/**
 * draw.js — Kingdom Arcade Asset & Canvas Renderer:
 * Multi-frame knight running animation cycle (alternating legs, swinging arms/sword),
 * hovering dragon guardian with stardust aura, cobblestone road, and panoramic castle background.
 */
import {
  CANVAS_W, CANVAS_H, GROUND_Y,
  BG_KINGDOM_ASSET, DRAGON_ASSET, GROUND_ASSET,
} from '../data/config.js';

// Preload kingdom image assets
export const assets = {
  bgKingdom: new Image(),
  dragon: new Image(),
  ground: new Image(),
  knightFrames: [new Image(), new Image(), new Image(), new Image()],
  loaded: { bg: false, dragon: false, ground: false, knight: [false, false, false, false] },
};

assets.bgKingdom.src = BG_KINGDOM_ASSET;
assets.bgKingdom.onload = () => { assets.loaded.bg = true; };

assets.dragon.src = DRAGON_ASSET;
assets.dragon.onload = () => { assets.loaded.dragon = true; };

assets.ground.src = GROUND_ASSET + '?v=10';
assets.ground.onload = () => { assets.loaded.ground = true; };

// Preload 4 knight running cycle frames
for (let i = 0; i < 4; i++) {
  assets.knightFrames[i].src = `assets/knight_${i}.png?v=10`;
  assets.knightFrames[i].onload = () => { assets.loaded.knight[i] = true; };
}

let clouds = [];

export function initScenery() {
  clouds = [];
  for (let i = 0; i < 10; i++) {
    clouds.push({
      x: (i * 220) + ((i * 43) % 150),
      y: 40 + ((i * 31) % 110),
      scale: 0.7 + ((i * 13) % 5) * 0.1,
      speedFactor: 0.12 + ((i * 17) % 10) * 0.01,
      opacity: 0.65 + ((i * 11) % 25) * 0.01,
    });
  }
}

/** Draw sky and panoramic castle kingdom background */
export function drawSky(ctx, cameraX = 0) {
  if (assets.loaded.bg) {
    const bgW = 1920;
    const bgH = 1080;
    const drawH = GROUND_Y + 40;
    const drawW = (drawH / bgH) * bgW;

    const scrollX = -(cameraX * 0.18) % drawW;
    ctx.drawImage(assets.bgKingdom, scrollX, 0, drawW, drawH);
    ctx.drawImage(assets.bgKingdom, scrollX + drawW - 1, 0, drawW, drawH);
    if (scrollX > 0) {
      ctx.drawImage(assets.bgKingdom, scrollX - drawW + 1, 0, drawW, drawH);
    }
  } else {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGrad.addColorStop(0, '#38BDF8');
    skyGrad.addColorStop(0.6, '#93C5FD');
    skyGrad.addColorStop(1, '#FEF08A');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_W, GROUND_Y);
  }
}

/** Draw floating fantasy clouds */
export function drawClouds(ctx, cameraX, animTime) {
  if (clouds.length === 0) initScenery();

  ctx.fillStyle = '#FFFFFF';
  for (const cloud of clouds) {
    const screenX = ((cloud.x - cameraX * cloud.speedFactor + animTime * 12 * cloud.speedFactor) % (CANVAS_W + 300));
    const renderX = screenX < -150 ? screenX + CANVAS_W + 300 : screenX;

    ctx.save();
    ctx.globalAlpha = cloud.opacity;
    ctx.translate(renderX, cloud.y);
    ctx.scale(cloud.scale, cloud.scale);

    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.arc(26, -8, 22, 0, Math.PI * 2);
    ctx.arc(50, 2, 24, 0, Math.PI * 2);
    ctx.arc(22, 10, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

export function drawHills(ctx, cameraX) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fillRect(0, GROUND_Y - 140, CANVAS_W, 140);
  ctx.restore();
}

export function drawScenery(ctx, cameraX) {}

/** Draw kingdom ground and pit chasms */
export function drawGround(ctx, cameraX, holes = []) {
  const visibleLeft = cameraX - 50;
  const visibleRight = cameraX + CANVAS_W + 50;

  const visibleHoles = holes.filter(h => (h.x + h.width >= visibleLeft && h.x <= visibleRight));

  const segments = [];
  let currentX = visibleLeft;

  for (const h of visibleHoles) {
    if (h.x > currentX) {
      segments.push({ start: currentX, end: h.x });
    }
    currentX = Math.max(currentX, h.x + h.width);
  }
  if (currentX < visibleRight) {
    segments.push({ start: currentX, end: visibleRight });
  }

  for (const seg of segments) {
    const screenX1 = seg.start - cameraX;
    const width = seg.end - seg.start;
    if (width <= 0) continue;

    if (assets.loaded.ground) {
      const groundH = CANVAS_H - GROUND_Y + 14;
      const tileW = 400;

      ctx.save();
      ctx.beginPath();
      ctx.rect(screenX1, GROUND_Y - 12, width, groundH);
      ctx.clip();

      const startTile = Math.floor(seg.start / tileW) * tileW;
      for (let tx = startTile; tx < seg.end; tx += tileW) {
        const sx = tx - cameraX;
        ctx.drawImage(assets.ground, sx, GROUND_Y - 12, tileW, groundH);
      }
      ctx.restore();
    } else {
      const grassGrad = ctx.createLinearGradient(0, GROUND_Y - 10, 0, GROUND_Y + 8);
      grassGrad.addColorStop(0, '#22C55E');
      grassGrad.addColorStop(1, '#15803D');
      ctx.fillStyle = grassGrad;
      ctx.fillRect(screenX1, GROUND_Y - 10, width, 18);

      const dirtGrad = ctx.createLinearGradient(0, GROUND_Y + 8, 0, CANVAS_H);
      dirtGrad.addColorStop(0, '#78350F');
      dirtGrad.addColorStop(1, '#291405');
      ctx.fillStyle = dirtGrad;
      ctx.fillRect(screenX1, GROUND_Y + 8, width, CANVAS_H - GROUND_Y - 8);
    }
  }

  // Draw Pit Chasms
  for (const h of visibleHoles) {
    const holeSx = h.x - cameraX;
    const holeSw = h.width;

    const pitGrad = ctx.createLinearGradient(0, GROUND_Y, 0, CANVAS_H);
    pitGrad.addColorStop(0, '#1E1B18');
    pitGrad.addColorStop(0.3, '#0A0908');
    pitGrad.addColorStop(1, '#000000');
    ctx.fillStyle = pitGrad;
    ctx.fillRect(holeSx, GROUND_Y - 6, holeSw, CANVAS_H - GROUND_Y + 6);

    ctx.fillStyle = '#451A03';
    ctx.beginPath();
    ctx.moveTo(holeSx, GROUND_Y - 8);
    ctx.lineTo(holeSx + 8, GROUND_Y + 25);
    ctx.lineTo(holeSx, GROUND_Y + 60);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(holeSx + holeSw, GROUND_Y - 8);
    ctx.lineTo(holeSx + holeSw - 8, GROUND_Y + 25);
    ctx.lineTo(holeSx + holeSw, GROUND_Y + 60);
    ctx.closePath();
    ctx.fill();
  }
}

/** Draw warning signs before pits */
export function drawHoleWarnings(ctx, cameraX, holes = []) {
  for (const h of holes) {
    const signWorldX = h.x - 250;
    const signSx = signWorldX - cameraX;

    if (signSx < -60 || signSx > CANVAS_W + 60) continue;

    ctx.save();
    ctx.fillStyle = '#475569';
    ctx.fillRect(signSx - 3, GROUND_Y - 48, 6, 48);

    const signY = GROUND_Y - 55;
    ctx.beginPath();
    ctx.moveTo(signSx, signY - 24);
    ctx.lineTo(signSx + 20, signY + 12);
    ctx.lineTo(signSx - 20, signY + 12);
    ctx.closePath();
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#92400E';
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', signSx, signY);

    ctx.restore();
  }
}

/**
 * Draw Knight character with active 4-frame running animation cycle.
 * Alternates legs and arms continuously with walking phase!
 */
export function drawPlayer(ctx, screenX, y, anim) {
  const {
    phase = 0,
    isGrounded = true,
    isFalling = false,
    fallAngle = 0,
  } = anim;

  ctx.save();
  ctx.translate(screenX, y);

  if (isFalling) {
    ctx.rotate(fallAngle || 0.3);
  }

  // Running bobbing motion
  const bobY = isGrounded ? -Math.abs(Math.sin(phase)) * 4 : 0;
  ctx.translate(0, bobY);

  // Determine current animation frame (0, 1, 2, 3)
  let frameIdx = 0;
  if (!isGrounded && !isFalling) {
    // Jump pose: Frame 0 (sword raised, forward leap)
    frameIdx = 0;
    ctx.rotate(-0.1);
  } else if (isFalling) {
    // Fall pose: Frame 2
    frameIdx = 2;
  } else {
    // Walk / Run cycle: cycle frames 0 -> 1 -> 2 -> 3 -> 0 smoothly
    frameIdx = Math.floor((phase * 1.5) % 4);
  }

  const knightImg = assets.knightFrames[frameIdx];
  const isLoaded = assets.loaded.knight[frameIdx];

  if (isLoaded && knightImg) {
    // Render full-body knight frame centered on feet
    const kw = 125;
    const kh = 125;
    ctx.drawImage(knightImg, -kw / 2, -kh + 6, kw, kh);
  } else {
    // Procedural fallback
    ctx.fillStyle = '#64748B';
    ctx.fillRect(-14, -58, 28, 30);
    ctx.fillStyle = '#FCD34D';
    ctx.beginPath();
    ctx.arc(0, -70, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draw Dragon (Naga Ekonomi).
 */
export function drawAngel(ctx, screenX, y, angel) {
  const {
    floatH = 190,
    animTime = 0,
    flyAway = 0,
  } = angel;

  const hoverY = y - floatH + Math.sin(animTime * 3) * 10 - (flyAway * 350);
  const hoverX = screenX + (flyAway * 250);

  ctx.save();
  ctx.translate(hoverX, hoverY);

  if (flyAway > 0) {
    ctx.globalAlpha = Math.max(0, 1 - flyAway);
  }

  // Magical aura glow around dragon
  const auraGlow = ctx.createRadialGradient(0, -10, 10, 0, -10, 80);
  auraGlow.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  auraGlow.addColorStop(0.5, 'rgba(16, 185, 129, 0.25)');
  auraGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
  ctx.fillStyle = auraGlow;
  ctx.beginPath();
  ctx.arc(0, -10, 80, 0, Math.PI * 2);
  ctx.fill();

  // Floating stardust magic sparkles
  ctx.fillStyle = '#FDE047';
  for (let s = 0; s < 5; s++) {
    const sx = Math.sin(animTime * 4 + s * 1.5) * 45;
    const sy = -20 + Math.cos(animTime * 3 + s * 2) * 35;
    ctx.beginPath();
    ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (assets.loaded.dragon) {
    const dw = 140;
    const dh = 140;
    ctx.drawImage(assets.dragon, -dw / 2, -dh / 2 - 10, dw, dh);
  } else {
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(0, -20, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
