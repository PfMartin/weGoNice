import './ValueInput.css';

import React from 'react';
import PropTypes from 'prop-types';
import InputElement from 'src/components/Forms/InputElement/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';

const ValueInput = ({
  index,
  labelText,
  value,
  measure,
  onChange,
  selectOptions,
}) => {
  return (
    <div className="form-element value-element">
      <label htmlFor="value">{labelText}</label>
      <div className="value-input">
        <InputElement
          index={index}
          title="value"
          type="number"
          value={value}
          onChange={onChange}
        />
        <SelectElement
          index={index}
          title="measure"
          value={measure}
          onSelect={onChange}
          selectOptions={selectOptions}
        />
      </div>
    </div>
  );
};

ValueInput.propTypes = {
  /** Defines the index of the ValueInput in an array of ValueInputs*/
  index: PropTypes.number,
  /** Defines the label text */
  labelText: PropTypes.string,
  /** State value that controls the selected option */
  measure: PropTypes.string,
  /** Callback for the onChange event */
  onChange: PropTypes.func,
  /** Array of all select options to choose from */
  selectOptions: PropTypes.array,
  /** State value that controls input value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ValueInput;
