import './RecipeForm.css';
import React from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader.js';

const RecipeForm = (props) => {
  return (
    <div className="recipe-form">
      <SiteHeader
        headline="Recipe Form"
        onClickBack={(e) => props.onChangeView('overview')}
      />
    </div>
  );
};

export default RecipeForm;
