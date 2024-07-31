import React from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from "react-bootstrap";

class MyButton extends React.Component {
  state = {
    a: 5,
    b: 10,
    c: 15,
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>click me</button>
      </div>
    );
  }
  handleClick = () => {
    this.setState({
      a: 20,
      c: 25,
    });
    console.log(this.state);
  };
}

ReactDOM.render(<MyButton />, document.getElementById("root"));
export default MyButton;
