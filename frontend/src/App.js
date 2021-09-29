import './App.css';
import React, { useState } from 'react';
import Navbar from 'src/components/Structure/Navbar/Navbar.js';
import Recipes from 'src/components/Recipes/Recipes/Recipes.js';
import References from 'src/components/References/References/References.js';
import Footer from 'src/components/Structure/Footer/Footer.js';

const App = () => {
  const [app, setApp] = useState('references');

  /**
   * Changes the app on click according to the targetapp attribute of the clicked element. The clicked element is usually an Icon. So you may look into 'src/components/Structure/IconFrame/IconFrame.js'
   * @param  {Object}   e   Event object
   */
  const onChangeApp = (e) => {
    const targetApp = e.currentTarget.getAttribute('targetapp');
    setApp(targetApp);
  };

  return (
    <div className="app">
      <Navbar onChangeApp={onChangeApp} app={app} />
      {app === 'recipes' ? <Recipes /> : <References />}
      <Footer />
    </div>
  );
};

export default App;
