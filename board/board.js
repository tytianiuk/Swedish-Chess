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

  clearBoard() {
    for (const row of this.cells) {
      for (const cell of row) {
        cell.figure = 0;
        cell.selected = null;
        cell.selectedFigure = 0;
        cell.free = true;
        cell.checked = false;
        this.moveQueue = COLORS.white;
      }
    }
  }

  getCell(y,x) {
    return this.cells[y][x];
  }

  addFigure(){
    this.directionPawn(COLORS.white);
    const splitedPosition = START_CHESS_POSITION.position.split('/');
    for(let y = 0; y < START_CHESS_POSITION.numberVerticals; y++){
      for(let x = 0; x < START_CHESS_POSITION.numberHorizontals; x++) {
        if(figureTypes[splitedPosition[y][x]] !== null) {
          const figure = new Figure(figureTypes[splitedPosition[y][x]]);
          this.cells[y][x].figure = this.createImageFigure(figure);
          this.cells[y][x].free = false;
        }
      }
    }
  }

  createImageFigure(figure){
    const img = document.createElement('img');
    img.classList.add('figure');
    img.src = figure.src;
    img.color = figure.color;
    img.type = figure.type;
    img.isFirstMove = true;
    return img;
  }

}