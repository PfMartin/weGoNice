import React, { useState } from 'react';
import ReferencesOverview from 'src/components/References/ReferencesOverview/ReferencesOverview.js';
import ReferenceForm from 'src/components/References/ReferenceForm/ReferenceForm.js';

const References = () => {
  const [view, setView] = useState('overview');

  const onChangeView = (input) => {
    setView(input);
  };

  return (
    <div className="references">
      {view === 'overview' ? (
        <ReferencesOverview view={view} onChangeView={onChangeView} />
      ) : (
        <ReferenceForm view={view} onChangeView={onChangeView} />
      )}
    </div>
  );
};

export default References;
