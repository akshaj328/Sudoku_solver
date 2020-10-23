const gridChecker = (row, column, number, matrix) => {
  row = Math.floor(row / 3) * 3;
  column = Math.floor(column / 3) * 3;
  for (let a = row; a < row + 3; a++) {
    for (let b = column; b < column + 3; b++) {
      if (number === matrix[a][b]) return false;
    }
  }
  return true;
};

const columnChecker = (column, number, matrix) => {
  for (let a = 0; a < 9; a++) {
    if (number === matrix[a][column]) return false;
  }
  return true;
};

const rowChecker = (row, number, matrix) => {
  for (let a = 0; a < 9; a++) {
    if (number === matrix[row][a]) return false;
  }
  return true;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const visualizer = (row, column, matrix, staticValues) => {
  var temp = String(row) + String(column);
  if (temp in staticValues) {
    return -1;
  } else {
    for (let x = matrix[row][column] + 1; x < 10; x++) {
      if (
        gridChecker(row, column, x, matrix) &&
        rowChecker(row, x, matrix) &&
        columnChecker(column, x, matrix)
      ) {
        return x;
      }
    }
    return 0;
  }
};

module.exports = {
  gridChecker,
  columnChecker,
  rowChecker,
  sleep,
  visualizer,
};
