import React, { Fragment, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const SelectElement = ({
  title,
  labelText,
  value,
  onSelect,
  selectOptions,
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
            <ul className="options-list">
              {selectOptions.map((option, index) => {
                return (
                  <li
                    id={title}
                    value={option.title}
                    key={index}
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
            <ul className="options-list">
              {selectOptions.map((option, index) => {
                return (
                  <li
                    id={title}
                    value={option.title}
                    key={index}
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

export default SelectElement;
