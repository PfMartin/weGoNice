import './ButtonBar.css';

import React from 'react';
import PropTypes from 'prop-types';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import { BiSave, BiTrash } from 'react-icons/bi';

const ButtonBar = ({ onSave, onDelete }) => {
  return (
    <div className="button-bar">
      {onSave !== null ? (
        <IconFrame
          className="icon"
          size="35px"
          onClick={onSave}
          targetApp="recipes"
        >
          <BiSave />
        </IconFrame>
      ) : (
        ''
      )}
      {onDelete !== null ? (
        <IconFrame
          className="icon"
          size="35px"
          onClick={onDelete}
          targetApp="recipes"
        >
          <BiTrash />
        </IconFrame>
      ) : (
        ''
      )}
    </div>
  );
};

ButtonBar.defaultProps = {
  onSave: null,
  onDelete: null,
};

ButtonBar.propTypes = {
  /** Call back for the onClick event on the save button */
  onSave: PropTypes.func,
  /** Call back for the onClick event on the delete button */
  onDelete: PropTypes.func,
};

export default ButtonBar;
