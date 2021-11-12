import './RecipeDetail.css';

import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import weGoNice from 'src/apis/weGoNice.js';

import { BiAlarm, BiPlus, BiPencil } from 'react-icons/bi';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const RecipeDetail = ({
  match,
  location,
  selectedIngredients,
  selectedPrepSteps,
}) => {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [currentSections, setCurrentSections] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [currentPrepSteps, setCurrentPrepSteps] = useState([]);

  useEffect(() => {
    getRecipe();
    getSectionData();
  }, []);

  const getRecipe = async () => {
    const response = await weGoNice.get(
      `/recipes/recipes/${parseInt(match.params.id)}`
    );
    const recipe = await response.data;

    setCurrentRecipe(recipe);
  };

  const getSectionData = async () => {
    const ingredientResponse = await weGoNice.get(
      `/recipes/ingredients_by_recipe/${match.params.id}`
    );
    const prepStepResponse = await weGoNice.get(
      `/recipes/prep_steps_by_recipe/${match.params.id}`
    );

    const ingredients = await ingredientResponse.data;
    const prepSteps = await prepStepResponse.data;

    setCurrentIngredients(ingredients);
    setCurrentPrepSteps(prepSteps);

    const sectionData = [...ingredients, ...prepSteps];
    const sections = [
      ...new Set(sectionData.map((ingredient) => ingredient.recipeSection)),
    ];

    setCurrentSections(sections);
  };

  const displayPrepTime = () => {
    return (
      <h4>
        {currentRecipe.prepTimeValue} {currentRecipe.generalMeasure.title}
      </h4>
    );
  };

  const displayAllIngredients = () => {
    return currentIngredients.map((ingredient) => {
      return (
        <tr key={ingredient.id}>
          <td className="right">
            {ingredient.value !== 0 ? ingredient.value : ''}
          </td>
          <td className="left">
            {ingredient.value !== 0 ? ingredient.generalMeasure.title : ''}
          </td>
          <td className="left">{ingredient.title}</td>
        </tr>
      );
    });
  };

  const displaySectionIngredients = (sectionTitle) => {
    return currentIngredients
      .filter((ingredient) => ingredient.recipeSection === sectionTitle)
      .map((element) => {
        return (
          <tr key={element.title}>
            <td className="right">
              {element.value !== 0 ? element.value : ''}
            </td>
            <td className="left">
              {element.value !== 0 ? element.generalMeasure.title : ''}
            </td>
            <td className="left">{element.title}</td>
          </tr>
        );
      });
  };

  const displaySectionPrepSteps = (sectionTitle) => {
    return currentPrepSteps
      .filter((prepStep) => prepStep.recipeSection === sectionTitle)
      .map((prepStep, index) => {
        return (
          <tr key={index}>
            <td className="right accent">{`${index + 1}.`}</td>
            <td>{prepStep.title}</td>
          </tr>
        );
      });
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
            <h1>
              <a
                className="title-link"
                href={currentRecipe.url}
                target="_blank"
                rel="noreferrer"
              >
                {currentRecipe.title} by{' '}
                {currentRecipe.referencesReference.title}
              </a>
            </h1>
          </div>
          <div className="section">
            <h2>Ingredients</h2>
            <div className="ingredients-table">
              <table className="ingredients" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="right">Value</th>
                    <th className="left">Measure</th>
                    <th className="left">Ingredient</th>
                  </tr>
                </thead>
                <tbody>{displayAllIngredients()}</tbody>
              </table>
            </div>
          </div>

          <div className="section">
            <h2>Instructions</h2>
            {currentSections.map((sectionTitle) => {
              return (
                <Fragment key={sectionTitle}>
                  <div className="section-header">
                    <h3>{sectionTitle}</h3>
                    <Link
                      to={`/recipes/detail/${match.params.id}/section/modify/${sectionTitle}`}
                      className="modify-link"
                    >
                      <IconFrame>
                        <BiPencil />
                      </IconFrame>
                    </Link>
                  </div>
                  <div className="ingredients-table">
                    <table className="ingredients" cellSpacing="0">
                      <thead>
                        <tr>
                          <th className="right">Value</th>
                          <th className="left">Measure</th>
                          <th className="left">Ingredient</th>
                        </tr>
                      </thead>
                      <tbody>{displaySectionIngredients(sectionTitle)}</tbody>
                    </table>
                  </div>
                  <table className="prep-steps" cellSpacing="0">
                    <tbody>{displaySectionPrepSteps(sectionTitle)}</tbody>
                  </table>
                </Fragment>
              );
            })}

            <Link to={`/recipes/detail/${match.params.id}/section/create`}>
              <IconFrame size="25px">
                <BiPlus />
              </IconFrame>
            </Link>
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
