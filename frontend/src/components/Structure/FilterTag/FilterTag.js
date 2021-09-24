import './FilterTag.css';
import React from 'react';

const FilterTag = (props) => {
  return (
    <div
      className={props.isSelected ? 'filter-tag selected' : 'filter-tag'}
      name={props.name}
      onClick={props.onToggleFilter}
    >
      <p>{props.children}</p>
    </div>
  );
};

export default FilterTag;
