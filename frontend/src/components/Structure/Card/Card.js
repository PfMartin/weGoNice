import './Card.css';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

Card.propTypes = {};

export default Card;
