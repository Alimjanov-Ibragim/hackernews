import React from "react";
import PropTypes from "prop-types";

export const Button = ({ onClick, className, children }) => (
  <button className={className} onClick={onClick} type="button">
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
};
