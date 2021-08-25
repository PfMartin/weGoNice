import React from 'react';
import './IconFrame.css';
import { IconContext } from 'react-icons';

const IconFrame = (props) => {
  return (
    <IconContext.Provider value={{ size: props.size || '20px' }}>
      <div
        className={props.className}
        onClick={props.onClick}
        targetapp={props.targetApp}
        targetview={props.targetView}
      >
        {props.children}
      </div>
    </IconContext.Provider>
  );
};

IconFrame.defaultProps = {
  className: 'icon',
};

export default IconFrame;
