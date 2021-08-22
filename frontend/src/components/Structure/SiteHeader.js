import './SiteHeader.css';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import IconFrame from 'src/components/Structure/IconFrame.js';

const SiteHeader = (props) => {
  return (
    <div className="site-header">
      <h1>{props.headline}</h1>
      <IconFrame size="25px">
        <BiPlus />
      </IconFrame>
    </div>
  );
};

export default SiteHeader;
