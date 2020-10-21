import React, { Component } from "react";
import Row from "./Row";
import { matrices } from "./data";

window.$flag = false;

const WHITE_COLOR = "#FFFFFF";

class GridNew extends Component {
  state = {
    matrix: [[]],
    backgroundColor: "",
    staticValues: {},
    speed: 25,
    button: false,
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

  visualizer = (row, column) => {
    var temp = String(row) + String(column);
    if (temp in this.state.staticValues) {
      return -1;
    } else {
      for (let x = this.state.matrix[row][column] + 1; x < 10; x++) {
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

  recursion = (row, column) => {
    var rowColIndex = String(row) + String(column);
    if (rowColIndex in this.state.staticValues) {
      this.recursion(row, column + 1);
    } else {
      if (row < 9 && column < 9) {
        for (let x = 1; x < 10; x++) {
          if (
            this.gridChecker(row, column, x) &&
            this.rowChecker(row, x) &&
            this.columnChecker(column, x)
          ) {
            let newMatrix = [...this.state.matrix];
            newMatrix[row][column] = x;
            this.setState({ matrix: newMatrix });
            this.recursion(row, column + 1);
          }
        }
        if (!window.$flag) {
          let newMatrix = [...this.state.matrix];
          newMatrix[row][column] = 0;
          this.setState({ matrix: newMatrix });
        }
      } else if (column >= 9) {
        this.recursion(row + 1, 0);
      } else {
        window.$flag = true;
        return;
      }
    }
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  handleChange = (e) => {
    this.setState({ speed: e.target.value });
  };

  startSolving = async () => {
    this.setState({ button: true });
    let row = 0;
    let col = 0;

    while (true) {
      if (this.state.speed === "50") {
        let newMatrix = [];
        newMatrix = JSON.parse(JSON.stringify(matrices["easy"][0]));
        this.setState({ matrix: newMatrix }, () => this.recursion(0, 0));
        window.$flag = false;
        break;
      }
      if (row > 8) {
        break;
      }

      let value = this.visualizer(row, col);

      if (value === 0) {
        let newMatrix = [...this.state.matrix];
        newMatrix[row][col] = value;
        this.setState(
          { matrix: newMatrix },
          await this.sleep(50 - this.state.speed)
        );
        while (true) {
          if (col === 0) {
            row -= 1;
            col = 8;
          } else {
            col -= 1;
          }
          var temp = String(row) + String(col);
          if (!(temp in this.state.staticValues)) {
            break;
          }
        }
        if (row < 0 && col < 0) {
          alert("No solutions possible");
          break;
        }
      } else if (value === -1) {
        if (col === 8) {
          row += 1;
          col = 0;
        } else {
          col += 1;
        }
      } else {
        let newMatrix = [...this.state.matrix];
        newMatrix[row][col] = value;
        this.setState(
          { matrix: newMatrix },
          await this.sleep(50 - this.state.speed)
        );

        if (col === 8) {
          row += 1;
          col = 0;
        } else {
          col += 1;
        }
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.level !== this.props.level) {
      let newMatrix = [];
      newMatrix = JSON.parse(JSON.stringify(matrices["easy"][0]));
      this.setState({ matrix: newMatrix }, () => {
        this.setStaticValues();
      });
      this.setState({ backgroundColor: WHITE_COLOR }, () => {});
    }
  }

  setStaticValues() {
    let staticValues = {};
    for (let r = 0; r < this.state.matrix.length; r++) {
      for (let c = 0; c < this.state.matrix[r].length; c++) {
        if (this.state.matrix[r][c] !== 0) {
          let newString = "";
          newString += String(r) + String(c);
          staticValues[newString] = 1;
        }
      }
    }
    this.setState({ staticValues: staticValues }, () => {});
  }

  componentWillMount() {
    let startmatrix = JSON.parse(JSON.stringify(matrices["easy"][0]));
    this.setState({ matrix: startmatrix }, () => {
      this.setStaticValues();
    });
    this.setState({ backgroundColor: WHITE_COLOR });
  }

  render() {
    return (
      <React.Fragment>
        {" "}
        <div
          className="justify-content-center"
          style={{
            textAlign: "center",
          }}
        >
          <div style={{ display: "inline" }}>
            <p
              style={{
                display: "inline",
              }}
              className="mt-3 mr-3"
            >
              Speed slider:
            </p>
            <input
              type="range"
              min="0"
              max="50"
              defaultValue="25"
              onChange={this.handleChange}
            />
          </div>
          <div className="h1" style={{ display: "inline" }}>
            <input
              className="btn rounded-circle h1 btn-outline-success mt-3 p-2 ml-5 font-weight-bold"
              type="button"
              disabled={this.state.button}
              onClick={() => this.startSolving()}
              value="Solve"
            />
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="mt-3">
              <table>
                <tbody>
                  {this.state.matrix.map((rows, r) => (
                    <Row
                      key={r}
                      row={rows}
                      backgroundColor={this.state.backgroundColor}
                      rIndex={r}
                      staticValues={this.state.staticValues}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GridNew;
