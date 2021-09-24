import './IngredientInput.css';

import React from 'react';
import PropTypes from 'prop-types';

import InputElement from 'src/components/Forms/InputElement/InputElement';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';

const measures = [
  {
    id: 1,
    title: 'g',
  },
  {
    id: 2,
    title: 'kg',
  },
  {
    id: 3,
    title: 'ml',
  },
  {
    id: 4,
    title: 'l',
  },
];

const IngredientInput = ({ index, ingredient, onChange }) => {
  return (
    <div className="ingredient-input">
      <div className="value-input">
        <InputElement
          index={index}
          title="value"
          type="number"
          value={ingredient.value}
          onChange={onChange}
        />
        <SelectElement
          index={index}
          title="measure"
          value={ingredient.measure}
          onSelect={onChange}
          selectOptions={measures}
        />
      </div>
      <InputElement
        index={index}
        title="text"
        type="text"
        value={ingredient.text}
        onChange={onChange}
      />
    </div>
  );
};

IngredientInput.propTypes = {
  /** Index of the ingredient in the array of ingredients */
  index: PropTypes.number,
  /** Ingredient that should be modified */
  ingredient: PropTypes.object,
  /** Callback for the change event of one of the form elements */
  onChange: PropTypes.func,
};

export default IngredientInput;
