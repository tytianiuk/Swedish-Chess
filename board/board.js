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

  directionPawn(color) {
    const white = color === COLORS.white ? 1 : -1;
    this.directionForPawn = { white, black: -white };
  }

  checkEmptyVertical(startCell, endCell){
    if(startCell === endCell || startCell.x !== endCell.x) return false;
    const minY = Math.min(startCell.y, endCell.y);
    const maxY = Math.max(startCell.y, endCell.y);
    
    for( let y = minY + 1; y < maxY; y++){
      if (!(this.getCell(y, startCell.x).free)) {
        return false;
      }
    }
    return true;
  }

  checkEmptyHorizontal(startCell, endCell){
    if(startCell === endCell || startCell.y !== endCell.y) return false;
    const minX = Math.min(startCell.x, endCell.x);
    const maxX = Math.max(startCell.x, endCell.x);
    
    for( let x = minX + 1; x < maxX; x++){
      if (!(this.getCell(startCell.y, x).free)) {
        return false;
      }
    }
    return true;
  }

  checkEmptyDiagonal(startCell, endCell){
    if(startCell === endCell) return false;
    const dy = Math.abs(startCell.y - endCell.y);
    const dx = Math.abs(startCell.x - endCell.x);
    const x = (endCell.x > startCell.x) ? 1 : -1;
    const y = (endCell.y > startCell.y) ? 1 : -1;

    if(dy !== dx) return false;

    for( let i = 1; i < dx; i++){
      if (!(this.getCell(i * y + startCell.y, i * x + startCell.x).free)) {
        return false;
      }
    }
    return true;
  }

  checkJumpKnight(startCell, endCell){
    const dy = Math.abs(startCell.y - endCell.y);
    const dx = Math.abs(startCell.x - endCell.x);

    for(const moveType of figureMoves[figureTypes.n.type]) {
      if(moveType(dy, dx)) return true;
    }
    return false;
  }

  pawnMoves(startCell, endCell, dx) {
    const direction = this.directionForPawn[startCell.figure.color];
    const isPawnMove = figureMoves[figureTypes.p.type].move(startCell, endCell, direction, dx);
    const isPawnDoubleMove = figureMoves[figureTypes.p.type].doubleMove(startCell, endCell, direction, dx);
    const isPawnBeat  = figureMoves[figureTypes.p.type].beatMove(startCell, endCell, direction, dx);
    if ((isPawnMove || isPawnDoubleMove) && endCell.free) return true;
    if (isPawnBeat && this.isEnemyForPawn(endCell, startCell.figure.color)) return true;
  }

  pawnBeatForKing(startCell, endCell, dx) {
    const direction = this.directionForPawn[startCell.figure.color];
    const isPawnBeat  = figureMoves['pawn'].beatMove(startCell, endCell, direction, dx);
    if (isPawnBeat) return true;
  }

  kingCastleMove(startCell, endCell, kingCell){
    const dx = startCell.x - endCell.x;
    const newX = ( startCell.x + endCell.x ) / 2;
    const longRookCell = this.cells[kingCell.y][0];
    const shortRookCell = this.cells[kingCell.y][7];
    const newCellForRook = this.cells[kingCell.y][newX];
    const emptyHorizontal = this.checkEmptyHorizontal(startCell, endCell);

    if(kingCell.figure.isFirstMove && emptyHorizontal) {
      if(dx > 0 && longRookCell.figure.isFirstMove) {
        return this.moveRookForCastle(longRookCell, newCellForRook);
        
      } else if (shortRookCell.figure.isFirstMove) {
        return this.moveRookForCastle(shortRookCell, newCellForRook);
      }
    } 
  }
  
  moveRookForCastle(startCell, endCell) {
    endCell.figure = startCell.figure;
    startCell.figure = 0;
    startCell.free = true;
    endCell.free = false;

    return true;
  }

  isEnemyForPawn(cell, color){
    return (cell.figure && cell.figure.color != color) ? true : false;
  }

  isEnemyFigure(cell, color){
    return (cell.figure.color != color) ? true : false;
  }

  changeMoveQueue(moveQueue){
    return moveQueue = moveQueue === COLORS.white ? COLORS.black : COLORS.white;
  }

}