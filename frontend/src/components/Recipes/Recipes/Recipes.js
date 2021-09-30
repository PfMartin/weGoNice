import React, { useState } from 'react';
import RecipesOverview from 'src/components/Recipes/RecipesOverview/RecipesOverview.js';
import RecipeForm from 'src/components/Recipes/RecipeForm/RecipeForm.js';

const Recipes = () => {
  const [view, setView] = useState('overview');

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

  const [currentRecipe, setCurrentRecipe] = useState({});

  /**
   * Function to change the view in child components
   * @param  {String} input Value the view should be changed to
   */
  const onChangeView = (input) => {
    setView(input);
  };

  const onSetCurrentRecipe = (input) => {
    setCurrentRecipe(input);
  };

  return (
    <div className="recipes">
      {view === 'overview' ? (
        <RecipesOverview
          onChangeView={onChangeView}
          onSetCurrentRecipe={onSetCurrentRecipe}
          recipes={recipes}
        />
      ) : view === 'detail' ? (
        <h1>Hi</h1>
      ) : (
        <RecipeForm view={view} onChangeView={onChangeView} />
      )}
    </div>
  );
};

export default Recipes;
