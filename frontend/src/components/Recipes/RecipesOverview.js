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
    main: true,
    dessert: true,
    drinks: true,
  });

  /**
   * Removes the cicked filter from the filter tags section
   * @param  {Object} e EventObject
   */
  const onRemoveFilter = (e) => {
    const name = e.currentTarget.getAttribute('name');
    setFilter({
      ...filter,
      ...{ [name]: false },
    });
  };

  return (
    <div className="recipes-overview">
      <SiteHeader headline="Recipes" />
      <div className="recipe-options">
        <div className="filter-section">
          <h3>Filter</h3>
          <div className="filter-tags">
            {filter.basics ? (
              <FilterTag name="basics" onRemoveFilter={onRemoveFilter}>
                basics
              </FilterTag>
            ) : (
              ''
            )}
            {filter.breakfast ? (
              <FilterTag name="breakfast" onRemoveFilter={onRemoveFilter}>
                breakfast
              </FilterTag>
            ) : (
              ''
            )}
            {filter.main ? (
              <FilterTag name="main" onRemoveFilter={onRemoveFilter}>
                main
              </FilterTag>
            ) : (
              ''
            )}
            {filter.dessert ? (
              <FilterTag name="dessert" onRemoveFilter={onRemoveFilter}>
                dessert
              </FilterTag>
            ) : (
              ''
            )}
            {filter.drinks ? (
              <FilterTag name="drinks" onRemoveFilter={onRemoveFilter}>
                drinks
              </FilterTag>
            ) : (
              ''
            )}
          </div>
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
