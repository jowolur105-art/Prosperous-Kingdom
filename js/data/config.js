// ===== Canvas =====
export const CANVAS_W = 1280;
export const CANVAS_H = 720;

// ===== Kingdom Assets =====
export const HOME_BG = 'assets/bg-home.webp';
export const BG_KINGDOM_ASSET = 'assets/bg-kingdom.webp';
export const DRAGON_ASSET = 'assets/dragon.png';
export const KNIGHT_ASSET = 'assets/knight.png';
export const GROUND_ASSET = 'assets/ground.webp';
export const BGM_ASSET = 'assets/bgm-kingdom.mp3';

// ===== Arcade Game Rules =====
export const TOTAL_ARCADE_QUESTIONS = 20; // Finish triggered only when 20 questions are answered

// ===== Physics =====
export const GROUND_Y = 560;
export const PLAYER_SCREEN_X = 300;
export const SPEEDS = { pelan: 200, normal: 240, cepat: 280 };
export const DEFAULT_SPEED = 'normal';
export const GRAVITY = 2200;       // px/s²
export const JUMP_V = 820;         // px/s (initial jump velocity)
export const COYOTE_TIME = 0.10;   // seconds after leaving ground where jump is still allowed
export const JUMP_BUFFER = 0.12;   // seconds before landing where jump input is buffered
export const MAX_DT = 0.05;        // 50 ms cap per frame to keep physics stable
export const PARALLAX_HILLS = 0.2;
export const PARALLAX_TREES = 0.5;

// ===== Player Character =====
export const WALK_PHASE_FACTOR = 0.045;   // phase += speed * dt * this
export const THIGH_SWING = 0.7;           // radians, max thigh angle
export const SHIN_BEND = 0.8;             // max shin bend factor
export const BODY_BOB = 4;                // px, vertical bob amplitude
export const SKIN_COLORS = ['#FDDCB5', '#F5C69E', '#E8A87C', '#C68642', '#8D5524', '#6B3A1F'];
export const HAIR_COLORS = ['#1A1A1A', '#3D2314', '#5C3317', '#8B4513', '#D4A76A', '#F5DEB3'];

// ===== Track Generation (Hard Mode) =====
export const START_SAFE_MIN = 600;
export const START_SAFE_MAX = 800;
export const GAP_MIN = 380;
export const GAP_MAX = 700;
export const HOLE_MIN = 8;
export const HOLE_MAX = 14;
export const HOLE_WIDTH_FACTOR_MIN = 0.58;
export const HOLE_WIDTH_FACTOR_MAX = 0.82;
export const FINISH_PADDING_MIN = 700;
export const FINISH_PADDING_MAX = 1000;
export const MAX_GENERATION_ATTEMPTS = 50;
export const GAP_MIN_RELAX = 100;

// ===== Track Validation =====
export const ANGEL_HOLE_MIN_DIST = 320;  // min px between dragon encounter point and nearest hole edge

// ===== Dragon (Naga Ekonomi) =====
export const ANGEL_ENCOUNTER_DIST = 260; // px, triggers encounter when player is within this distance
export const ANGEL_BLOCK_DIST = 170;     // px in front of player where dragon hovers
export const ANGEL_FLOAT_MIN = 160;      // min float height above ground
export const ANGEL_FLOAT_MAX = 220;      // max float height above ground
export const ANGEL_FLY_AWAY_DURATION = 1.3; // seconds (smooth majestic ascend)
export const ANGEL_PASTEL_COLORS = [
  '#E0C3FC', '#B5EAD7', '#FFDAC1', '#C7CEEA',
  '#FFB7B2', '#B5D8EB', '#F0E6EF', '#D4F0F0',
];

// ===== Hole =====
export const HOLE_WARNING_DIST = 250;  // px, warning sign distance before hole

// ===== Rising from Pit =====
export const RISE_DURATION = 0.9;    // seconds
export const RISE_OFFSET_X = 40;     // px past right edge of hole

// ===== Scoring (No Penalty System) =====
export const SCORE_ANGEL_CORRECT = 10;
export const SCORE_ANGEL_WRONG = 0;
export const SCORE_PIT_CORRECT = 0;
export const SCORE_PIT_WRONG = 0;
export const SCORE_MIN = 0;

// ===== Timer =====
export const DEFAULT_TIMER_SEC = 60;
export const TIMER_OPTIONS = [0, 45, 60, 90]; // 0 = off

// ===== Groups / Guilds =====
export const GROUP_MIN = 2;
export const GROUP_MAX = 6;
export const MEMBERS_MIN = 2;
export const MEMBERS_MAX = 10;

export const GROUP_THEMES = [
  { color: '#EF4444', symbol: '⚔️', name: 'Ksatria Merah' },
  { color: '#3B82F6', symbol: '🛡️', name: 'Penjaga Biru' },
  { color: '#F59E0B', symbol: '👑', name: 'Mahkota Emas' },
  { color: '#8B5CF6', symbol: '🔮', name: 'Penyihir Ungu' },
  { color: '#22C55E', symbol: '🏹', name: 'Pemanah Hijau' },
  { color: '#EC4899', symbol: '🦅', name: 'Garuda Mawar' },
];

// ===== Misc =====
export const STORAGE_KEY = 'kerajaanmakmur.v1';
