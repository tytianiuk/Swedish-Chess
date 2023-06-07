export const figureMoves = {
  king: [
    (dy,dx) => dy === 1 && dx === 1,
    (dy,dx) => dy === 1 && dx === 0,
    (dy,dx) => dy === 0 && dx === 1,
  ],
  queen: [
    (dy,dx) => dx === dy,
    (dy,dx) => dy !== 0 && dx === 0,
    (dy,dx) => dy === 0 && dx !== 0,
  ],
  rook: [
    (dy,dx) => dy !== 0 && dx === 0,
    (dy,dx) => dy === 0 && dx !== 0,
  ],
  bishop: [
    (dy,dx) => dx === dy,
  ],
  knight: [
    (dy,dx) => dy === 1 && dx === 2,
    (dy,dx) => dy === 2 && dx === 1,
  ],
  pawn: {
    move: (startCell, endCell, directionMove, dx) => startCell.y + directionMove === endCell.y && dx === 0,
    doubleMove: (startCell, endCell, directionMove, dx) => startCell.y + 2 * directionMove === endCell.y && startCell.figure.isFirstMove && dx === 0,
    beatMove: (startCell, endCell, directionMove, dx) => startCell.y + directionMove === endCell.y && dx === 1
  },
}