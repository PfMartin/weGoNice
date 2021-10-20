import './Navbar.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { switchView } from 'src/actions';
import { BiFoodMenu, BiUser } from 'react-icons/bi';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import { Link } from 'react-router-dom';
import history from 'src/history';

const Navbar = (props) => {
  const [currentApp, changeCurrentApp] = useState('recipes');

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
            onClick={(e) => {
              changeCurrentApp('recipes');
              props.switchView('overview');
            }}
            targetApp="recipes"
          >
            <BiFoodMenu />
          </IconFrame>
        </Link>
        <Link to="/references/overview">
          <IconFrame
            className={currentApp === 'references' ? 'icon selected' : 'icon'}
            size="35px"
            onClick={(e) => {
              changeCurrentApp('references');
              props.switchView('overview');
            }}
            targetApp="references"
          >
            <BiUser />
          </IconFrame>
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedView: state.selectedView,
  };
};

export default connect(mapStateToProps, {
  switchView,
  history,
})(Navbar);
