import React, { useState } from 'react';
import { connect } from 'react-redux';
import { switchView, selectRecipe } from 'src/actions';

import RecipesOverview from 'src/components/Recipes/RecipesOverview/RecipesOverview.js';
import RecipeForm from 'src/components/Recipes/RecipeForm/RecipeForm.js';
import RecipeDetail from 'src/components/Recipes/RecipeDetail/RecipeDetail.js';

const Recipes = ({
  recipes,
  selectedRecipe,
  selectRecipe,
  selectedView,
  switchView,
}) => {
  // const onSetCurrentRecipe = (input) => {
  //   setCurrentRecipe(input);
  // };

  return (
    <div className="recipes">
      {selectedView === 'overview' ? (
        <RecipesOverview />
      ) : selectedView === 'detail' ? (
        <RecipeDetail />
      ) : (
        <RecipeForm />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRecipe: state.selectedRecipe,
    selectedView: state.selectedView,
    recipes: state.recipes,
  };
};

export default connect(mapStateToProps, { switchView, selectRecipe })(Recipes);
