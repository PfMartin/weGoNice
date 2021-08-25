import React, { Fragment, useState } from 'react';
import RecipesOverview from 'src/components/Recipes/RecipesOverview.js';
import RecipeForm from 'src/components/Recipes/RecipeForm.js';

const Recipes = (props) => {
  const [view, setView] = useState('overview');

  /**
   * Function to change the view in child components
   * @param  {String} input Value the view should be changed to
   */
  const onChangeView = (input) => {
    setView(input);
  };

  return (
    <div className="recipes">
      {view === 'overview' ? (
        <RecipesOverview onChangeView={onChangeView} />
      ) : (
        <RecipeForm onChangeView={onChangeView} />
      )}
    </div>
  );
};

export default Recipes;
