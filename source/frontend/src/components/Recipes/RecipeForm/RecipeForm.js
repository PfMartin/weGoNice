import './RecipeForm.css';
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchReferences } from 'src/actions';

import weGoNice from 'src/apis/weGoNice';

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
  fetchReferences,
  history,
  match,
  selectData,
  references,
}) => {
  const currentView =
    match.url.split('/').reverse()[0] === 'create' ? 'create' : 'modify';

  const [recipe, setRecipe] = useState({
    id: '',
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
    if (currentView === 'modify') {
      onInitial();
    }
    fetchReferences();
  }, []);

  const onInitial = async () => {
    const recipeId = parseInt(match.params.id);
    const resRecipe = await weGoNice.get(`/recipes/recipes/${recipeId}`);
    const currentRecipe = await resRecipe.data;

    setRecipe({
      id: currentRecipe.id,
      title: currentRecipe.title,
      category: currentRecipe.recipesCategory.title,
      reference: currentRecipe.referencesReference.title,
      url: currentRecipe.url,
    });

    setPrepTime({
      value: currentRecipe.prepTimeValue,
      measure: currentRecipe.generalMeasure.title,
    });

    const resIngredients = await weGoNice.get(
      `/recipes/ingredients_by_recipe/${recipeId}`
    );

    const currentIngredients = resIngredients.data.map((ingredient) => {
      return {
        id: ingredient.id,
        value: ingredient.value,
        measure: ingredient.generalMeasure.title,
        text: ingredient.title,
      };
    });

    setIngredients(currentIngredients);

    const resPrepSteps = await weGoNice.get(
      `/recipes/prep_steps_by_recipe/${recipeId}`
    );
    const currentPrepSteps = resPrepSteps.data.map((prepStep) => {
      return {
        id: prepStep.id,
        text: prepStep.title,
      };
    });

    setPrepSteps(currentPrepSteps);
  };

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

  const deleteIngredient = async (e) => {
    try {
      const index = e.currentTarget.parentNode.getAttribute('index');

      // Delete from database
      await weGoNice.delete(`/recipes/ingredients/${ingredients[index].id}`);

      // Delete from UI
      let stateCopy = [...ingredients];
      stateCopy.splice(index, 1);
      setIngredients(stateCopy);
    } catch (err) {
      console.error(err);
    }
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
    console.log(prepSteps);
  };

  const addPrepStep = () => {
    let stateCopy = [...prepSteps];
    stateCopy.push({
      id: '',
      text: '',
    });

    setPrepSteps(stateCopy);
  };

  const deletePrepStep = async (e) => {
    try {
      const index = e.currentTarget.parentNode.getAttribute('index');

      // Delete from database
      await weGoNice.delete(`/recipes/prep_steps/${prepSteps[index].id}`);

      // Delete from UI
      let stateCopy = [...prepSteps];
      stateCopy.splice(index, 1);
      setPrepSteps(stateCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const saveRecipe = async () => {
    const category = selectData.recipeCategories.find(
      (category) => category.title === recipe.category
    );
    const reference = references.find(
      (reference) => reference.title === recipe.reference
    );

    const prepTimeMeasure = selectData.measures.find(
      (measure) => measure.title === prepTime.measure
    );

    const body = {
      title: recipe.title,
      prepTimeValue: prepTime.value,
      generalMeasureId: prepTimeMeasure.id,
      url: recipe.url,
      referencesReferenceId: reference.id,
      recipesCategoryId: category.id,
    };

    if (currentView === 'create') {
      console.log(currentView);
      try {
        const response = await weGoNice.post('/recipes/recipes/', body);
        return response.data.id;
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await weGoNice.put(`/recipes/recipes/${match.params.id}`, body);
        return null;
      } catch (err) {
        console.error(err);
      }
    }
  };

  const saveIngredients = async (recipeId) => {
    for (const [index, ingredient] of ingredients.entries()) {
      const generalMeasure = selectData.measures.find(
        (measure) => measure.title === ingredient.measure
      );

      const body = {
        value: ingredient.value,
        generalMeasureId: generalMeasure.id,
        title: ingredient.text,
        rank: index + 1,
      };

      // If the recipe already exists it won't return its id on save
      // Therefore, we need to check if recipeId is defined before assigning an recipeId to the body
      body.recipesRecipeId = recipeId ? recipeId : parseInt(match.params.id);

      // If the ingredient doesn't have an id yet, it needs to be created
      if (!ingredient.id) {
        await weGoNice.post('/recipes/ingredients', body);
      } else {
        await weGoNice.put(`/recipes/ingredients/${ingredient.id}`, body);
      }
    }
  };

  const savePrepSteps = async (recipeId) => {
    for (const [index, prepStep] of prepSteps.entries()) {
      const body = {
        title: prepStep.text,
        rank: index + 1,
      };

      body.recipesRecipeId = recipeId ? recipeId : parseInt(match.params.id);

      if (!prepStep.id) {
        await weGoNice.post('/recipes/prep_steps', body);
      } else {
        await weGoNice.put(`/recipes/prep_steps/${prepStep.id}`, body);
      }
    }
  };

  const onSave = async () => {
    try {
      const recipeId = await saveRecipe();
      await saveIngredients(recipeId);
      await savePrepSteps(recipeId);
      currentView === 'create'
        ? history.push('/recipes/overview')
        : history.push(`/recipes/detail/${match.params.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async () => {
    try {
      await weGoNice.delete(`/recipes/recipes/${match.params.id}`);

      for (const ingredient of ingredients) {
        await weGoNice.delete(`/recipes/ingredients/${ingredient.id}`);
      }

      for (const prepStep of prepSteps) {
        await weGoNice.delete(`/recipes/prep_steps/${prepStep.id}`);
      }

      history.push('/recipes/overview');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="recipe-form">
      <SiteHeader
        headline={currentView === 'create' ? 'Create Recipe' : 'Modify Recipe'}
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
        {currentView === 'create' ? (
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
    references: state.references,
    selectData: state.selectData,
  };
};

export default connect(mapStateToProps, { fetchReferences })(RecipeForm);