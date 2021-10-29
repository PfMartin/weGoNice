import './Card.css';
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, id, hoverable, onClick }) => {
  return (
    <div
      className={hoverable ? 'card-hoverable' : 'card'}
      id={id}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  hoverable: true,
  onClick: null,
};

Card.propTypes = {
  /** Children passed to the card */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Id of the displayed object */
  id: PropTypes.number,
  /** Defines if the card is hoverable or not */
  hoverable: PropTypes.bool,
  /** Callback for the click event on the card */
  onClick: PropTypes.func,
};

export default Card;
