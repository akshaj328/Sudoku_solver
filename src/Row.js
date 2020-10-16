import React from "react";
import "./Row.css";
import Cell from "./Cell";

class Row extends React.Component {
  render() {
    return (
      <tr>
        {this.props.row.map((element, c) => (
          <Cell
            value={element}
            backgroundColor={this.props.backgroundColor}
            rIndex={this.props.rIndex}
            cIndex={c}
            staticValues={this.props.staticValues}
          />
        ))}
      </tr>
    );
  }
}

export default Row;
