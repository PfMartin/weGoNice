import './RecipeDetail.css';

import React from 'react';
import PropTypes from 'prop-types';

import { BiAlarm } from 'react-icons/bi';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const ingredients = [
  {
    id: 1,
    value: 150,
    measure: 'g',
    text: 'Butter',
  },
  {
    id: 2,
    value: 150,
    measure: 'g',
    text: 'Flour',
  },
  {
    id: 3,
    value: 200,
    measure: 'ml',
    text: 'Water',
  },
  {
    id: 4,
    value: 20,
    measure: 'g',
    text: 'Chocolate',
  },
  {
    id: 5,
    value: 20,
    measure: 'g',
    text: 'Ginger',
  },
  {
    id: 6,
    value: 200,
    measure: 'ml',
    text: 'Vinegar',
  },
  {
    id: 7,
    value: 50,
    measure: 'ml',
    text: 'Almond milk',
  },
  {
    id: 8,
    value: 1,
    measure: 'piece',
    text: 'Apple',
  },
  {
    id: 9,
    value: 100,
    measure: 'g',
    text: 'Rasins',
  },
];

const prepSteps = [
  {
    id: 1,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ',
  },
  {
    id: 2,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    id: 3,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam ',
  },
  {
    id: 4,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,',
  },
  {
    id: 5,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
  },
  {
    id: 6,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata',
  },
  {
    id: 7,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
  },
  {
    id: 8,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    id: 9,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
  },
  {
    id: 10,
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    id: 11,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
  },
  {
    id: 12,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna ',
  },
];

const RecipeDetail = ({ currentRecipe, onChangeView }) => {
  return (
    <div className="recipe-detail">
      <SiteHeader
        headline={currentRecipe.title}
        onClickBack={(e) => onChangeView('overview')}
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
                  {currentRecipe.generalValueId.value}{' '}
                  {currentRecipe.generalValueId.generalMeasureId.abbreviation}
                </h4>
              </div>
              <div className="category-container">
                <h4 className="category">
                  {currentRecipe.recipesCategoryId.title}
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
                {currentRecipe.referenceReferenceId.nickname}
              </a>
            </h2>
          </div>
          <div className="section">
            <h3>Ingredients</h3>
            <div className="ingredients-table">
              <table className="ingredients" cellspacing="0">
                <tr>
                  <th className="right">Value</th>
                  <th className="left">Measure</th>
                  <th className="left">Ingredient</th>
                </tr>
                {ingredients.map((ingredient) => {
                  return (
                    <tr>
                      <td className="right">{ingredient.value}</td>
                      <td className="left">{ingredient.measure}</td>
                      <td className="left">{ingredient.text}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="section">
            <h3>Preparation steps</h3>
            <table className="prep-steps" cellspacing="0">
              {prepSteps.map((prepStep, index) => {
                return (
                  <tr>
                    <td className="right accent">{index + 1}.</td>
                    <td>{prepStep.text}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
