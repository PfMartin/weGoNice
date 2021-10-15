import './IngredientInput.css';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BiTrash, BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';

import InputElement from 'src/components/Forms/InputElement/InputElement';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const IngredientInput = ({
  index,
  ingredient,
  moveDown,
  moveUp,
  onChange,
  onDelete,
  selectData,
}) => {
  return (
    <div className="ingredient-input">
      <div className="value-input">
        <InputElement
          index={index}
          onChange={onChange}
          title="value"
          type="number"
          value={ingredient.value}
        />
        <SelectElement
          index={index}
          onSelect={onChange}
          selectOptions={selectData.measures.filter(
            (measure) => measure.category === 'quantity'
          )}
          title="measure"
          value={ingredient.measure}
        />
      </div>
      <InputElement
        index={index}
        onChange={onChange}
        title="text"
        type="text"
        value={ingredient.text}
      />
      <div className="ingredient-control" index={index}>
        <IconFrame onClick={moveUp}>
          <BiUpArrowAlt />
        </IconFrame>
        <IconFrame onClick={moveDown}>
          <BiDownArrowAlt />
        </IconFrame>
        <IconFrame onClick={onDelete}>
          <BiTrash />
        </IconFrame>
      </div>
    </div>
  );
};

IngredientInput.propTypes = {
  /** Index of the ingredient in the array of ingredients */
  index: PropTypes.number,
  /** Ingredient that should be modified */
  ingredient: PropTypes.object,
  /** Function to move an ingredient one position down in the array */
  moveDown: PropTypes.func,
  /** Function to move an ingredient one position up in the array */
  moveUp: PropTypes.func,
  /** Callback for the change event of one of the form elements */
  onChange: PropTypes.func,
  /** Callback for the delete event */
  onDelete: PropTypes.func,
  /** Possible quantity measures for the select field - Provided by redux store */
  quantityMeasures: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    selectData: state.selectData,
  };
};

export default connect(mapStateToProps)(IngredientInput);
