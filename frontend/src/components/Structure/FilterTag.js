import './FilterTag.css';
import React from 'react';

const FilterTag = (props) => {
  return (
    <div className="filter-tag" onClick={props.onRemoveFilter}>
      <p>{props.children}</p>
    </div>
  );
};

export default FilterTag;
