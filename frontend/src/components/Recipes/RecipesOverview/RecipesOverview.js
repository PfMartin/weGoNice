import './RecipesOverview.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchRecipes } from 'src/actions';

import { BiAlarm, BiUser } from 'react-icons/bi';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import OptionsBar from 'src/components/Structure/OptionsBar/OptionsBar.js';
import FilterTag from 'src/components/Structure/FilterTag/FilterTag.js';
import Card from 'src/components/Structure/Card/Card.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const RecipesOverview = ({ fetchRecipes, location, recipes }) => {
  const [filterTags, setFilterTags] = useState({
    basics: true,
    breakfast: true,
    main: true,
    dessert: true,
    drinks: true,
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onToggleAllFilter = (e) => {
    if (
      filterTags.basics ||
      filterTags.breakfast ||
      filterTags.main ||
      filterTags.dessert ||
      filterTags.drinks
    ) {
      setFilterTags({
        basics: false,
        breakfast: false,
        main: false,
        dessert: false,
        drinks: false,
      });
    } else {
      setFilterTags({
        basics: true,
        breakfast: true,
        main: true,
        dessert: true,
        drinks: true,
      });
    }
  };

  const onToggleFilter = (e) => {
    const name = e.currentTarget.getAttribute('name');
    setFilterTags({
      ...filterTags,
      ...{ [name]: !filterTags[name] },
    });
  };

  const displayCheck = (recipe, category) => {
    const shouldBeDisplayed =
      recipe.recipesCategory.title.toUpperCase() === category.toUpperCase() &&
      filterTags[category];

    return shouldBeDisplayed;
  };

  const filterCheck = (recipe) => {
    return (
      displayCheck(recipe, 'basics') ||
      displayCheck(recipe, 'breakfast') ||
      displayCheck(recipe, 'main') ||
      displayCheck(recipe, 'dessert') ||
      displayCheck(recipe, 'drinks')
    );
  };

  // The recipes overview page is displayed with the path host:port and host:port/recipes/overview
  // To forward to the create page from both paths both cases need to be considered
  const detailPath =
    location.pathname.split('/')[1] === '' ? 'recipes/detail' : 'detail';

  return (
    <div className="recipes-overview">
      <SiteHeader headline="Recipes" hasAddButton={true} />
      <OptionsBar
        searchPlaceholder="Search Recipes"
        onClickFilter={onToggleAllFilter}
      >
        <FilterTag
          name="basics"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.basics}
        >
          basics
        </FilterTag>
        <FilterTag
          name="breakfast"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.breakfast}
        >
          breakfast
        </FilterTag>
        <FilterTag
          name="main"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.main}
        >
          main
        </FilterTag>
        <FilterTag
          name="dessert"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.dessert}
        >
          dessert
        </FilterTag>
        <FilterTag
          name="drinks"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.drinks}
        >
          drinks
        </FilterTag>
      </OptionsBar>
      <div className="recipes-content-section">
        {recipes.map((recipe) => {
          return filterCheck(recipe) ? (
            <Link to={`${detailPath}/${recipe.id}`} key={recipe.id}>
              <Card id={recipe.id}>
                <h3>{recipe.title}</h3>
                <div className="info-line">
                  <IconFrame className="info-icon">
                    <BiAlarm />
                  </IconFrame>
                  <p>
                    {recipe.generalValue !== null
                      ? `${recipe.generalValue.value} ${recipe.generalValue.generalMeasure.title}`
                      : ''}
                  </p>
                </div>
                <div className="info-line">
                  <IconFrame className="info-icon">
                    <BiUser />
                  </IconFrame>
                  <p>{recipe.referencesReference.title}</p>
                </div>
                <p className="category-tag">{recipe.recipesCategory.title}</p>
              </Card>
            </Link>
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

export default connect(mapStateToProps, { fetchRecipes })(RecipesOverview);
