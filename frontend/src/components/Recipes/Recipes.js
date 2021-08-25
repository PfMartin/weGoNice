import React, { useState } from 'react';
import RecipesOverview from 'src/components/Recipes/RecipesOverview.js';
import RecipeForm from 'src/components/Recipes/RecipeForm.js';

const Recipes = (props) => {
  const [view, setView] = useState('overview');

  return (
    <div className="recipes">
      {view === 'overview' ? <RecipesOverview /> : <RecipeForm />}
    </div>
  );
};

export default Recipes;
