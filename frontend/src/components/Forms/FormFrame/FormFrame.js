import './FormFrame.css';

import React from 'react';
import PropTypes from 'prop-types';

const FormFrame = ({ children }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="form-frame">
      {children}
    </form>
  );
};

FormFrame.propTypes = {
  /** Allows strings (for <div>) and components as children */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FormFrame;
