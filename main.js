import Board from './board/board.js';
import Window from './window.js';

import { START_CHESS_POSITION } from './resource/position.js';

const boardHtml = document.querySelector('.board');
const board = new Board(START_CHESS_POSITION.numberVerticals, START_CHESS_POSITION.numberHorizontals);
board.addFigure();

const window = new Window(boardHtml, board);
window.showBoard();