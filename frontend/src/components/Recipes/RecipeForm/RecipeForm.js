import './RecipeForm.css';
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { BiPlus } from 'react-icons/bi';

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

const RecipeForm = ({
  history,
  selectData,
  references,
  selectedRecipe,
  selectedView,
}) => {
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

  useEffect(() => {
    if (selectedView === 'modify') {
      setRecipe({
        title: selectedRecipe.title,
        category: selectedRecipe.recipesCategoryId.title,
        reference: selectedRecipe.referenceReferenceId.title,
        url: selectedRecipe.url,
      });
      setPrepTime({
        value: selectedRecipe.generalValueId.value,
        measure: selectedRecipe.generalValueId.generalMeasureId.abbreviation,
      });
    }
  }, []);

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

    let stateCopy = [...ingredients];
    stateCopy[index] = {
      ...stateCopy[index],
      ...{ [name]: input },
    };

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

  const moveInput = (e, isUp, state, setterFunction) => {
    const index = e.currentTarget.parentNode.getAttribute('index');

    let stateCopy = [...state];
    stateCopy = isUp
      ? arrayMoveImmutable(stateCopy, index, index - 1)
      : arrayMoveImmutable(stateCopy, index, index + 1);

    setterFunction(stateCopy);
  };

  const deleteIngredient = (e) => {
    const index = e.currentTarget.parentNode.getAttribute('index');
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

  const deletePrepStep = (e) => {
    const index = e.currentTarget.parentNode.getAttribute('index');
    let stateCopy = [...prepSteps];
    stateCopy.splice(index, 1);
    setPrepSteps(stateCopy);
  };

  const onSave = () => {
    console.log('onSave');
    // if response.message === 'Recipe Created'
    history.push('/recipes/overview');
  };

  const onDelete = () => {
    console.log('onDelete');
    // if response.message === 'Recipe Deleted'
    history.push('/recipes/overview');
  };

  return (
    <div className="recipe-form">
      <SiteHeader
        headline={selectedView === 'create' ? 'Create Recipe' : 'Modify Recipe'}
        hasBackButton={true}
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
          selectOptions={selectData.measures.filter(
            (measure) => measure.category === 'time'
          )}
        />
        <SelectElement
          title="category"
          labelText="Category"
          value={recipe.category}
          onSelect={(e) => onChange(e, recipe, setRecipe)}
          selectOptions={selectData.recipeCategories}
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
                  moveDown={(e) =>
                    moveInput(e, false, ingredients, setIngredients)
                  }
                  moveUp={(e) =>
                    moveInput(e, true, ingredients, setIngredients)
                  }
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
                  moveDown={(e) => moveInput(e, false, prepSteps, setPrepSteps)}
                  moveUp={(e) => moveInput(e, true, prepSteps, setPrepSteps)}
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
    selectData: state.selectData,
    // recipeCategories: state.recipeCategories,
    references: state.references,
    selectedRecipe: state.selectedRecipe,
    selectedView: state.selectedView,
    // timeMeasures: state.timeMeasures,
  };
};

export default connect(mapStateToProps)(RecipeForm);
