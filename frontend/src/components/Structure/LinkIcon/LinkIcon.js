import './LinkIcon.css';

import React from 'react';
import PropTypes from 'prop-types';

import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';

const LinkIcon = ({ children, href }) => {
  return (
    <div className="link-icon">
      <a href={href} target="_blank">
        <IconFrame>{children}</IconFrame>
      </a>
    </div>
  );
};

LinkIcon.propTypes = {
  /** Href for the link to click */
  href: PropTypes.string,
};

export default LinkIcon;
