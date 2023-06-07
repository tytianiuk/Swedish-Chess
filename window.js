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
  
} 