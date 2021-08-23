import './FilterTag.css';
import React from 'react';

const FilterTag = (props) => {
  return (
    <div
      className="filter-tag"
      name={props.name}
      onClick={props.onRemoveFilter}
    >
      <p>{props.children}</p>
    </div>
  );
};

export default FilterTag;
