import './SiteHeader.css';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { BiPlus, BiArrowBack, BiPencil } from 'react-icons/bi';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const SiteHeader = ({
  headline,
  hasModifyButton,
  hasBackButton,
  hasAddButton,
  currentRecipeId,
}) => {
  const history = useHistory();
  const location = useLocation();

  // The The recipes overview page is displayed with the path host:port and host:port/recipes/overview
  // To forward to the create page from both paths both cases need to be considered
  const createPath =
    location.pathname.split('/')[1] === '' ? '/recipes/create' : 'create';

  return (
    <div className="site-header">
      <h1>{headline}</h1>
      <div className="icon-container">
        {hasModifyButton ? (
          <Link to={`/recipes/modify/${currentRecipeId}`}>
            <IconFrame size="25px">
              <BiPencil />
            </IconFrame>
          </Link>
        ) : (
          ''
        )}
        {hasBackButton ? (
          <IconFrame size="25px" onClick={history.goBack}>
            <BiArrowBack />
          </IconFrame>
        ) : hasAddButton ? (
          <Link to={createPath}>
            <IconFrame size="25px">
              <BiPlus />
            </IconFrame>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SiteHeader;
