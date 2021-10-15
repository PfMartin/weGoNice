import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAcademicTitles, fetchSalutations, switchView } from 'src/actions';

import ReferencesOverview from 'src/components/References/ReferencesOverview/ReferencesOverview.js';
import ReferenceForm from 'src/components/References/ReferenceForm/ReferenceForm.js';

const References = ({
  fetchAcademicTitles,
  fetchSalutations,
  selectedView,
}) => {
  useEffect(() => {
    fetchSalutations();
    fetchAcademicTitles();
  }, []);

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

export default connect(mapStateToProps, {
  switchView,
  fetchAcademicTitles,
  fetchSalutations,
})(References);
