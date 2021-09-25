import './PrepStepInput.css';

import React from 'react';
import PropTypes from 'prop-types';

import TextElement from 'src/components/Forms/TextElement/TextElement';
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

export default PrepStepInput;
