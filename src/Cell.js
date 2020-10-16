import React from "react";
import "./Cell.css";

class Cell extends React.Component {
  state = {
    backgroundColor: "",
  };

  elementValue(element) {
    if (element !== 0) return element;
    return "  ";
  }
  cssSelector = (r, c, staticValues, backgroundColor) => {
    var temp = String(r) + String(c);
    var bgColor = "";
    var bWidthB = "1px";
    var bStyleB = "";
    var bWidthR = "1px";
    var bStyleR = "";
    var bStyleT = "";
    var bWidthT = "1px";
    var bStyleL = "";
    var bWidthL = "1px";
    if (r === 2 || r === 5 || r === 8) {
      bWidthB = "5px";
      bStyleB = "solid";
    }
    if (r === 0) {
      bStyleT = "solid";
      bWidthT = "5px";
    }
    if (c === 0) {
      bStyleL = "solid";
      bWidthL = "5px";
    }
    if (c === 2 || c === 5 || c === 8) {
      bWidthR = "5px";
      bStyleR = "solid";
    }
    if (temp in staticValues) {
      bgColor = "#A9A9A9";
    } else {
      bgColor = backgroundColor;
    }

    return {
      backgroundColor: bgColor,
      borderBottomWidth: bWidthB,
      borderRightWidth: bWidthR,
      borderBottomStyle: bStyleB,
      borderStyleRight: bStyleR,
      borderTopWidth: bWidthT,
      borderTopStyle: bStyleT,
      borderLeftWidth: bWidthL,
      borderLeftStyle: bStyleL,
      borderColor: "green",
    };
  };

  render() {
    const { backgroundColor, value, rIndex, cIndex, staticValues } = this.props;
    return (
      <td
        className="align-middle text-center h3 font-weight-bold"
        style={this.cssSelector(rIndex, cIndex, staticValues, backgroundColor)}
      >
        {this.elementValue(value)}
      </td>
    );
  }
}

export default Cell;
