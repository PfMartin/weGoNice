import React from 'react';
import { connect } from 'react-redux';
import { switchView } from 'src/actions';

import ReferencesOverview from 'src/components/References/ReferencesOverview/ReferencesOverview.js';
import ReferenceForm from 'src/components/References/ReferenceForm/ReferenceForm.js';

const References = ({ selectedView }) => {
  return (
    <div className="references">
      {selectedView === 'overview' ? <ReferencesOverview /> : <ReferenceForm />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedView: state.selectedView,
  };
};

export default connect(mapStateToProps, { switchView })(References);
