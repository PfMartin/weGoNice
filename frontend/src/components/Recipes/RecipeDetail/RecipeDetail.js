import './RecipeDetail.css';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BiAlarm } from 'react-icons/bi';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const RecipeDetail = ({
  location,
  selectedIngredients,
  selectedPrepSteps,
  selectedRecipe,
}) => {
  useEffect(() => {
    // Load recipes with recipe id from the url
  }, []);

  return (
    <div className="recipe-detail">
      <SiteHeader
        headline={selectedRecipe.title}
        hasBackButton={true}
        hasModifyButton={true}
      />
      <div className="content-frame">
        <div className="detail-content">
          <div className="section">
            <div className="info-header">
              <div className="time-container">
                <IconFrame>
                  <BiAlarm />
                </IconFrame>
                <h4>
                  {selectedRecipe.generalValueId.value}{' '}
                  {selectedRecipe.generalValueId.generalMeasureId.abbreviation}
                </h4>
              </div>
              <div className="category-container">
                <h4 className="category">
                  {selectedRecipe.recipesCategoryId.title}
                </h4>
              </div>
            </div>
            <h2>
              <a
                className="title-link"
                href={selectedRecipe.url}
                target="_blank"
                rel="noreferrer"
              >
                {selectedRecipe.title} by{' '}
                {selectedRecipe.referenceReferenceId.title}
              </a>
            </h2>
          </div>
          <div className="section">
            <h3>Ingredients</h3>
            <div className="ingredients-table">
              <table className="ingredients" cellSpacing="0">
                <tbody>
                  <tr>
                    <th className="right">Value</th>
                    <th className="left">Measure</th>
                    <th className="left">Ingredient</th>
                  </tr>
                </tbody>
                {selectedIngredients.map((ingredient) => {
                  return (
                    <tbody key={ingredient.id}>
                      <tr>
                        <td className="right">{ingredient.value}</td>
                        <td className="left">{ingredient.measure}</td>
                        <td className="left">{ingredient.text}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="section">
            <h3>Preparation steps</h3>
            <table className="prep-steps" cellSpacing="0">
              {selectedPrepSteps.map((prepStep, index) => {
                return (
                  <tbody key={prepStep.id}>
                    <tr>
                      <td className="right accent">{index + 1}.</td>
                      <td>{prepStep.text}</td>
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
    selectedRecipe: state.selectedRecipe,
  };
};

export default connect(mapStateToProps)(RecipeDetail);
