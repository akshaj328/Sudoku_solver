import React from "react";
import Row from "./Row";

window.$flag = false;

class GridVisualizer extends React.Component {
  state = {
    matrix: [
      [8, 2, 3, 0, 0, 0, 0, 9, 0],
      [0, 0, 5, 0, 3, 2, 1, 0, 0],
      [9, 0, 0, 5, 8, 6, 0, 2, 0],
      [0, 0, 0, 0, 2, 8, 4, 7, 0],
      [0, 6, 8, 1, 0, 0, 9, 0, 0],
      [4, 3, 0, 6, 0, 9, 0, 0, 1],
      [0, 0, 0, 8, 6, 4, 2, 0, 0],
      [3, 8, 6, 0, 0, 1, 0, 0, 4],
      [0, 0, 1, 0, 0, 0, 8, 0, 9],
    ],
  };

  gridChecker(row, column, number) {
    let { matrix } = this.state;
    row = Math.floor(row / 3) * 3;
    column = Math.floor(column / 3) * 3;
    for (let a = row; a < row + 3; a++) {
      for (let b = column; b < column + 3; b++) {
        if (number === matrix[a][b]) return false;
      }
    }
    return true;
  }

  columnChecker(column, number) {
    let { matrix } = this.state;
    for (let a = 0; a < 9; a++) {
      if (number === matrix[a][column]) return false;
    }
    return true;
  }

  rowChecker(row, number) {
    let { matrix } = this.state;
    for (let a = 0; a < 9; a++) {
      if (number === matrix[row][a]) return false;
    }
    return true;
  }

  temp = (row, column, staticValues, matrix) => {
    var temp = String(row) + String(column);
    if (temp in staticValues) {
      return -1;
    } else {
      for (let x = matrix[row][column] + 1; x < 10; x++) {
        if (
          this.gridChecker(row, column, x) &&
          this.rowChecker(row, x) &&
          this.columnChecker(column, x)
        ) {
          return x;
        }
      }
      return 0;
    }
  };

  startSolving = (staticValues) => {
    let row = 0;
    let col = 0;

    while (true) {
      if (row > 8) {
        break;
      }

      let matrix = [...this.state.matrix];
      let value = this.temp(row, col, staticValues, matrix);
      if (value === 0) {
        matrix[row][col] = value;
        this.setState({ matrix: matrix });
        if (row === 0 && col === 0) {
          alert("No solutions possible");
        }

        if (col === 0) {
          row -= 1;
          col = 8;
        } else {
          col -= 1;
        }
      } else if (value === -1) {
        if (col === 8) {
          row += 1;
          col = 0;
        } else {
          col += 1;
        }
      } else {
        matrix[row][col] = value;
        this.setState({ matrix: matrix });

        if (col === 8) {
          row += 1;
          col = 0;
        } else {
          col += 1;
        }
      }
    }
  };

  render() {
    let { matrix } = this.state;
    let staticValues = this.getStaticValues(matrix);
    return (
      <div>
        <input
          type="button"
          onClick={() => this.startSolving(staticValues)}
          value="Start"
        />
        {matrix.map((rows) => (
          <Row row={rows} />
        ))}
      </div>
    );
  }
  getStaticValues(matrix) {
    let staticValues = {};
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] !== 0) {
          let newString = "";
          newString += String(r) + String(c);
          staticValues[newString] = 1;
        }
      }
    }
    return staticValues;
  }
}

export default GridVisualizer;
