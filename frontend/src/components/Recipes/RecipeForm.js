import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader.js';
import FormFrame from 'src/components/Forms/FormFrame.js';
import InputElement from 'src/components/Forms/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement.js';

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

const RecipeForm = (props) => {
  const [recipe, setRecipe] = useState({
    title: '',
    category: '',
    reference: '',
    url: '',
  });
  const [prepTime, setPrepTime] = useState({ value: 0, measure: 'min' });
  const [ingredients, setIngredients] = useState([]);
  const [prepSteps, setPrepSteps] = useState([]);

  const onChange = (e, state, setterFunction) => {
    const selectFieldNames = ['measure', 'reference', 'category'];
    const name = e.target.id;

    let input;
    if (selectFieldNames.includes(name)) {
      input = e.target.getAttribute('value');
    } else {
      input = e.target.value;
    }

    setterFunction({
      ...state,
      ...{ [name]: input },
    });
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
          onChange={(e) => onChange(e, recipe, setRecipe)}
        />
        <div className="form-element value-element">
          <label htmlFor="value">Preparation time</label>
          <div className="value-input">
            <InputElement
              title="value"
              type="number"
              value={prepTime.value}
              onChange={(e) => onChange(e, prepTime, setPrepTime)}
            />
            <SelectElement
              title="measure"
              value={prepTime.measure}
              onSelect={(e) => onChange(e, prepTime, setPrepTime)}
              selectOptions={measures}
            />
          </div>
        </div>
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
      </FormFrame>
    </div>
  );
};

export default RecipeForm;
