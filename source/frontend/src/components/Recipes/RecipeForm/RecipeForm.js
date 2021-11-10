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
        const { error } = await weGoNice.post('/recipes/recipes/', body);
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { error } = await weGoNice.put(
          `/recipes/recipes/${match.params.id}`,
          body
        );
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onSave = async () => {
    try {
      await saveRecipe();
      currentView === 'create'
        ? history.push('/recipes/overview')
        : history.push(`/recipes/detail/${match.params.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async () => {
    try {
      const { error } = await weGoNice.delete(
        `/recipes/recipes/${match.params.id}`
      );

      if (error) throw error;
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
