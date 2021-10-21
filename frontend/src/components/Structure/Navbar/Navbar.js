import './Navbar.css';
import React, { useState } from 'react';
import { BiFoodMenu, BiUser } from 'react-icons/bi';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import { Link, useLocation } from 'react-router-dom';

const Navbar = (props) => {
  const location = useLocation();
  const currentApp = location.pathname.split('/')[1];

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={`${process.env.PUBLIC_URL}/Logo.svg`}
          alt="weGoNice Logo"
          width="100"
          height="100"
        />
      </div>
      <div className="apps-container">
        <Link to="/recipes/overview">
          <IconFrame
            className={currentApp === 'recipes' ? 'icon selected' : 'icon'}
            size="35px"
            targetApp="recipes"
          >
            <BiFoodMenu />
          </IconFrame>
        </Link>
        <Link to="/references/overview">
          <IconFrame
            className={currentApp === 'references' ? 'icon selected' : 'icon'}
            size="35px"
            targetApp="references"
          >
            <BiUser />
          </IconFrame>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
