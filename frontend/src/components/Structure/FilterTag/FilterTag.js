import './FilterTag.css';
import React from 'react';

const FilterTag = ({ isSelected, name, onToggleFilter, children }) => {
  return (
    <div
      className={isSelected ? 'filter-tag selected' : 'filter-tag'}
      name={name}
      onClick={onToggleFilter}
    >
      <p>{children}</p>
    </div>
  );
};

export default FilterTag;
