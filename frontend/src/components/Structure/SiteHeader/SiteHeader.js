import './SiteHeader.css';
import React from 'react';
import { BiPlus, BiArrowBack, BiPencil } from 'react-icons/bi';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const SiteHeader = ({ headline, onClickBack, onClickPen, onClickPlus }) => {
  return (
    <div className="site-header">
      <h1>{headline}</h1>
      <div className="icon-container">
        {onClickPen ? (
          <IconFrame size="25px" onClick={onClickPen}>
            <BiPencil />
          </IconFrame>
        ) : (
          ''
        )}
        {onClickBack ? (
          <IconFrame size="25px" onClick={onClickBack}>
            <BiArrowBack />
          </IconFrame>
        ) : onClickPlus ? (
          <IconFrame size="25px" onClick={onClickPlus}>
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
