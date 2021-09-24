import './PrepStepInput.css';

import React from 'react';
import PropTypes from 'prop-types';

import InputElement from 'src/components/Forms/InputElement/InputElement';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

import { BiTrash, BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';

const PrepStepInput = ({
  index,
  prepStep,
  onChange,
  moveUp,
  moveDown,
  onDelete,
}) => {
  return (
    <div className="prepstep-input">
      <InputElement
        index={index}
        title="text"
        type="text"
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

export default PrepStepInput;
