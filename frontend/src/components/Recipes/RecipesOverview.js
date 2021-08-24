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
   * Toggles the clicked filter
   * @param  {Object} e EventObject
   */
  const onToggleFilter = (e) => {
    const name = e.currentTarget.getAttribute('name');
    setFilter({
      ...filter,
      ...{ [name]: !filter[name] },
    });

    console.log(filter);
  };

  return (
    <div className="recipes-overview">
      <SiteHeader headline="Recipes" />
      <div className="recipe-options">
        <div className="filter-section">
          <h3>Filter</h3>
          <div className="filter-tags">
            <FilterTag
              name="basics"
              onToggleFilter={onToggleFilter}
              isSelected={filter.basics}
            >
              basics
            </FilterTag>
            <FilterTag
              name="breakfast"
              onToggleFilter={onToggleFilter}
              isSelected={filter.breakfast}
            >
              breakfast
            </FilterTag>
            <FilterTag
              name="main"
              onToggleFilter={onToggleFilter}
              isSelected={filter.main}
            >
              main
            </FilterTag>
            <FilterTag
              name="dessert"
              onToggleFilter={onToggleFilter}
              isSelected={filter.dessert}
            >
              dessert
            </FilterTag>
            <FilterTag
              name="drinks"
              onToggleFilter={onToggleFilter}
              isSelected={filter.drinks}
            >
              drinks
            </FilterTag>
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
