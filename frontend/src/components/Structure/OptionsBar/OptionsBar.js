import './OptionsBar.css';

import React from 'react';
import PropTypes from 'prop-types';

import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import { BiSearch, BiFilterAlt } from 'react-icons/bi';

const OptionsBar = ({ children, onClickFilter, searchPlaceholder }) => {
  return (
    <div className="options-bar">
      <div className="filter-section">
        <IconFrame onClick={onClickFilter}>
          <BiFilterAlt />
        </IconFrame>
        <div className="filter-tags">{children}</div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="search-section">
        <div className="search-input">
          <input placeholder={searchPlaceholder}></input>
        </div>
        <div>
          <IconFrame>
            <BiSearch />
          </IconFrame>
        </div>
      </form>
    </div>
  );
};

OptionsBar.propTypes = {
  /** Components or HTML-Elements passed to the OptionsBar */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Callback for the click event on the filter icon */
  onClickFilter: PropTypes.func,
  /** Placeholder text for the search bar */
  searchPlaceholder: PropTypes.string,
};

export default OptionsBar;
