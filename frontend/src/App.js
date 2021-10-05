import './App.css';
import React, { useState } from 'react';
import Navbar from 'src/components/Structure/Navbar/Navbar.js';
import Recipes from 'src/components/Recipes/Recipes/Recipes.js';
import References from 'src/components/References/References/References.js';
import Footer from 'src/components/Structure/Footer/Footer.js';

const App = () => {
  const [app, setApp] = useState('recipes');
  const [view, setView] = useState('overview');

  /**
   * Changes the app on click according to the targetapp attribute of the clicked element. The clicked element is usually an Icon. So you may look into 'src/components/Structure/IconFrame/IconFrame.js'
   * @param  {Object}   e   Event object
   */
  const onChangeApp = (e) => {
    const targetApp = e.currentTarget.getAttribute('targetapp');
    setApp(targetApp);
  };

  /**
   * Function to change the view in child components
   * @param  {String} input Value the view should be changed to
   */
  const onChangeView = (input) => {
    setView(input);
  };

  return (
    <div className="app">
      <Navbar app={app} onChangeApp={onChangeApp} onChangeView={onChangeView} />
      {app === 'recipes' ? (
        <Recipes onChangeView={onChangeView} view={view} />
      ) : (
        <References onChangeView={onChangeView} view={view} />
      )}
      <Footer />
    </div>
  );
};

export default App;
