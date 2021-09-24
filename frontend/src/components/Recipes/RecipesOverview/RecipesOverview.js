import './RecipesOverview.css';
import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import FilterTag from 'src/components/Structure/FilterTag/FilterTag.js';
import { BiSearch } from 'react-icons/bi';
import RecipeCard from 'src/components/Recipes/RecipeCard/RecipeCard.js';

const RecipesOverview = (props) => {
  const [filterTags, setFilterTags] = useState({
    basics: true,
    breakfast: true,
    main: true,
    dessert: true,
    drinks: true,
  });
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: 'Breakfast',
      referenceReferenceId: {
        id: 1,
        author: {
          id: 1,
          name: 'Nico Rittenau',
        },
      },
      recipesCategoryId: {
        id: 1,
        title: 'breakfast',
      },
      generalValueId: {
        id: 1,
        value: 15,
        generalMeasureId: {
          id: 1,
          abbreviation: 'min',
        },
      },
    },
    {
      id: 2,
      title: 'Main',
      referenceReferenceId: {
        id: 1,
        author: {
          id: 1,
          name: 'Nico Rittenau',
        },
      },
      recipesCategoryId: {
        id: 1,
        title: 'main',
      },
      generalValueId: {
        id: 1,
        value: 30,
        generalMeasureId: {
          id: 1,
          abbreviation: 'min',
        },
      },
    },
    {
      id: 3,
      title: 'Drink',
      referenceReferenceId: {
        id: 1,
        author: {
          id: 1,
          name: 'Nico Rittenau',
        },
      },
      recipesCategoryId: {
        id: 1,
        title: 'drinks',
      },
      generalValueId: {
        id: 1,
        value: 30,
        generalMeasureId: {
          id: 1,
          abbreviation: 'min',
        },
      },
    },
    {
      id: 4,
      title: 'Dessert',
      referenceReferenceId: {
        id: 1,
        author: {
          id: 1,
          name: 'Nico Rittenau',
        },
      },
      recipesCategoryId: {
        id: 1,
        title: 'dessert',
      },
      generalValueId: {
        id: 1,
        value: 30,
        generalMeasureId: {
          id: 1,
          abbreviation: 'min',
        },
      },
    },
  ]);

  /**
   * Toggles the clicked filterTags
   * @param  {Object} e EventObject
   */
  const onToggleFilter = (e) => {
    const name = e.currentTarget.getAttribute('name');
    setFilterTags({
      ...filterTags,
      ...{ [name]: !filterTags[name] },
    });
  };

  return (
    <div className="recipes-overview">
      <SiteHeader
        headline="Recipes"
        onClickPlus={(e) => props.onChangeView('create')}
      />
      <div className="recipe-options">
        <div className="filter-section">
          <h3>Filter</h3>
          <div className="filter-tags">
            <FilterTag
              name="basics"
              onToggleFilter={onToggleFilter}
              isSelected={filterTags.basics}
            >
              basics
            </FilterTag>
            <FilterTag
              name="breakfast"
              onToggleFilter={onToggleFilter}
              isSelected={filterTags.breakfast}
            >
              breakfast
            </FilterTag>
            <FilterTag
              name="main"
              onToggleFilter={onToggleFilter}
              isSelected={filterTags.main}
            >
              main
            </FilterTag>
            <FilterTag
              name="dessert"
              onToggleFilter={onToggleFilter}
              isSelected={filterTags.dessert}
            >
              dessert
            </FilterTag>
            <FilterTag
              name="drinks"
              onToggleFilter={onToggleFilter}
              isSelected={filterTags.drinks}
            >
              drinks
            </FilterTag>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="search-section">
          <input placeholder="Search Recipes"></input>
          <IconFrame>
            <BiSearch />
          </IconFrame>
        </form>
      </div>
      <div className="content-section">
        {recipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              filterTags={filterTags}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecipesOverview;
