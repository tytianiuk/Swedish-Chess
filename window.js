import { figureMoves } from './figures/figureMoves.js';
import { figureTypes } from './figures/figureTypes.js';

export default class Window {
  constructor(object, board) {
    this.object = object;
    this.board = board;
  }

  showBoard() {
    this.object.innerHTML = '';
    for (const row of this.board.cells) {
      const rowHTML = document.createElement('div');
      rowHTML.classList.add('row');
      for (const cell of row) {
        const cellHTML = this.createCellHtml(cell);
        if (cell.figure) cellHTML.append(cell.figure);
        rowHTML.append(cellHTML);
      }
      this.object.prepend(rowHTML);
    }
  }

  createCellHtml(cell) {
    const cellHTML = document.createElement('div');
    cellHTML.className = `col ${cell.color} ${cell.x} ${cell.y}`;
    if (this.selected === cell) cellHTML.classList.add('selected');
    if (cell.checked) cellHTML.classList.add('checked-king');
    cellHTML.addEventListener('click', () => {
      if (this.selected === cell) {
        this.selected = null;
      } else if (this.selected && this.selected !== cell && this.selectedFigure && this.board.isEnemyFigure(cell, this.selectedFigure.color)) {
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

  createPanel(text) {
    const container = document.querySelector('.container');
    const panel = document.createElement('div');
    const panelText = document.createElement('p');
    const button = document.createElement('button');

    button.addEventListener('click', () => {
      panel.classList.add('hide');
      panelText.classList.add('hide');
      button.classList.add('hide');

      this.board.clearBoard();
      this.board.addFigure();
      this.showBoard();
    })

    panel.classList.add('panel');
    panelText.classList.add('text');
    button.classList.add('button-restart');

    panelText.textContent = `${text.toUpperCase()} WINS`;
    button.textContent = 'RESTART';

    container.append(panel);
    panel.append(panelText);
    panel.append(button);
  }

  //move methods

  canMove(startCell, endCell) {
    const { dy, dx } = this.getAbsoluteCoordinates(startCell, endCell);
    if (startCell.figure.type === figureTypes.k.type && dx === 2 && dy === 0) {
      const kingCell = this.getMyKingCell(startCell.figure.color);
      return this.board.kingCastleMove(startCell, endCell, kingCell);
    } else if (startCell.figure.type === figureTypes.k.type && this.isUnderAtack(endCell, startCell.figure.color)) {
      return false;
    } else if (startCell.figure.type === figureTypes.p.type) {
      if (this.board.pawnMoves(startCell, endCell, dx)) {
        return true;
      }
    } else
      return this.searchWay(startCell, endCell, dy, dx);
  }

  move(startCell, endCell) {
    this.clearCheck();
    endCell.figure = startCell.figure;
    startCell.figure = 0;
    startCell.free = true;
    endCell.free = false;
    if (this.checkWin(this.board.moveQueue)) {
      return false;
    }

    this.selectedFigure.isFirstMove = false;
    this.isCheckedKing(this.board.moveQueue);
    this.board.moveQueue = this.board.changeMoveQueue(this.board.moveQueue);
    this.isCheckedKing(this.board.moveQueue);
  }

  //check methods

  checkFigureMovies(startCell, endCell) {
    const { dy, dx } = this.getAbsoluteCoordinates(startCell, endCell);
    if (startCell.figure.type === figureTypes.k.type && dx === 2 && dy === 0) {
      const kingCell = this.getMyKingCell(startCell.figure.color);
      return this.board.kingCastleMove(startCell, endCell, kingCell);
    } else if (startCell.figure.type === figureTypes.p.type) {
      if (this.board.pawnBeatForKing(startCell, endCell, dx)) {
        return true;
      }
    } else
      return this.searchWay(startCell, endCell, dy, dx);
  }

  checkWin(moveQueue) {
    const kings = [];
    for (const row of this.board.cells) {
      for (const cell of row) {
        if (cell.figure.type === figureTypes.k.type) {
          kings.push(cell);
        }
      }
    }

    if (kings.length == 1) {
      this.createPanel(moveQueue);
      return true;
    }

  }

  //get methods

  getMyKingCell(color) {
    for (const row of this.board.cells) {
      for (const cell of row) {
        if (cell.figure.type === figureTypes.k.type && cell.figure.color === color) return cell;
      }
    }
  }

  getAbsoluteCoordinates(startCell, endCell) {
    const dy = Math.abs(startCell.y - endCell.y);
    const dx = Math.abs(startCell.x - endCell.x);
    return { dy, dx }
  }

  getCellsOfAttackingFigure(targetCell, color) {
    const cells = [];
    for (const row of this.board.cells) {
      for (const cell of row) {
        if (cell.figure && this.checkFigureMovies(cell, targetCell) && cell.figure.color !== color) {
          cells.push(cell);
        }
      }
    }
    return cells;
  }

  //another methods

  isCheckedKing(color) {
    const kingCell = this.getMyKingCell(color);
    const attackingFigureCells = this.getCellsOfAttackingFigure(kingCell, color);
    if (attackingFigureCells.length !== 0) {
      kingCell.checked = true;
      return kingCell.checked;
    }
  }

  isUnderAtack(targetCell, color) {
    if (this.getCellsOfAttackingFigure(targetCell, color).length !== 0) return true;
  }

  clearCheck() {
    for (const row of this.board.cells) {
      for (const cell of row) {
        if (cell.checked) cell.checked = false;
      }
    }
  }

  searchWay(startCell, endCell, dy, dx) {
    for (const moveType of figureMoves[startCell.figure.type]) {
      if (moveType(dy, dx)) {
        const emptyVertical = this.board.checkEmptyVertical(startCell, endCell);
        const emptyHorizontal = this.board.checkEmptyHorizontal(startCell, endCell);
        const emptyDiagonal = this.board.checkEmptyDiagonal(startCell, endCell);
        const isJumpKnight = this.board.checkJumpKnight(startCell, endCell);

        return emptyVertical && !dx || emptyHorizontal && !dy || emptyDiagonal && dx === dy || isJumpKnight;
      }
    }
    return false;
  }
}