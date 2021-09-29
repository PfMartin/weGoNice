// Ich hoffe du hast gutes Schuhwerk eingepackt, denn vielleicht schicken wir dich aber auch auf einen gefährlichen Klettersteig, bei dem du gegen den Abgrund kämpfst.
import './OptionsBar.css';

import React from 'react';

import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import { BiSearch, BiFilterAlt } from 'react-icons/bi';

const OptionsBar = ({ children, searchPlaceholder }) => {
  return (
    <div className="options-bar">
      <div className="filter-section">
        <IconFrame>
          <BiFilterAlt />
        </IconFrame>
        <div className="filter-tags">{children}</div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="search-section">
        <input placeholder={searchPlaceholder}></input>
        <IconFrame>
          <BiSearch />
        </IconFrame>
      </form>
    </div>
  );
};

export default OptionsBar;
