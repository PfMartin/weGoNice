import './FilterTag.css';
import React from 'react';

const FilterTag = (props) => {
  return (
    <div className="filter-tag">
      <p>{props.children}</p>
    </div>
  );
};

export default FilterTag;
