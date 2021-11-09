import './SectionForm.css';

import React from 'react';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';

const SectionForm = () => {
  return (
    <div className="section-form">
      <SiteHeader headline="Create Section" hasBackButton={true} />
      <h1>SectionForm</h1>
    </div>
  );
};

export default SectionForm;
