import './App.css';
import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom';

import {
  fetchAcademicTitles,
  fetchGenders,
  fetchMeasures,
  fetchRecipeCategories,
} from 'src/actions';
import { connect } from 'react-redux';

import Navbar from 'src/components/Structure/Navbar/Navbar';
import RecipesOverview from 'src/components/Recipes/RecipesOverview/RecipesOverview';
import RecipeForm from 'src/components/Recipes/RecipeForm/RecipeForm';
import RecipeDetail from 'src/components/Recipes/RecipeDetail/RecipeDetail';
import SectionForm from 'src/components/Recipes/SectionForm/SectionForm';
import ReferencesOverview from 'src/components/References/ReferencesOverview/ReferencesOverview';
import ReferenceForm from 'src/components/References/ReferenceForm/ReferenceForm';
import Footer from 'src/components/Structure/Footer/Footer';
import history from 'src/history';

const App = ({
  fetchAcademicTitles,
  fetchGenders,
  fetchMeasures,
  fetchRecipeCategories,
}) => {
  useEffect(() => {
    fetchAcademicTitles();
    fetchGenders();
    fetchMeasures();
    fetchRecipeCategories();
  }, []);

  return (
    <div className="app">
      <Router history={history}>
        <div>
          <Navbar />
          <Route path="/" exact component={RecipesOverview} />
          <Route path="/recipes/overview" exact component={RecipesOverview} />
          <Route path="/recipes/detail/:id" exact component={RecipeDetail} />
          <Route path="/recipes/modify/:id" exact component={RecipeForm} />
          <Route path="/recipes/create" exact component={RecipeForm} />
          <Route
            path="/recipes/detail/:id/section/create"
            exact
            component={SectionForm}
          />
          <Route
            path="/recipes/detail/:id/section/modify/:sectionId"
            exact
            component={SectionForm}
          />
          <Route
            path="/references/overview"
            exact
            component={ReferencesOverview}
          />
          <Route path="/references/create" exact component={ReferenceForm} />
          <Route
            path="/references/modify/:id"
            exact
            component={ReferenceForm}
          />
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default connect(null, {
  fetchAcademicTitles,
  fetchGenders,
  fetchMeasures,
  fetchRecipeCategories,
})(App);
