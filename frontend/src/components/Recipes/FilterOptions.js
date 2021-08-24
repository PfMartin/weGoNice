import './FilterOptions.css';
import React from 'react';

const FilterOptions = (props) => {
  return (
    <ul className="options-container">
      <li>Basics</li>
      <li>Breakfast</li>
      <li>Main</li>
      <li>Dessert</li>
      <li>Drinks</li>
    </ul>
  );
};

export default FilterOptions;
