import React, { Fragment, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const SelectElement = ({ labelText, value, onSelect, selectOptions }) => {
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
      </div>
      {hasOptions ? (
        <div className="options-container">
          <ul className="options-list">
            {selectOptions.map((option, index) => {
              return <li key={index}>{option.title}</li>;
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <Fragment>
      <div
        className="select-container"
        onClick={() => setHasOptions(!hasOptions)}
        onBlur={() => setHasOptions(false)}
        tabIndex="0"
      >
        <div className="select-field" value={value}>
          <p>{value}</p>
        </div>
        <BiChevronDown />
      </div>
      {hasOptions ? (
        <div className="options-container">
          <ul className="options-list">
            {selectOptions.map((option, index) => {
              return <li key={index}>{option.title}</li>;
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
};

SelectElement.defaultProps = {
  labelText: '',
};

export default SelectElement;
