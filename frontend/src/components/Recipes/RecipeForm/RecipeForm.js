import './RecipeForm.css';

import { arrayMoveImmutable } from 'array-move';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import FormFrame from 'src/components/Forms/FormFrame/FormFrame.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import InputElement from 'src/components/Forms/InputElement/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';
import ValueInput from 'src/components/Forms/ValueInput/ValueInput.js';
import IngredientInput from 'src/components/Forms/IngredientInput/IngredientInput.js';
import ButtonBar from 'src/components/Forms/ButtonBar/ButtonBar.js';

import { BiPlus } from 'react-icons/bi';

const categories = [
  {
    id: 1,
    title: 'breakfast',
  },
  {
    id: 2,
    title: 'main',
  },
  {
    id: 3,
    title: 'basics',
  },
  {
    id: 4,
    title: 'dessert',
  },
  {
    id: 5,
    title: 'drinks',
  },
];

const references = [
  {
    id: 1,
    title: 'Nico Rittenau',
  },
  {
    id: 2,
    title: 'Schnabularasa',
  },
];

const measures = [
  {
    id: 1,
    title: 'hr',
  },
  {
    id: 2,
    title: 'min',
  },
  {
    id: 3,
    title: 's',
  },
];

const RecipeForm = ({ onChangeView, view }) => {
  const [recipe, setRecipe] = useState({
    title: '',
    category: '',
    reference: '',
    url: '',
  });
  const [prepTime, setPrepTime] = useState({ value: 0, measure: 'min' });
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      value: 0,
      measure: 'g',
      text: '',
    },
    {
      id: 2,
      value: 0,
      measure: 'g',
      text: '',
    },
  ]);
  const [prepSteps, setPrepSteps] = useState([]);

  const onChange = (e, state, setterFunction) => {
    const selectFieldNames = ['measure', 'reference', 'category'];
    const name = e.target.id;

    let input;
    if (selectFieldNames.includes(name)) {
      input = e.target.getAttribute('value');
    } else if (name === 'value') {
      input = parseInt(e.target.value);
    } else {
      input = e.target.value;
    }

    setterFunction({
      ...state,
      ...{ [name]: input },
    });

    console.log(state);
  };

  const updateIngredients = (e) => {
    const name = e.target.id;

    let index;
    let input;
    if (name === 'value' || name === 'text') {
      index = e.target.getAttribute('index');
      input = e.target.value;
    } else if (name === 'measure') {
      index = e.target.parentNode.getAttribute('index');
      input = e.target.getAttribute('value');
    }

    console.log(name, index, input);

    let stateCopy = [...ingredients];
    stateCopy[index] = {
      ...stateCopy[index],
      ...{ [name]: input },
    };

    console.log(stateCopy);

    setIngredients(stateCopy);
  };

  const addIngredient = (e) => {
    let stateCopy = [...ingredients];
    stateCopy.push({
      id: '',
      value: 0,
      measure: 'g',
      text: '',
    });

    setIngredients(stateCopy);
  };

  const moveIngredientUp = (e) => {
    const index = e.currentTarget.parentNode.getAttribute('index');

    let stateCopy = [...ingredients];
    stateCopy = arrayMoveImmutable(stateCopy, index, index - 1);

    setIngredients(stateCopy);
  };

  const moveIngredientDown = (e) => {
    const index = e.currentTarget.parentNode.getAttribute('index');

    let stateCopy = [...ingredients];
    stateCopy = arrayMoveImmutable(stateCopy, index, index + 1);

    setIngredients(stateCopy);
  };

  const deleteIngredient = (e) => {
    const index = e.currentTarget.parentNode.getAttribute('index');
    console.log(e.currentTarget.parentNode);
    let stateCopy = [...ingredients];
    stateCopy.splice(index, 1);
    setIngredients(stateCopy);
  };

  const onSave = () => {
    console.log('onSave');
  };

  const onDelete = () => {
    console.log('onDelete');
  };

  return (
    <div className="recipe-form">
      <SiteHeader
        headline={view === 'create' ? 'Create Recipe' : 'Modify Recipe'}
        onClickBack={(e) => onChangeView('overview')}
      />
      <FormFrame>
        <InputElement
          title="title"
          labelText="Title"
          type="text"
          value={recipe.title}
          onChange={(e) => onChange(e, recipe, setRecipe)}
        />
        <ValueInput
          labelText="Preparation Time"
          value={prepTime.value}
          measure={prepTime.measure}
          onChange={(e) => onChange(e, prepTime, setPrepTime)}
          selectOptions={measures}
        />
        <SelectElement
          title="category"
          labelText="Category"
          value={recipe.category}
          onSelect={(e) => onChange(e, recipe, setRecipe)}
          selectOptions={categories}
        />
        <SelectElement
          title="reference"
          labelText="Reference"
          value={recipe.reference}
          onSelect={(e) => onChange(e, recipe, setRecipe)}
          selectOptions={references}
        />
        <InputElement
          title="url"
          labelText="Url"
          type="text"
          value={recipe.url}
          onChange={(e) => onChange(e, recipe, setRecipe)}
        />
        <div className="multiple-section form-element">
          <div className="section-title">
            <p>Ingredients</p>
          </div>
          {ingredients.map((ingredient, index) => {
            return (
              <IngredientInput
                index={index}
                ingredient={ingredient}
                onChange={updateIngredients}
                onDelete={deleteIngredient}
                moveUp={moveIngredientUp}
                moveDown={moveIngredientDown}
              />
            );
          })}
          <IconFrame>
            <BiPlus onClick={addIngredient} />
          </IconFrame>
        </div>
        {view === 'create' ? (
          <ButtonBar onSave={onSave} />
        ) : (
          <ButtonBar onSave={onSave} onDelete={onDelete} />
        )}
      </FormFrame>
    </div>
  );
};

RecipeForm.propTypes = {
  /** Callback for changing the global view */
  onChangeView: PropTypes.func,
  /** Gloabal view that defines what components are displayed */
  view: PropTypes.string,
};

export default RecipeForm;
