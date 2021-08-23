import './RecipesOverview.css';
import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader.js';
import IconFrame from 'src/components/Structure/IconFrame.js';
import FilterTag from 'src/components/Structure/FilterTag.js';
import { BiFilterAlt, BiSearch } from 'react-icons/bi';

const RecipesOverview = (props) => {
  const [filter, setFilter] = useState({
    basics: true,
    breakfast: true,
    main: false,
    dessert: false,
    drinks: false,
  });

  const onRemoveFilter = () => {
    console.log('Remove Filter');
  };

  return (
    <div className="recipes-overview">
      <SiteHeader headline="Recipes" />
      <div className="filter-section">
        <div className="filter-headline">
          <h3>Filter</h3>
          <IconFrame>
            <BiFilterAlt />
          </IconFrame>
        </div>
        <div className="filter-tags">
          {filter.basics ? (
            <FilterTag onRemoveFilter={onRemoveFilter}>basics</FilterTag>
          ) : (
            ''
          )}
          {filter.breakfast ? <FilterTag>breakfast</FilterTag> : ''}
          {filter.main ? <FilterTag>main</FilterTag> : ''}
          {filter.dessert ? <FilterTag>dessert</FilterTag> : ''}
          {filter.drinks ? <FilterTag>drinks</FilterTag> : ''}
        </div>
        <form className="search-section">
          <input placeholder="Search Recipes"></input>
          <IconFrame>
            <BiSearch />
          </IconFrame>
        </form>
      </div>
      <div className="content-section">
        <h3>Content</h3>
      </div>
    </div>
  );
};

export default RecipesOverview;
