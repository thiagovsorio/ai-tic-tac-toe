export type PlayerSymbol = 'X' | 'O';

export function checkWinner(board: string[][]): PlayerSymbol | null | 'DRAW' {
  const size = board.length;
  if (size === 0) return null;

  // Check all rows and columns
  let hasEmptyCell = false;
  for (let i = 0; i < size; i++) {
    const rowStart = board[i][0];
    const colStart = board[0][i];

    let rowWin = !!rowStart;
    let colWin = !!colStart;

    for (let j = 1; j < size && (rowWin || colWin); j++) {
      if (board[i][j] === '') hasEmptyCell = true;
      if (board[j][i] === '') hasEmptyCell = true;

      if (rowWin && board[i][j] !== rowStart) rowWin = false;
      if (colWin && board[j][i] !== colStart) colWin = false;
    }

    if (rowWin) return rowStart as PlayerSymbol;
    if (colWin) return colStart as PlayerSymbol;
  }

  // Check main and anti-diagonals
  const diagStart = board[0][0];
  const antiStart = board[0][size - 1];
  let diagWin = !!diagStart;
  let antiWin = !!antiStart;

  for (let i = 1; i < size && (diagWin || antiWin); i++) {
    if (board[i][i] === '' || board[i][size - 1 - i] === '') hasEmptyCell = true;

    if (diagWin && board[i][i] !== diagStart) diagWin = false;
    if (antiWin && board[i][size - 1 - i] !== antiStart) antiWin = false;
  }

  if (diagWin) return diagStart as PlayerSymbol;
  if (antiWin) return antiStart as PlayerSymbol;

  // No winner
  // If no empty cells => DRAW
  return hasEmptyCell ? null : 'DRAW';
}
