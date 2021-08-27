import React, { useState } from 'react';
import IconFrame from 'src/components/Structure/IconFrame.js';
import { BiChevronDown } from 'react-icons/bi';

const SelectElement = ({ labelText, value, onSelect, selectOptions }) => {
  const [hasOptions, setHasOptions] = useState(false);

  return (
    <div className="form-element select-element">
      <label>{labelText}</label>
      <div
        className="select-container"
        onClick={() => setHasOptions(!hasOptions)}
        onBlur={() => setHasOptions(false)}
        tabIndex="0"
      >
        <div className="select-field" value={value}>
          {value === '' ? 'Choose an Option' : value}
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
  );
};

export default SelectElement;
