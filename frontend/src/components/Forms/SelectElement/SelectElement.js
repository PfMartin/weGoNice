import './SelectElement.css';

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { BiChevronDown } from 'react-icons/bi';

const SelectElement = ({
  index,
  labelText,
  onSelect,
  selectOptions,
  title,
  value,
}) => {
  const [hasOptions, setHasOptions] = useState(false);

  return labelText !== '' ? (
    <div className="form-element select-element">
      <label>{labelText}</label>
      <div
        className="select-container"
        onClick={() => setHasOptions(!hasOptions)}
        onBlur={() => setHasOptions(false)}
        tabIndex="0"
      >
        <div className="select-field" value={value}>
          {value === '' ? (
            <p className="placeholder">Choose an Option</p>
          ) : (
            value
          )}
        </div>
        <BiChevronDown />
        {hasOptions ? (
          <div className="options-container">
            <ul index={index} className="options-list">
              {selectOptions.map((option, optionIndex) => {
                return (
                  <li
                    id={title}
                    value={option.title}
                    key={optionIndex}
                    onClick={onSelect}
                  >
                    {option.title}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  ) : (
    <Fragment>
      <div
        title={title}
        className="select-container"
        onClick={() => setHasOptions(!hasOptions)}
        onBlur={() => setHasOptions(false)}
        tabIndex="0"
      >
        <div className="select-field" value={value}>
          <p>{value}</p>
        </div>
        <BiChevronDown />
        {hasOptions ? (
          <div className="options-container">
            <ul index={index} className="options-list">
              {selectOptions.map((option, optionIndex) => {
                return (
                  <li
                    id={title}
                    value={option.title}
                    key={optionIndex}
                    onClick={onSelect}
                  >
                    {option.title}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </Fragment>
  );
};

SelectElement.defaultProps = {
  labelText: '',
};

SelectElement.propTypes = {
  /** Index of the Select Element in an array of Select Elements */
  index: PropTypes.number,
  /** Defines the label text and the place holder */
  labelText: PropTypes.string,
  /** List of select options to choose */
  selectOptions: PropTypes.array,
  /** Defines the corresponding property name in the state */
  title: PropTypes.string,
  /** Defines the value, which controls the value */
  value: PropTypes.string,
  /** Callback for clicking on a select option */
  onSelect: PropTypes.func,
};

export default SelectElement;
