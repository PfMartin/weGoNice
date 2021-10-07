import './Navbar.css';
import React from 'react';
import { connect } from 'react-redux';
import { switchApp, switchView } from 'src/actions';
import { BiFoodMenu, BiUser } from 'react-icons/bi';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const Navbar = ({ selectedApp, switchApp, switchView }) => {
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
          className={selectedApp === 'recipes' ? 'icon selected' : 'icon'}
          size="35px"
          onClick={(e) => {
            switchApp('recipes');
            switchView('overview');
          }}
          targetApp="recipes"
        >
          <BiFoodMenu />
        </IconFrame>
        <IconFrame
          className={selectedApp === 'references' ? 'icon selected' : 'icon'}
          size="35px"
          onClick={(e) => {
            switchApp('references');
            switchView('overview');
          }}
          targetApp="references"
        >
          <BiUser />
        </IconFrame>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedApp: state.selectedApp,
    selectedView: state.selectedView,
  };
};

export default connect(mapStateToProps, {
  switchApp,
  switchView,
})(Navbar);
