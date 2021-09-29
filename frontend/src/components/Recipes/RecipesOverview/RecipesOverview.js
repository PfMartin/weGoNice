import './RecipesOverview.css';
import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import OptionsBar from 'src/components/Structure/OptionsBar/OptionsBar.js';
import FilterTag from 'src/components/Structure/FilterTag/FilterTag.js';
import Card from 'src/components/Structure/Card/Card.js';

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

  /**
   * Checks if a category should be displayed according to the set filterTags
   * @param  {String} category The category, which should be checked for displaying
   * @return {Bool}          Is true, if both statements are true
   */
  const displayCheck = (recipe, category) => {
    const shouldBeDisplayed =
      recipe.recipesCategoryId.title === category && filterTags[category];

    console.log(category);

    return shouldBeDisplayed;
  };

  return (
    <div className="recipes-overview">
      <SiteHeader
        headline="Recipes"
        onClickPlus={(e) => props.onChangeView('create')}
      />
      <OptionsBar searchPlaceholder="Search Recipes">
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
      </OptionsBar>
      <div className="content-section">
        {recipes.map((recipe) => {
          return displayCheck(recipe, 'basics') ||
            displayCheck(recipe, 'breakfast') ||
            displayCheck(recipe, 'main') ||
            displayCheck(recipe, 'dessert') ||
            displayCheck(recipe, 'drinks') ? (
            <Card key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>
                {recipe.generalValueId.value}{' '}
                {recipe.generalValueId.generalMeasureId.abbreviation}
              </p>
              <p>{recipe.referenceReferenceId.author.name}</p>
              <p className="category-tag">{recipe.recipesCategoryId.title}</p>
            </Card>
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
};

export default RecipesOverview;
