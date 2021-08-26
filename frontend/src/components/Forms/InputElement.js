import React from 'react';

const InputElement = ({ title, labelText, type, value, onChange }) => {
  return (
    <div className="form-element input-element">
      <label htmlFor={title}>{labelText}</label>
      <input type={type} id={title} value={value} onChange={onChange} />
    </div>
  );
};

export default InputElement;
