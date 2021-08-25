import React from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader.js';

const ReferencesOverview = (props) => {
  return (
    <div className="references-overview">
      <SiteHeader
        headline="References"
        onClickPlus={() => console.log('create reference')}
      />
    </div>
  );
};

export default ReferencesOverview;
