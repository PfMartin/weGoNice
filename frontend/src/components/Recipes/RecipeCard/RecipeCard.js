import './RecipeCard.css';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe, filterTags }) => {
  /**
   * Checks if a category should be displayed according to the set filterTags
   * @param  {String} category The category, which should be checked for displaying
   * @return {Bool}          Is true, if both statements are true
   */
  const displayCheck = (category) => {
    const shouldBeDisplayed =
      recipe.recipesCategoryId.title === category && filterTags[category];
    return shouldBeDisplayed;
  };

  return (
    <Fragment>
      {displayCheck('basics') ||
      displayCheck('breakfast') ||
      displayCheck('main') ||
      displayCheck('dessert') ||
      displayCheck('drinks') ? (
        <div className="recipe-card">
          <h3>{recipe.title}</h3>
          <p>
            {recipe.generalValueId.value}{' '}
            {recipe.generalValueId.generalMeasureId.abbreviation}
          </p>
          <p>{recipe.referenceReferenceId.author.name}</p>
          <p className="category-tag">{recipe.recipesCategoryId.title}</p>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  filterTags: PropTypes.object,
};

export default RecipeCard;
