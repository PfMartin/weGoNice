import './SiteHeader.css';
import React from 'react';
import { BiPlus, BiArrowBack } from 'react-icons/bi';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const SiteHeader = (props) => {
  return (
    <div className="site-header">
      <h1>{props.headline}</h1>
      <div className="icon-container">
        {props.onClickBack ? (
          <IconFrame size="25px" onClick={props.onClickBack}>
            <BiArrowBack />
          </IconFrame>
        ) : props.onClickPlus ? (
          <IconFrame size="25px" onClick={props.onClickPlus}>
            <BiPlus />
          </IconFrame>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SiteHeader;
