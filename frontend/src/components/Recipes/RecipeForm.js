import './RecipeForm.css';
import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader.js';

const RecipeForm = (props) => {
  const [recipe, setRecipe] = useState({
    title: '',
  });

  const onChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    setRecipe({
      ...recipe,
      ...{ title: value },
    });

    console.log(recipe);
  };

  const onSave = (e) => {
    e.preventDefault();
    console.log('Saving');
  };
  return (
    <div className="recipe-form">
      <SiteHeader
        headline="Recipe Form"
        onClickBack={(e) => props.onChangeView('overview')}
      />
      <form onSubmit={onSave}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={recipe.title}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default RecipeForm;
