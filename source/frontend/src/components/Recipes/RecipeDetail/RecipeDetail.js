import './RecipeDetail.css';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import weGoNice from 'src/apis/weGoNice.js';

import { BiAlarm } from 'react-icons/bi';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const RecipeDetail = ({
  match,
  location,
  selectedIngredients,
  selectedPrepSteps,
}) => {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [currentPrepSteps, setCurrentPrepSteps] = useState([]);

  useEffect(() => {
    getRecipe();
    getIngredients();
    getPrepSteps();
  }, []);

  const getRecipe = async () => {
    const response = await weGoNice.get(
      `/recipes/recipes/${parseInt(match.params.id)}`
    );
    const recipe = await response.data;

    setCurrentRecipe(recipe);
  };

  const getIngredients = async () => {
    const response = await weGoNice.get(
      `/recipes/ingredients_by_recipe/${match.params.id}`
    );
    const ingredients = await response.data;
    setCurrentIngredients(ingredients);
  };

  const getPrepSteps = async () => {
    const response = await weGoNice.get(
      `/recipes/prep_steps_by_recipe/${match.params.id}`
    );
    const prepSteps = await response.data;
    setCurrentPrepSteps(prepSteps);
  };

  const displayPrepTime = () => {
    return (
      <h4>
        {currentRecipe.prepTimeValue} {currentRecipe.generalMeasure.title}
      </h4>
    );
  };

  return !currentRecipe ||
    !currentRecipe.recipesCategory ||
    !currentRecipe.referencesReference ||
    !currentIngredients ||
    !currentPrepSteps ? (
    <h1>Loading...</h1>
  ) : (
    <div className="recipe-detail">
      <SiteHeader
        headline={currentRecipe.title}
        hasBackButton={true}
        hasModifyButton={true}
        currentRecipeId={currentRecipe.id}
      />
      <div className="content-frame">
        <div className="detail-content">
          <div className="section">
            <div className="info-header">
              <div className="time-container">
                <IconFrame>
                  <BiAlarm />
                </IconFrame>
                {displayPrepTime()}
              </div>
              <div className="category-container">
                <h4 className="category">
                  {currentRecipe.recipesCategory.title}
                </h4>
              </div>
            </div>
            <h2>
              <a
                className="title-link"
                href={currentRecipe.url}
                target="_blank"
                rel="noreferrer"
              >
                {currentRecipe.title} by{' '}
                {currentRecipe.referencesReference.title}
              </a>
            </h2>
          </div>
          <div className="section">
            <h3>Ingredients</h3>
            <div className="ingredients-table">
              <table className="ingredients" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="right">Value</th>
                    <th className="left">Measure</th>
                    <th className="left">Ingredient</th>
                  </tr>
                </thead>
                <tbody>
                  {currentIngredients.map((ingredient) => {
                    return (
                      <tr key={ingredient.id}>
                        <td className="right">{ingredient.value}</td>
                        <td className="left">
                          {ingredient.generalMeasure.title}
                        </td>
                        <td className="left">{ingredient.title}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="section">
            <h2>Instructions</h2>
            <h3>Sauce</h3>
            <div className="ingredients-table">
              <table className="ingredients" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="right">Value</th>
                    <th className="left">Measure</th>
                    <th className="left">Ingredient</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="right">50 (mock)</td>
                    <td className="left">g (mock)</td>
                    <td className="left">Flour (mock)</td>
                  </tr>
                  <tr>
                    <td className="right">100 (mock)</td>
                    <td className="left">ml (mock)</td>
                    <td className="left">Milk (mock)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table className="prep-steps" cellSpacing="0">
              <tbody>
                <tr>
                  <td className="right accent">1.</td>
                  <td>First Step (mock)</td>
                </tr>
                <tr>
                  <td className="right accent">2.</td>
                  <td>Second Step (mock)</td>
                </tr>
              </tbody>
            </table>

            <h3>Batter</h3>
            <div className="ingredients-table">
              <table className="ingredients" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="right">Value</th>
                    <th className="left">Measure</th>
                    <th className="left">Ingredient</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="right">50 (mock)</td>
                    <td className="left">g (mock)</td>
                    <td className="left">Flour (mock)</td>
                  </tr>
                  <tr>
                    <td className="right">100 (mock)</td>
                    <td className="left">ml (mock)</td>
                    <td className="left">Milk (mock)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table className="prep-steps" cellSpacing="0">
              <tbody>
                <tr>
                  <td className="right accent">1.</td>
                  <td>First Step (mock)</td>
                </tr>
                <tr>
                  <td className="right accent">2.</td>
                  <td>Second Step (mock)</td>
                </tr>
              </tbody>
            </table>

            <button>Add Instruction</button>

            <h3>Preparation steps</h3>
            <table className="prep-steps" cellSpacing="0">
              {currentPrepSteps.map((prepStep, index) => {
                return (
                  <tbody key={prepStep.id}>
                    <tr>
                      <td className="right accent">{index + 1}.</td>
                      <td>{prepStep.title}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedIngredients: state.selectedIngredients,
    selectedPrepSteps: state.selectedPrepSteps,
  };
};

export default connect(mapStateToProps)(RecipeDetail);
