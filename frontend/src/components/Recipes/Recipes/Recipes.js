import React, { useState } from 'react';
import { connect } from 'react-redux';
import { switchView } from 'src/actions';

import RecipesOverview from 'src/components/Recipes/RecipesOverview/RecipesOverview.js';
import RecipeForm from 'src/components/Recipes/RecipeForm/RecipeForm.js';
import RecipeDetail from 'src/components/Recipes/RecipeDetail/RecipeDetail.js';

const Recipes = ({ recipes, selectedView, switchView }) => {
  const [currentRecipe, setCurrentRecipe] = useState({});

  const onSetCurrentRecipe = (input) => {
    setCurrentRecipe(input);
  };

  return (
    <div className="recipes">
      {selectedView === 'overview' ? (
        <RecipesOverview
          onSetCurrentRecipe={onSetCurrentRecipe}
          recipes={recipes}
        />
      ) : selectedView === 'detail' ? (
        <RecipeDetail currentRecipe={currentRecipe} />
      ) : (
        <RecipeForm />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedView: state.selectedView,
    recipes: state.recipes,
  };
};

export default connect(mapStateToProps, { switchView })(Recipes);
