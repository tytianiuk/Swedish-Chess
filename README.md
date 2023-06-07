# Swedish-Chess
The project is created by using JavaScript, HTML, CSS. It is dangerouse chess!

## Why is it interesting?
<hr>

* regular chess is very exciting if you like to think and fight
* your king can just be eaten away, which is forbidden in regular chess
* it's a digital version of the game that you don't have to carry the board and the pieces

## How to run it on your device?
<hr>

1. write in your terminal ```git clone <https or ssh addres>```
2. open HTML file in any browser or use server.

You will see chess board, so let`s play!

## How do it work?
<hr>

To create the board is used:
```javascript
const board = new Board(cellNumberHorizontal, cellNumberVertical);
```

To add figures is used:
```javascript
board.addFigure(defaultChessPosition, colors.WHITE, colors.BLACK);
```

To assign the position is used cipher is similar this:
```javascript
export const START_CHESS_POSITION = {
  position: 'RNBQKBNR/PPPPPPPP/00000000/00000000/00000000/00000000/pppppppp/rnbqkbnr', // base arrangement of figures
  numberHorizontals: 8, number of cells horizontally 
  numberVerticals: 8, number of cells vertically
}
```

To create chess game is used:
```javascript
const boardHtml = document.querySelector('.board');

const window = new Window(boardHtml, board);
window.showBoard();
```
To create restart panel is used: 
```javascript
window.createPanel();
```
<hr>

>*NOTE:* This project helped me understand OOP even better

## License
<hr>

[MIT License](LICENSE)
