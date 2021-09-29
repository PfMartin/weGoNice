import './IconFrame.css';

import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

const IconFrame = ({
  className,
  children,
  onClick,
  size,
  targetApp,
  targetView,
}) => {
  return (
    <IconContext.Provider value={{ size: size || '20px' }}>
      <div
        className={className}
        onClick={onClick}
        targetapp={targetApp}
        targetview={targetView}
      >
        {children}
      </div>
    </IconContext.Provider>
  );
};

IconFrame.defaultProps = {
  className: 'icon',
};

IconFrame.propTypes = {
  /** Defines styling using css */
  className: PropTypes.string,
  /** Allows strings (for <div>) and components as children */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Callback for the click event */
  onClick: PropTypes.func,
  /** Defines the size of the icon */
  size: PropTypes.string,
  /** Defines the target app for the click event */
  targetApp: PropTypes.string,
  /** Defines the target view for the click event */
  targetView: PropTypes.string,
};

export default IconFrame;
