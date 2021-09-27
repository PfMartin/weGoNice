import './PrepStepInput.css';

import React from 'react';
import PropTypes from 'prop-types';

import TextElement from 'src/components/Forms/TextElement/TextElement';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

import { BiTrash, BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';

const PrepStepInput = ({
  index,
  moveDown,
  moveUp,
  onChange,
  onDelete,
  prepStep,
}) => {
  return (
    <div className="prepstep-input">
      <TextElement
        index={index}
        title="text"
        value={prepStep.text}
        onChange={onChange}
      />
      <div className="prepstep-control" index={index}>
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

PrepStepInput.propTypes = {
  /** Defines the index of the element in an array of input elements */
  index: PropTypes.number,
  /** Function to move a prepStep on position down in the array */
  moveDown: PropTypes.func,
  /** Function to move a prepStep on position up in the array */
  moveUp: PropTypes.func,
  /** Callback for the change event */
  onChange: PropTypes.func,
  /** Callback for the delete event */
  onDelete: PropTypes.func,
  /** One specific prepStep from the array */
  prepStep: PropTypes.object,
};

export default PrepStepInput;
