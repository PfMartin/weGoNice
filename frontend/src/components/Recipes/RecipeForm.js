import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader.js';
import FormFrame from 'src/components/Forms/FormFrame.js';
import InputElement from 'src/components/Forms/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement.js';

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

const RecipeForm = (props) => {
  const [recipe, setRecipe] = useState({
    title: '',
    prepTime: {
      value: 0,
      measure: '',
    },
    category: '',
    reference: '',
    url: '',
  });
  const [ingredients, setIngredients] = useState([]);
  const [prepSteps, setPrepSteps] = useState([]);

  const onChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    setRecipe({
      ...recipe,
      ...{ [name]: value },
    });

    console.log(recipe);
  };

  return (
    <div className="recipe-form">
      <SiteHeader
        headline={props.view === 'create' ? 'Create Recipe' : 'Modify Recipe'}
        onClickBack={(e) => props.onChangeView('overview')}
      />
      <FormFrame>
        <InputElement
          title="title"
          labelText="Title"
          type="text"
          value={recipe.title}
          onChange={onChange}
        />
        <div className="form-element value-element">
          <label htmlFor="value">Preparation time</label>
          <div className="value-input">
            <input
              type="number"
              id="value"
              value={recipe.prepTime.value}
              onChange={onChange}
            />
            <div className="select-field">---</div>
          </div>
        </div>
        <SelectElement
          labelText="Category"
          value={recipe.category}
          onClick={onChange}
          selectOptions={references}
        />
        <SelectElement
          labelText="Reference"
          value={recipe.reference}
          onSelect={onChange}
          selectOptions={references}
        />
        <InputElement
          title="url"
          labelText="Url"
          type="text"
          value={recipe.url}
          onChange={onChange}
        />
      </FormFrame>
    </div>
  );
};

export default RecipeForm;
