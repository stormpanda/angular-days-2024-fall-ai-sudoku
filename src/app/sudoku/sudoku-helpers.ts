export const createEmptyBoard = (): number[][] => {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
};

export const isValid = (
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean => {
  const boxRowStart = 3 * Math.floor(row / 3);
  const boxColStart = 3 * Math.floor(col / 3);

  for (let x = 0; x < 9; x++) {
    if (
      board[row][x] === num ||
      board[x][col] === num ||
      board[boxRowStart + Math.floor(x / 3)][boxColStart + (x % 3)] === num
    ) {
      return false;
    }
  }
  return true;
};

export const waveFunctionCollapse = (board: number[][]): number[][] => {
  const possibilities = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => [1, 2, 3, 4, 5, 6, 7, 8, 9])
  );

  while (true) {
    let minOptions = 10;
    let minRow = -1;
    let minCol = -1;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const options = possibilities[row][col];
        if (board[row][col] === 0 && options.length < minOptions) {
          minOptions = options.length;
          minRow = row;
          minCol = col;
        }
      }
    }

    if (minOptions === 10) break; // All cells are filled

    const [row, col] = [minRow, minCol];
    const options = possibilities[row][col];
    const value = options[Math.floor(Math.random() * options.length)];
    board[row][col] = value;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          possibilities[r][c] = possibilities[r][c].filter((num) =>
            isValid(board, r, c, num)
          );
        }
      }
    }
  }
  return board;
};

export const removeNumbers = (board: number[][], count: number): number[][] => {
  let attempts = count;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      attempts--;
    }
  }
  return board;
};

export const validateInput = (event: KeyboardEvent) => {
  const inputChar = String.fromCharCode(event.charCode);
  if (!/[1-9]/.test(inputChar)) {
    event.preventDefault();
  }
};
