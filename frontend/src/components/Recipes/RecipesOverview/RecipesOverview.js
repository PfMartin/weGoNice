import './RecipesOverview.css';
import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import OptionsBar from 'src/components/Structure/OptionsBar/OptionsBar.js';
import FilterTag from 'src/components/Structure/FilterTag/FilterTag.js';
import Card from 'src/components/Structure/Card/Card.js';

const RecipesOverview = ({ onChangeView, onSetCurrentRecipe, recipes }) => {
  const [filterTags, setFilterTags] = useState({
    basics: true,
    breakfast: true,
    main: true,
    dessert: true,
    drinks: true,
  });

  const onToggleAllFilter = (e) => {
    if (
      filterTags.basics ||
      filterTags.breakfast ||
      filterTags.main ||
      filterTags.dessert ||
      filterTags.drinks
    ) {
      setFilterTags({
        basics: false,
        breakfast: false,
        main: false,
        dessert: false,
        drinks: false,
      });
    } else {
      setFilterTags({
        basics: true,
        breakfast: true,
        main: true,
        dessert: true,
        drinks: true,
      });
    }
  };

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

    return shouldBeDisplayed;
  };

  const onGetDetail = (e) => {
    const id = parseInt(e.currentTarget.getAttribute('id'));
    const recipe = recipes.filter((r) => r.id === id)[0];

    onSetCurrentRecipe(recipe);
    onChangeView('detail');
  };

  return (
    <div className="recipes-overview">
      <SiteHeader
        headline="Recipes"
        onClickPlus={(e) => onChangeView('create')}
      />
      <OptionsBar
        searchPlaceholder="Search Recipes"
        onClickFilter={onToggleAllFilter}
      >
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
            <Card id={recipe.id} key={recipe.id} onClick={onGetDetail}>
              <h3>{recipe.title}</h3>
              <p>
                {recipe.generalValueId.value}{' '}
                {recipe.generalValueId.generalMeasureId.abbreviation}
              </p>
              <p>{recipe.referenceReferenceId.nickname}</p>
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
