import React from 'react';
import InputElement from 'src/components/Forms/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement.js';

const ValueInput = ({ headline, inputValueState, onChange, selectOptions }) => {
  return (
    <div className="form-element value-element">
      <label htmlFor="value">{headline}</label>
      <div className="value-input">
        <InputElement
          title="value"
          type="number"
          value={inputValueState.value}
          onChange={onChange}
        />
        <SelectElement
          title="measure"
          value={inputValueState.measure}
          onSelect={onChange}
          selectOptions={selectOptions}
        />
      </div>
    </div>
  );
};

export default ValueInput;
