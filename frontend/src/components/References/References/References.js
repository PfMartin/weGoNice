import React, { useState } from 'react';
import { connect } from 'react-redux';
import { switchView } from 'src/actions';

import ReferencesOverview from 'src/components/References/ReferencesOverview/ReferencesOverview.js';
import ReferenceForm from 'src/components/References/ReferenceForm/ReferenceForm.js';

const References = ({ selectedView }) => {
  const [references, setReferences] = useState([
    {
      id: 1,
      homepage: 'https://www.nikorittenau.com',
      facebook: '',
      instagram: 'https://www.instagram.com/niko_rittenau',
      youtube: '',
      salutation: {
        title: 'Mr.',
        description: '',
      },
      nickname: '',
      firstName: 'Niko',
      lastName: 'Rittenau',
      academicTitle: {
        title: '',
        description: '',
      },
    },
    {
      id: 2,
      homepage: 'https://biancazapatka.com',
      facebook: '',
      instagram: 'https://www.instagram.com/biancazapatka/',
      youtube: '',
      salutation: {
        title: 'Mrs.',
        description: '',
      },
      nickname: '',
      firstName: 'Bianca',
      lastName: 'Zapatka',
      academicTitle: {
        title: '',
        description: '',
      },
    },
    {
      id: 3,
      homepage: 'https://schnabularasa.com',
      facebook: '',
      instagram: 'https://www.instagram.com/schnabula_rasa/',
      youtube: '',
      salutation: {
        title: 'Mrs.',
        description: '',
      },
      nickname: 'Schnabularasa',
      firstName: 'Jelena',
      lastName: '',
      academicTitle: {
        title: '',
        description: '',
      },
    },
    {
      id: 4,
      homepage: 'https://maxlamanna.com',
      facebook: 'https://www.facebook.com/maxlmanna74',
      instagram: 'https://www.instagram.com/maxlamanna/',
      youtube: 'https://www.youtube.com/channel/UCusvG_uAvkU_4qzx788Z3HQ',
      salutation: {
        title: 'Mr.',
        description: '',
      },
      nickname: 'maxlamanna',
      firstName: 'Max',
      lastName: 'La Manna',
      academicTitle: {
        title: '',
        description: '',
      },
    },
  ]);
  const [currentReference, setCurrentReference] = useState({});

  const onSetCurrentReference = (input) => {
    setCurrentReference(input);
  };

  return (
    <div className="references">
      {selectedView === 'overview' ? (
        <ReferencesOverview
          onSetCurrentReference={onSetCurrentReference}
          references={references}
        />
      ) : (
        <ReferenceForm currentReference={currentReference} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedView: state.selectedView,
  };
};

export default connect(mapStateToProps, { switchView })(References);