import './Card.css';
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, hoverable }) => {
  return (
    <div className={hoverable ? 'card-hoverable' : 'card'}>{children}</div>
  );
};

Card.defaultProps = {
  hoverable: true,
};

Card.propTypes = {
  /** Defines if the card is hoverable or not */
  hoverable: PropTypes.bool,
};

export default Card;
