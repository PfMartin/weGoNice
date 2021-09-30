import React, { useState } from 'react';
import ReferencesOverview from 'src/components/References/ReferencesOverview/ReferencesOverview.js';
import ReferenceForm from 'src/components/References/ReferenceForm/ReferenceForm.js';

const References = () => {
  const [view, setView] = useState('overview');
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
      nickName: '',
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
      nickName: '',
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
      nickName: 'Schnabularasa',
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
      nickName: 'maxlamanna',
      firstName: 'Max',
      lastName: 'La Manna',
      academicTitle: {
        title: '',
        description: '',
      },
    },
  ]);
  const [currentReference, setCurrentReference] = useState({});

  const onChangeView = (input) => {
    setView(input);
  };

  const onSetCurrentReference = (input) => {
    setCurrentReference(input);
  };

  return (
    <div className="references">
      {view === 'overview' ? (
        <ReferencesOverview
          onChangeView={onChangeView}
          onSetCurrentReference={onSetCurrentReference}
          references={references}
          view={view}
        />
      ) : (
        <ReferenceForm view={view} onChangeView={onChangeView} />
      )}
    </div>
  );
};

export default References;
