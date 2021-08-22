import React from 'react';
import './IconFrame.css';
import { IconContext } from 'react-icons';

const IconFrame = (props) => {
  return (
    <IconContext.Provider
      value={{ color: props.color, size: props.size || '20px' }}
    >
      <div
        className="icon"
        onClick={props.onChangeApp}
        targetapp={props.targetApp}
      >
        {props.children}
      </div>
    </IconContext.Provider>
  );
};

export default IconFrame;
