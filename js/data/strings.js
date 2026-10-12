/**
 * strings.js — All UI text and dialog strings (Bahasa Indonesia).
 */

export const STRINGS = {
  // Intro
  intro: [
    'Selamat datang di Prosperous Kingdom! Jelajahi jalan kerajaan menuju kejayaan ekonomi.',
    'Di tengah perjalanan, Naga Ekonomi akan menguji pemahamanmu tentang pelaku kegiatan ekonomi.',
    'Hati-hati dengan jurang kuno! Jawab teka-teki agar ksatria bangkit kembali. Selamat bertualang!',
  ],

  // Turn
  turnReady: (groupName, playerName) =>
    `Giliran ${groupName}. Pemain: ${playerName}. Tekan Spasi untuk mulai.`,

  // Angel encounter
  angelAppear: 'Tunggu! Aku punya pertanyaan untukmu.',

  // Fall into pit
  fallIntoPit: 'Kamu jatuh ke jurang! Jawab pertanyaan ini untuk naik kembali.',

  // Correct feedback (random pick)
  correctFeedback: [
    'Tepat sekali!',
    'Hebat, kelompok ini cerdas!',
    'Betul! Lanjutkan perjalanan!',
  ],

  // Wrong feedback (random pick)
  wrongFeedback: [
    'Belum tepat. Perhatikan penjelasannya.',
    'Hampir! Simak pembahasannya.',
  ],

  // Timeout
  timeoutFeedback: 'Waktu habis! Perhatikan jawaban yang benar.',

  // Change player
  changePlayer: (playerName) =>
    `Ganti pemain! Giliran ${playerName}. Tekan Spasi jika sudah siap.`,

  // Finish
  finish: 'Kalian tiba di Kota Ekonomi!',

  // Question dialog
  questionLabel: {
    malaikat: 'Malaikat Ekonomi bertanya…',
    jurang: 'Pertanyaan Jurang',
  },

  // Hint in question dialog
  discussHint: 'Diskusikan dengan kelompokmu.',

  // Lock answer button
  lockAnswer: 'Kunci Jawaban',

  // Continue button
  continueBtn: 'Lanjut',

  // Scoring text
  scorePlus: (n) => `+${n}`,
  scoreMinus: (n) => `${n}`,
  scoreZero: 'Tetap',
};
