import './RecipeDetail.css';

import React from 'react';
import PropTypes from 'prop-types';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';

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
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    id: 2,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    id: 3,
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
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
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
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
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
];

const RecipeDetail = ({ currentRecipe, onChangeView }) => {
  return (
    <div className="recipe-detail">
      <SiteHeader
        headline={`${currentRecipe.title} by ${currentRecipe.referenceReferenceId.nickname}`}
        onClickBack={(e) => onChangeView('overview')}
      />
      <div className="section">
        <h2>General</h2>
      </div>
      <div className="section">
        <h2>Ingredients</h2>
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
        <h2>Preparation steps</h2>
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
  );
};

export default RecipeDetail;
