import Board from './board/board.js';

import { START_CHESS_POSITION } from './position.js';

const boardHtml = document.querySelector('.board');
const board = new Board(START_CHESS_POSITION.numberVerticals, START_CHESS_POSITION.numberHorizontals);
board.addFigure();