import React from "react";
import Countries from "./Countries";

class AutoComplete extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestion: [],
    };
    this.check = this.check.bind(this);
  }

  check(e) {
    let value = e.target.value;
    let suggestion = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestion = Countries.sort().filter((k) => regex.test(k));
    }

    this.setState(() => ({
      suggestion,
    }));
  }

  displayCountry() {
    const { suggestion } = this.state;
    if (suggestion.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestion.map((item, index) => (
          <div className="list">
            <li key={index}>{item}</li>
          </div>
        ))}
      </ul>
    );
  }

  render() {
    const { suggestion } = this.state;
    return (
      <div className="container">
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => {
            this.check(e);
          }}
          ref={(input) => {
            this.checkInput = input;
          }}
        />
        {this.displayCountry()}
        <div className="suggestion">Suggestion:{suggestion.length}</div>
      </div>
    );
  }
}
export default AutoComplete;
