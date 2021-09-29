import React, { useState } from 'react';
import RecipesOverview from 'src/components/Recipes/RecipesOverview/RecipesOverview.js';
import RecipeForm from 'src/components/Recipes/RecipeForm/RecipeForm.js';

const Recipes = () => {
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
      ) : view === 'create' ? (
        <RecipeForm view={view} onChangeView={onChangeView} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Recipes;
