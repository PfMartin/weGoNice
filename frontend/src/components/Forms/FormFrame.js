import './FormFrame.css';
import React from 'react';

const FormFrame = (props) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="form-frame">
      {props.children}
    </form>
  );
};

export default FormFrame;
