import './App.css';
import React, { useEffect } from 'react';

import {
  fetchAcademicTitles,
  fetchSalutations,
  fetchMeasures,
  fetchRecipeCategories,
} from 'src/actions';
import { connect } from 'react-redux';
import { selectApp } from 'src/actions';

import Navbar from 'src/components/Structure/Navbar/Navbar.js';
import Recipes from 'src/components/Recipes/Recipes/Recipes.js';
import References from 'src/components/References/References/References.js';
import Footer from 'src/components/Structure/Footer/Footer.js';

const App = ({
  selectedApp,
  fetchAcademicTitles,
  fetchSalutations,
  fetchMeasures,
  fetchRecipeCategories,
}) => {
  useEffect(() => {
    fetchAcademicTitles();
    fetchSalutations();
    fetchMeasures();
    fetchRecipeCategories();
  }, []);

  return (
    <div className="app">
      <Navbar />
      {selectedApp === 'recipes' ? <Recipes /> : <References />}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedApp: state.selectedApp,
  };
};

export default connect(mapStateToProps, {
  fetchAcademicTitles,
  fetchSalutations,
  fetchMeasures,
  fetchRecipeCategories,
})(App);
