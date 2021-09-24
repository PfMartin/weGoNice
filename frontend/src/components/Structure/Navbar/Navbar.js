import './Navbar.css';
import React from 'react';
import { BiFoodMenu, BiUser } from 'react-icons/bi';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const Navbar = (props) => {
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
        <IconFrame
          className={props.app === 'recipes' ? 'icon selected' : 'icon'}
          size="35px"
          onClick={props.onChangeApp}
          targetApp="recipes"
        >
          <BiFoodMenu />
        </IconFrame>
        <IconFrame
          className={props.app === 'references' ? 'icon selected' : 'icon'}
          size="35px"
          onClick={props.onChangeApp}
          targetApp="references"
        >
          <BiUser />
        </IconFrame>
      </div>
    </nav>
  );
};

export default Navbar;
