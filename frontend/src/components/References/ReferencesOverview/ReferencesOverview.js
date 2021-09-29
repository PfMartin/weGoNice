import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import OptionsBar from 'src/components/Structure/OptionsBar/OptionsBar.js';

const ReferencesOverview = (props) => {
  const [references, setReferences] = useState([1, 2, 3]);

  return (
    <div className="references-overview">
      <SiteHeader
        headline="References"
        onClickPlus={() => console.log('create reference')}
      />
      <OptionsBar searchPlaceholder="Search References" />
      <div className="content-section">
        {references.map((reference) => {
          return <h1>Hello</h1>;
        })}
      </div>
    </div>
  );
};

export default ReferencesOverview;
