const INVALID = "invalid";
const VALID = "valid";
const UNSOLVED = "unsolved";

function validate(board) {
  if (!Array.isArray(board) || board.length !== 9) return INVALID;

  for (let i = 0; i < 9; i++) {
    const row = board[i];
    if (!Array.isArray(row) || row.length !== 9) {
      return INVALID;
    }
  }

  let isSolved = true;

  // Check rows
  for (let i = 0; i < 9; i++) {
    const set = new Set();

    for (let j = 0; j < 9; j++) {
      const e = board[i][j];
      if (e === null) {
        isSolved = false;
        continue;
      }
      if (!set.has(e) && 0 < e && e < 10) {
        set.add(e);
        continue;
      }
      return INVALID;
    }
  }

  // Check columns
  for (let i = 0; i < 9; i++) {
    const set = new Set();

    for (let j = 0; j < 9; j++) {
      const e = board[j][i];
      if (e === null) {
        isSolved = false;
        continue;
      }
      if (!set.has(e) && 0 < e && e < 10) {
        set.add(e);
        continue;
      }
      return INVALID;
    }
  }

  // Check squares
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const set = new Set();

      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          const e = board[k][l];
          if (e === null) {
            isSolved = false;
            continue;
          }
          if (!set.has(e) && 0 < e && e < 10) {
            set.add(e);
            continue;
          }
          return INVALID;
        }
      }
    }
  }

  return isSolved ? VALID : UNSOLVED;
}

function solve(board) {
  switch (validate(board)) {
    case INVALID:
      return null;
    case VALID:
      return board;
  }

  let remaining = 9 * 9;

  const queueBoard = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => null)
  );

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === null) {
        queueBoard[i][j] = getPossibleNums(board, i, j);
      } else {
        remaining--;
      }
    }
  }

  let f = null;

  f = () => {
    if (!remaining) return;

    const [r, c, minQueue] = findMinQueue(queueBoard);
    queueBoard[r][c] = null;
    remaining--;

    for (let i = 0; i < minQueue.length; i++) {
      const v = minQueue[i];
      board[r][c] = v;
      recalculateRelatedQueues(board, queueBoard, r, c);

      f();

      if (!remaining) return;

      board[r][c] = null;
      recalculateRelatedQueues(board, queueBoard, r, c);
    }

    remaining++;
    queueBoard[r][c] = minQueue;
  };

  f();

  return board;
}

function getPossibleNums(board, i, j) {
  if (board[i][j] !== null) return null;
  const set = new Set(Array.from({ length: 9 }, (v, i) => i + 1));

  const squareR = Math.floor(i / 3);
  const squareC = Math.floor(j / 3);

  for (let k = 0; k < 9; k++) {
    if (board[i][k] !== null) set.delete(board[i][k]);
    if (board[k][j] !== null) set.delete(board[k][j]);

    const s = board[squareR * 3 + Math.floor(k / 3)][squareC * 3 + (k % 3)];
    if (s !== null) set.delete(s);
  }

  return Array.from(set);
}

function findMinQueue(queueBoard) {
  let r = -1;
  let c = -1;
  let minQueue = null;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const queue = queueBoard[i][j];
      if (!queue) continue;
      if (!minQueue || queue.length < minQueue.length) {
        r = i;
        c = j;
        minQueue = queue;
      }
    }
  }

  return [r, c, minQueue];
}

function recalculateRelatedQueues(board, queueBoard, r, c) {
  const squareR = Math.floor(r / 3);
  const squareC = Math.floor(c / 3);

  for (let i = 0; i < 9; i++) {
    queueBoard[r][i] = getPossibleNums(board, r, i);
    queueBoard[i][c] = getPossibleNums(board, i, c);
    queueBoard[squareR * 3 + Math.floor(i / 3)][squareC * 3 + (i % 3)] =
      getPossibleNums(
        board,
        squareR * 3 + Math.floor(i / 3),
        squareC * 3 + (i % 3)
      );
  }
}

module.exports = {
  solve,
  validate,

  INVALID,
  VALID,
  UNSOLVED,
};
