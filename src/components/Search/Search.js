import React, { Component } from "react";

export class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          ref={node => {
            this.input = node;
          }}
          type="text"
          value={value}
          onChange={onChange}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}
