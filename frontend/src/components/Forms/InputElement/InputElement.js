import React, { Fragment } from 'react';

const InputElement = ({ title, labelText, type, value, onChange }) => {
  return labelText !== '' ? (
    <Fragment>
      <div className="form-element input-element">
        <label htmlFor={title}>{labelText}</label>
        <input
          type={type}
          id={title}
          value={value}
          onChange={onChange}
          placeholder={labelText}
        />
      </div>
    </Fragment>
  ) : (
    <input type={type} id={title} value={value} onChange={onChange} />
  );
};

InputElement.defaultProps = {
  labelText: '',
};

export default InputElement;
