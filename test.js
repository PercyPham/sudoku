const sudoku = require("./index");

describe("validate", () => {
  test("correct sudoku", () => {
    const correctSudoku = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    expect(sudoku.validate(correctSudoku)).toBe(sudoku.VALID);
  });

  test("incorrect sudoku", () => {
    const incorrectSudoku = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 0, 3, 4, 8],
      [1, 0, 0, 3, 4, 2, 5, 6, 0],
      [8, 5, 9, 7, 6, 1, 0, 2, 0],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 0, 1, 5, 3, 7, 2, 1, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 0, 0, 4, 8, 1, 1, 7, 9],
    ];

    expect(sudoku.validate(incorrectSudoku)).toBe(sudoku.INVALID);
  });

  test("unsolved sudoku", () => {
    const unsolvedSudoku = [
      [5, 3, 4, 6, 7, null, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    expect(sudoku.validate(unsolvedSudoku)).toBe(sudoku.UNSOLVED);
  });
});

describe("solve", () => {
  test("simple", () => {
    const board = [
      [5, 3, 4, 6, null, null, null, 1, 2],
      [6, 7, 2, 1, null, null, 3, 4, 8],
      [1, 9, 8, 3, null, null, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [null, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    const solved = sudoku.solve(board);

    expect(sudoku.validate(solved)).toBe(sudoku.VALID);
  });

  test("extreme", () => {
    const board = convertBoardFromString(`
      - - - - - - - 1 - 
      6 8 - - 1 - 4 3 - 
      - - 3 4 - - - - 8 
      - - 9 1 - - 8 - - 
      - 6 2 - - - - - - 
      - - - - 6 - 1 - 9 
      - - 1 2 5 - 7 4 - 
      - - - - 4 - - - - 
      - 4 - 8 7 1 - - 6
    `);

    const solved = sudoku.solve(board);

    expect(sudoku.validate(solved)).toBe(sudoku.VALID);
  });
});

function convertBoardFromString(s) {
  return s
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) =>
      line.split(" ").map((e) => (e === "-" ? null : parseInt(e, 10)))
    );
}

function printBoard(board) {
  let s = "";

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j]) {
        s += board[i][j] + " ";
      } else {
        s += "- ";
      }
    }
    s += "\n";
  }

  console.log(s);
}
