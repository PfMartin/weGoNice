import './App.css';
import React, { useState } from 'react';
import Navbar from 'src/components/Structure/Navbar.js';
import RecipesOverview from 'src/components/Recipes/RecipesOverview.js';
import ReferencesOverview from 'src/components/References/ReferencesOverview.js';
import Footer from 'src/components/Structure/Footer.js';

const App = () => {
  const [app, setApp] = useState('recipes');

  /**
   * Changes the app on click according to the targetapp attribute of the clicked element. The clicked element is usually an Icon. So you may look into 'src/components/Structure/IconFrame.js'
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  const onChangeApp = (e) => {
    const targetApp = e.currentTarget.getAttribute('targetapp');
    setApp(targetApp);
  };

  return (
    <div className="app">
      <Navbar onChangeApp={onChangeApp} app={app} />
      {app === 'recipes' ? <RecipesOverview /> : <ReferencesOverview />}
      <Footer />
    </div>
  );
};

export default App;
