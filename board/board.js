import Cell from './cell.js';
import Figure from '../figures/figure.js';

import { COLORS } from '../resource/colors.js';
import { figureTypes } from '../figures/figureTypes.js';
import { figureMoves } from '../figures/figureMoves.js';
import { START_CHESS_POSITION } from '../resource/position.js';

export default class Board {
  constructor(x, y) {
    this.numberCellWidth = x;
    this.numberCellHeight = y;
    this.cells = this.createBoard();
    this.directionForPawn = 1;
    this.moveQueue = COLORS.white;
  }

  createBoard() {
    const cells = [];
    for(let y = 0; y < this.numberCellHeight; y++) {
      const row = [];
      for(let x = 0; x < this.numberCellWidth; x++){
        row.push(new Cell(x, y, (x + y) % 2 === 0 ? COLORS.black : COLORS.white));
      }
      cells.push(row);
    }
    console.log(cells);
    return cells;
  }
}