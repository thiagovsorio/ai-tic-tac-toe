export type PlayerSymbol = 'X' | 'O';

export function checkWinner(board: string[][]): PlayerSymbol | null {
  const size = board.length;
  if (size === 0) return null;

  // Check all rows and columns
  for (let i = 0; i < size; i++) {
    const row = board[i][0];
    const col = board[0][i];

    let rowWin = !!row;
    let colWin = !!col;

    for (let j = 1; j < size && (rowWin || colWin); j++) {
      if (rowWin && board[i][j] !== row) rowWin = false;
      if (colWin && board[j][i] !== col) colWin = false;
    }

    if (rowWin) return row as PlayerSymbol;
    if (colWin) return col as PlayerSymbol;
  }

  // Check main and anti-diagonals
  const diag = board[0][0];
  const anti = board[0][size - 1];
  let diagWin = !!diag;
  let antiWin = !!anti;

  for (let i = 1; i < size && (diagWin || antiWin); i++) {
    if (diagWin && board[i][i] !== diag) diagWin = false;
    if (antiWin && board[i][size - 1 - i] !== anti) antiWin = false;
  }

  if (diagWin) return diag as PlayerSymbol;
  if (antiWin) return anti as PlayerSymbol;

  // No winner found
  return null;
}
