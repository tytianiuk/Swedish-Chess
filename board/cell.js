export default class Cell {
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = 0;
    this.selected = null;
    this.selectedFigure = 0;
    this.free = true;
    this.checked = false;
  }
}