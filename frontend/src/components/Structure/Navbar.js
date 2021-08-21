import './Navbar.css';
import React from 'react';
import { BiFoodMenu, BiUser } from 'react-icons/bi';

import IconFrame from 'src/components/Structure/IconFrame.js';

const Navbar = () => {
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
        <IconFrame color="#8e8990" size="40px">
          <BiFoodMenu />
        </IconFrame>
        <IconFrame color="#8e8990" size="40px">
          <BiUser />
        </IconFrame>
      </div>
    </nav>
  );
};

export default Navbar;
