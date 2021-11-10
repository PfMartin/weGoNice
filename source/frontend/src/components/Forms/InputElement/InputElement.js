import './InputElement.css';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const InputElement = ({ index, title, labelText, type, value, onChange }) => {
  return labelText !== '' ? (
    <Fragment>
      <div className="form-element input-element">
        <label htmlFor={title}>{labelText}</label>
        <input
          index={index}
          type={type}
          id={title}
          value={value}
          onChange={onChange}
          placeholder={labelText}
        />
      </div>
    </Fragment>
  ) : (
    <input
      index={index}
      type={type}
      id={title}
      value={value}
      onChange={onChange}
    />
  );
};

InputElement.defaultProps = {
  labelText: '',
};

InputElement.propTypes = {
  /** Defines the index of the element in an array of input elements */
  index: PropTypes.number,
  /** Defines the corresponding property name in the state */
  title: PropTypes.string,
  /** Defines the label text and the place holder */
  labelText: PropTypes.string,
  /** Defines the type of the input tag*/
  type: PropTypes.string,
  /** Defines the value, which controls the value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback for the change event */
  onChange: PropTypes.func,
};

export default InputElement;