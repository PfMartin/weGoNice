import './RecipeForm.css';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { switchView } from 'src/actions';

import { arrayMoveImmutable } from 'array-move';
import PropTypes from 'prop-types';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import FormFrame from 'src/components/Forms/FormFrame/FormFrame.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import InputElement from 'src/components/Forms/InputElement/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';
import ValueInput from 'src/components/Forms/ValueInput/ValueInput.js';
import IngredientInput from 'src/components/Forms/IngredientInput/IngredientInput.js';
import PrepStepInput from 'src/components/Forms/PrepStepInput/PrepStepInput.js';
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

const RecipeForm = ({ switchView, selectedView }) => {
  const [recipe, setRecipe] = useState({
    title: '',
    category: '',
    reference: '',
    url: '',
  });
  const [prepTime, setPrepTime] = useState({ value: 0, measure: 'min' });
  const [ingredients, setIngredients] = useState([
    {
      id: '',
      value: 0,
      measure: 'g',
      text: '',
    },
  ]);
  const [prepSteps, setPrepSteps] = useState([
    {
      id: '',
      text: '',
    },
  ]);

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

  const updatePrepSteps = (e) => {
    const name = e.target.id;

    const index = e.target.getAttribute('index');
    const input = e.target.value;

    let stateCopy = [...prepSteps];
    stateCopy[index] = {
      ...stateCopy[index],
      ...{ [name]: input },
    };

    setPrepSteps(stateCopy);
  };

  const addPrepStep = () => {
    let stateCopy = [...prepSteps];
    stateCopy.push({
      id: '',
      text: '',
    });

    setPrepSteps(stateCopy);
  };

  const movePrepStepUp = (e) => {
    const index = e.currentTarget.parentNode.getAttribute('index');

    let stateCopy = [...prepSteps];
    stateCopy = arrayMoveImmutable(stateCopy, index, index - 1);

    setPrepSteps(stateCopy);
  };

  const movePrepStepDown = (e) => {
    const index = e.currentTarget.parentNode.getAttribute('index');

    let stateCopy = [...prepSteps];
    stateCopy = arrayMoveImmutable(stateCopy, index, index + 1);

    setPrepSteps(stateCopy);
  };

  const deletePrepStep = (e) => {
    const index = e.currentTarget.parentNode.getAttribute('index');
    let stateCopy = [...prepSteps];
    stateCopy.splice(index, 1);
    setPrepSteps(stateCopy);
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
        headline={selectedView === 'create' ? 'Create Recipe' : 'Modify Recipe'}
        onClickBack={() => switchView('overview')}
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
              <Fragment key={index}>
                <IngredientInput
                  index={index}
                  ingredient={ingredient}
                  moveDown={moveIngredientDown}
                  moveUp={moveIngredientUp}
                  onChange={updateIngredients}
                  onDelete={deleteIngredient}
                />
              </Fragment>
            );
          })}
          <IconFrame>
            <BiPlus onClick={addIngredient} />
          </IconFrame>
        </div>
        <div className="multiple-section form-element">
          <div className="section-title">
            <p>Preparation Steps</p>
          </div>
          {prepSteps.map((prepStep, index) => {
            return (
              <Fragment key={index}>
                <PrepStepInput
                  index={index}
                  moveDown={movePrepStepDown}
                  moveUp={movePrepStepUp}
                  onChange={updatePrepSteps}
                  onDelete={deletePrepStep}
                  prepStep={prepStep}
                  placeholder="hey"
                />
              </Fragment>
            );
          })}
          <IconFrame>
            <BiPlus onClick={addPrepStep} />
          </IconFrame>
        </div>
        {selectedView === 'create' ? (
          <ButtonBar onSave={onSave} />
        ) : (
          <ButtonBar onSave={onSave} onDelete={onDelete} />
        )}
      </FormFrame>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedView: state.selectedView,
  };
};

// RecipeForm.propTypes = {
//   /** Callback for changing the global view */
//   onChangeView: PropTypes.func,
//   /** Gloabal view that defines what components are displayed */
//   view: PropTypes.string,
// };

export default connect(mapStateToProps, { switchView })(RecipeForm);
