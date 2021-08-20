import './Navbar.css';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li className="btn">Add Recipe</li>
        <li className="btn">Recipe book</li>
      </ul>
    </nav>
  );
};

export default Navbar;
