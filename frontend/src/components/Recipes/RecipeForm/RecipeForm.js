import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import FormFrame from 'src/components/Forms/FormFrame/FormFrame.js';
import InputElement from 'src/components/Forms/InputElement/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';
import ValueInput from 'src/components/Forms/ValueInput/ValueInput.js';

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
      </FormFrame>
    </div>
  );
};

export default RecipeForm;
