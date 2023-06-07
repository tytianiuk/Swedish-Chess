import { figureMoves } from "./figures/figureMoves.js";
import { figureTypes } from "./figures/figureTypes.js";

export default class Window {
  constructor(object, board){
    this.object = object;
    this.board = board;
  }

  showBoard(){
    this.object.innerHTML = '';
    for (const row of this.board.cells) {
      const rowHTML = document.createElement('div');
      rowHTML.classList.add('row');
      for (const cell of row) {
        const cellHTML = this.createCellHtml(cell);
        if(cell.figure) cellHTML.append(cell.figure);
        rowHTML.append(cellHTML);
      }
      this.object.prepend(rowHTML);
    }
  }

  createCellHtml(cell) {
    const cellHTML = document.createElement('div');
    cellHTML.className = `col ${cell.color}`;
    if (this.selected === cell) cellHTML.classList.add('selected');
    if (cell.checked) cellHTML.classList.add('checked-king');
    cellHTML.addEventListener('click', () => {
      if (this.selected === cell) {
        this.selected = null;
      } else if (this.selected && this.selected !== cell && this.selectedFigure && this.board.isEnemyFigure(cell, this.selectedFigure.color)){
         if (this.board.moveQueue === this.selectedFigure.color && this.canMove(this.selected, cell, this.board.moveQueue)) {
          this.move(this.selected, cell);
        }
        this.selected = null;
      } else {
        this.selectedFigure = cell.figure;
        this.selected = cell;
      }
      this.showBoard();
    });
    return cellHTML;
  }

  getAbsoluteCoordinates(startCell, endCell){
    const dy = Math.abs(startCell.y - endCell.y);
    const dx = Math.abs(startCell.x - endCell.x);
    return {dy, dx}
  }

  searchWay(startCell,endCell, dy, dx) {
    for (const moveType of figureMoves[startCell.figure.type]){
      if (moveType(dy, dx)){
        const emptyVertical = this.board.checkEmptyVertical(startCell, endCell);
        const emptyHorizontal = this.board.checkEmptyHorizontal(startCell, endCell);
        const emptyDiagonal = this.board.checkEmptyDiagonal(startCell, endCell);
        const isJumpKnight = this.board.checkJumpKnight(startCell, endCell);

        return emptyVertical && !dx || emptyHorizontal && !dy || emptyDiagonal && dx === dy || isJumpKnight;
      }
    }
    return false;
  }

  canMove(startCell, endCell) {
    const {dy ,dx} = this.getAbsoluteCoordinates(startCell, endCell);
    return this.searchWay(startCell,endCell, dy, dx);
  }

  move(startCell, endCell) {
    endCell.figure = startCell.figure;
    startCell.figure = 0;
    startCell.free = true;
    endCell.free = false;

    this.selectedFigure.isFirstMove = false;
    this.board.moveQueue = this.board.changeMoveQueue(this.board.moveQueue);
  }

} 