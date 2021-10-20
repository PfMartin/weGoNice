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
import { selectApp } from 'src/actions';

import Navbar from 'src/components/Structure/Navbar/Navbar';
import Recipes from 'src/components/Recipes/Recipes/Recipes';
import References from 'src/components/References/References/References';
import Footer from 'src/components/Structure/Footer/Footer';
import history from 'src/history';

const App = ({
  selectedApp,
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
          <Route path="/" exact component={Recipes} />
          <Route path="/recipes" exact component={Recipes} />
          <Route path="/references" exact component={References} />
          <Footer />
        </div>
      </Router>
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
  fetchGenders,
  fetchMeasures,
  fetchRecipeCategories,
})(App);
