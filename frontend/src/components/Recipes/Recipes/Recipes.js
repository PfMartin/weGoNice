import React, { useState } from 'react';
import RecipesOverview from 'src/components/Recipes/RecipesOverview/RecipesOverview.js';
import RecipeForm from 'src/components/Recipes/RecipeForm/RecipeForm.js';
import RecipeDetail from 'src/components/Recipes/RecipeDetail/RecipeDetail.js';

const Recipes = () => {
  const [view, setView] = useState('overview');

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: 'Breakfast recipe',
      referenceReferenceId: {
        id: 1,
        homepage: 'https://www.nikorittenau.com',
        facebook: '',
        instagram: 'https://www.instagram.com/niko_rittenau',
        youtube: '',
        salutation: {
          title: 'Mr.',
          description: '',
        },
        nickname: 'Niko Rittenau',
        firstName: 'Niko',
        lastName: 'Rittenau',
        academicTitle: {
          title: '',
          description: '',
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
      title: 'Main recipe',
      referenceReferenceId: {
        id: 2,
        homepage: 'https://biancazapatka.com',
        facebook: '',
        instagram: 'https://www.instagram.com/biancazapatka/',
        youtube: '',
        salutation: {
          title: 'Mrs.',
          description: '',
        },
        nickname: 'Bianca Zapatka',
        firstName: 'Bianca',
        lastName: 'Zapatka',
        academicTitle: {
          title: '',
          description: '',
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
      title: 'Drink recipe',
      referenceReferenceId: {
        id: 3,
        homepage: 'https://schnabularasa.com',
        facebook: '',
        instagram: 'https://www.instagram.com/schnabula_rasa/',
        youtube: '',
        salutation: {
          title: 'Mrs.',
          description: '',
        },
        nickname: 'Schnabularasa',
        firstName: 'Jelena',
        lastName: '',
        academicTitle: {
          title: '',
          description: '',
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
      title: 'Dessert recipe',
      referenceReferenceId: {
        id: 4,
        homepage: 'https://maxlamanna.com',
        facebook: 'https://www.facebook.com/maxlmanna74',
        instagram: 'https://www.instagram.com/maxlamanna/',
        youtube: 'https://www.youtube.com/channel/UCusvG_uAvkU_4qzx788Z3HQ',
        salutation: {
          title: 'Mr.',
          description: '',
        },
        nickname: 'maxlamanna',
        firstName: 'Max',
        lastName: 'La Manna',
        academicTitle: {
          title: '',
          description: '',
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
        <RecipeDetail
          currentRecipe={currentRecipe}
          onChangeView={onChangeView}
        />
      ) : (
        <RecipeForm view={view} onChangeView={onChangeView} />
      )}
    </div>
  );
};

export default Recipes;
