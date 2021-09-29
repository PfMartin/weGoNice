import './ReferenceForm.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';

const ReferenceForm = ({ onChangeView, view }) => {
  return (
    <div className="recipe-form">
      <SiteHeader
        headline={view === 'create' ? 'Create Reference' : 'Modify References'}
        onClickBack={(e) => onChangeView('overview')}
      />
    </div>
  );
};

export default ReferenceForm;
