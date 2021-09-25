import './TextElement.css';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TextElement = ({ index, labelText, onChange, title, value }) => {
  return labelText !== '' ? (
    <Fragment>
      <div className="form-element input-element">
        <label htmlFor={title}>{labelText}</label>
        <textarea
          rows="2"
          index={index}
          id={title}
          vavlue={value}
          onChange={onChange}
          placeHolder={labelText}
        />
      </div>
    </Fragment>
  ) : (
    <textarea
      rows="2"
      index={index}
      id={title}
      value={value}
      onChange={onChange}
    />
  );
};

TextElement.defaultProps = {
  labelText: '',
};

TextElement.propTypes = {
  /** Defines the index of the element in an array of input elements */
  index: PropTypes.number,
  /** Defines the label text and the place holder */
  labelText: PropTypes.string,
  /** Callback for the change event */
  onChange: PropTypes.func,
  /** Defines the corresponding property name in the state */
  title: PropTypes.string,
  /** Defines the value, which controls the value */
  value: PropTypes.string,
};

export default TextElement;
