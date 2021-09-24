import './InputElement.css';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// import 'src/App.css';

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

InputElement.propTypes = {
  /** Defines the corresponding property name in the state */
  title: PropTypes.string,
  /** Defines the label text and the place holder */
  labelText: PropTypes.string,
  /** Defines the type of the input tag*/
  type: PropTypes.string,
  /** Defines the value, which controls the value */
  value: PropTypes.string,
  /** Callback for the change event */
  onChange: PropTypes.func,
};

export default InputElement;
