import { COLORS } from "../resource/colors.js";

export const figureTypes = {
  K: {
    type: 'king',
    color: COLORS.white,
    src: './resource/image/white_king.png',
  },
  k: {
    type: 'king',
    color: COLORS.black,
    src: './resource/image/black_king.png',
  },
  Q: {
    type: 'queen',
    color: COLORS.white,
    src: './resource/image/white_queen.png',
  },
  q: {
    type: 'queen',
    color: COLORS.black,
    src: './resource/image/black_queen.png',
  },
  R: {
    type: 'rook',
    color: COLORS.white,
    src: './resource/image/white_rook.png',
  },
  r: {
    type: 'rook',
    color: COLORS.black,
    src: './resource/image/black_rook.png',
  },
  B: {
    type: 'bishop',
    color: COLORS.white,
    src: './resource/image/white_bishop.png',
  },
  b: {
    type: 'bishop',
    color: COLORS.black,
    src: './resource/image/black_bishop.png',
  },
  N: {
    type: 'knight',
    color: COLORS.white,
    src: './resource/image/white_knight.png',
  },
  n: {
    type: 'knight',
    color: COLORS.black,
    src: './resource/image/black_knight.png',
  },
  P: {
    type: 'pawn',
    color: COLORS.white,
    src: './resource/image/white_pawn.png',
  },
  p: {
    type: 'pawn',
    color: COLORS.black,
    src: './resource/image/black_pawn.png',
  },
  0: null,
}