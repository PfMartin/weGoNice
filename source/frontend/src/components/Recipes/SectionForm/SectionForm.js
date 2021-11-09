import './SectionForm.css';

import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import weGoNice from 'src/apis/weGoNice';
import { arrayMoveImmutable } from 'array-move';

import { BiPlus } from 'react-icons/bi';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader';
import FormFrame from 'src/components/Forms/FormFrame/FormFrame';
import InputElement from 'src/components/Forms/InputElement/InputElement.js';
import IngredientInput from 'src/components/Forms/IngredientInput/IngredientInput.js';
import PrepStepInput from 'src/components/Forms/PrepStepInput/PrepStepInput';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import ButtonBar from 'src/components/Forms/ButtonBar/ButtonBar.js';

const SectionForm = ({ history, match, measures }) => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [ingredients, setIngredients] = useState([
    {
      id: null,
      value: 0,
      measure: 'g',
      text: '',
    },
  ]);
  const [prepSteps, setPrepSteps] = useState([
    {
      id: null,
      text: '',
    },
  ]);

  const currentView =
    match.url.split('/').reverse()[0] === 'create' ? 'create' : 'modify';

  const moveInput = (e, isUp, state, setterFunction) => {
    const index = e.currentTarget.parentNode.getAttribute('index');

    let stateCopy = [...state];
    stateCopy = isUp
      ? arrayMoveImmutable(stateCopy, index, index - 1)
      : arrayMoveImmutable(stateCopy, index, index + 1);

    setterFunction(stateCopy);
  };

  const updateSectionTitle = (e) => {
    setSectionTitle(e.target.value);
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

  const addPrepStep = () => {
    let stateCopy = [...prepSteps];
    stateCopy.push({
      id: '',
      text: '',
    });

    setPrepSteps(stateCopy);
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

  const deleteIngredient = async (e) => {
    try {
      const index = e.currentTarget.parentNode.getAttribute('index');

      // Delete from database
      if (ingredients[index].id) {
        await weGoNice.delete(`/recipes/ingredients/${ingredients[index].id}`);
      }

      // Delete from UI
      let stateCopy = [...ingredients];
      stateCopy.splice(index, 1);
      setIngredients(stateCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePrepStep = async (e) => {
    try {
      const index = e.currentTarget.parentNode.getAttribute('index');

      // Delete from database
      if (prepSteps[index].id) {
        await weGoNice.delete(`/recipes/prep_steps/${prepSteps[index].id}`);
      }

      // Delete from UI
      let stateCopy = [...prepSteps];
      stateCopy.splice(index, 1);
      setPrepSteps(stateCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const saveIngredients = async () => {
    const recipeId = parseInt(match.params.id);
    for (const [index, ingredient] of ingredients.entries()) {
      const generalMeasure = measures.find(
        (measure) => measure.title === ingredient.measure
      );

      const body = {
        value: ingredient.value,
        generalMeasureId: generalMeasure.id,
        title: ingredient.text,
        rank: index + 1,
        recipesRecipeId: recipeId,
        recipeSection: sectionTitle,
      };

      // If the ingredient doesn't have an id yet, it needs to be created
      if (!ingredient.id) {
        try {
          const { error } = await weGoNice.post('/recipes/ingredients', body);
          if (error) throw error;
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const { error } = await weGoNice.put(
            `/recipes/ingredients/${ingredient.id}`,
            body
          );
          if (error) throw error;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const savePrepSteps = async () => {
    const recipeId = parseInt(match.params.id);
    for (const [index, prepStep] of prepSteps.entries()) {
      const body = {
        title: prepStep.text,
        rank: index + 1,
        recipesRecipeId: recipeId,
        recipeSection: sectionTitle,
      };

      if (!prepStep.id) {
        try {
          const { error } = await weGoNice.post('/recipes/prep_steps', body);
          if (error) throw error;
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const { error } = await weGoNice.put(
            `/recipes/prep_steps/${prepStep.id}`,
            body
          );
          if (error) throw error;
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const onSave = () => {
    try {
      saveIngredients();
      savePrepSteps();
      history.push(`/recipes/detail/${match.params.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = () => {
    console.log('Delete Section');
  };

  return (
    <div className="section-form">
      <SiteHeader headline="Create Section" hasBackButton={true} />

      <FormFrame>
        <InputElement
          title="title"
          labelText="Title"
          type="text"
          value={sectionTitle}
          onChange={updateSectionTitle}
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
    measures: state.selectData.measures,
  };
};

export default connect(mapStateToProps)(SectionForm);
