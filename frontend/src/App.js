import './App.css';
import React from 'react';
import Navbar from 'src/components/Structure/Navbar.js';
import Footer from 'src/components/Structure/Footer.js';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Footer />
    </div>
  );
};

export default App;
