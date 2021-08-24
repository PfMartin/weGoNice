import './RecipesOverview.css';
import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader.js';
import IconFrame from 'src/components/Structure/IconFrame.js';
import FilterTag from 'src/components/Structure/FilterTag.js';
import FilterOptions from 'src/components/Recipes/FilterOptions.js';
import { BiFilterAlt, BiSearch } from 'react-icons/bi';

const RecipesOverview = (props) => {
  const [filter, setFilter] = useState({
    basics: true,
    breakfast: true,
    main: true,
    dessert: true,
    drinks: true,
  });
  const [filterOptions, setFilterOptions] = useState(true);

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

  const onToggleFilterOptions = () => {
    const prevFilterOptions = filterOptions;
    setFilterOptions(!prevFilterOptions);
  };

  return (
    <div className="recipes-overview">
      <SiteHeader headline="Recipes" />
      <div className="filter-section">
        <div className="filter-headline">
          <h3>Filter</h3>
          <IconFrame onClick={onToggleFilterOptions}>
            <BiFilterAlt />
          </IconFrame>
          {filterOptions ? <FilterOptions /> : ''}
        </div>
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
