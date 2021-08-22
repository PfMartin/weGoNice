import './Navbar.css';
import React from 'react';
import { BiFoodMenu, BiUser } from 'react-icons/bi';
import colors from 'src/colors.js';
import IconFrame from 'src/components/Structure/IconFrame.js';

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
          color={props.app === 'recipes' ? colors.lightAccent : colors.midGrey}
          size="35px"
          onChangeApp={props.onChangeApp}
          targetApp="recipes"
        >
          <BiFoodMenu />
        </IconFrame>
        <IconFrame
          color={
            props.app === 'references' ? colors.lightAccent : colors.midGrey
          }
          size="35px"
          onChangeApp={props.onChangeApp}
          targetApp="references"
        >
          <BiUser />
        </IconFrame>
      </div>
    </nav>
  );
};

export default Navbar;
