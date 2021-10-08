import React, { useState } from 'react';
import { connect } from 'react-redux';

import RecipesOverview from 'src/components/Recipes/RecipesOverview/RecipesOverview.js';
import RecipeForm from 'src/components/Recipes/RecipeForm/RecipeForm.js';
import RecipeDetail from 'src/components/Recipes/RecipeDetail/RecipeDetail.js';

const Recipes = ({ selectedView }) => {
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
    selectedView: state.selectedView,
  };
};

export default connect(mapStateToProps)(Recipes);
