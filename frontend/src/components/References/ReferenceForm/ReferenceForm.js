import './ReferenceForm.css';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import FormFrame from 'src/components/Forms/FormFrame/FormFrame.js';
import InputElement from 'src/components/Forms/InputElement/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';
import ButtonBar from 'src/components/Forms/ButtonBar/ButtonBar.js';

const salutations = [
  {
    id: 1,
    title: '---',
  },
  {
    id: 2,
    title: 'Mrs.',
  },
  {
    id: 3,
    title: 'Ms.',
  },
  {
    id: 4,
    title: 'Mr.',
  },
  {
    id: 5,
    title: 'Div.',
  },
];

const academicTitles = [
  {
    id: 1,
    title: '---',
  },
  {
    id: 2,
    title: 'B.Sc.',
  },
  {
    id: 3,
    title: 'M.Sc.',
  },
  {
    id: 4,
    title: 'Dr.',
  },
];

const ReferenceForm = ({ currentReference, onChangeView, view }) => {
  const [reference, setReference] = useState({
    id: '',
    salutation: '',
    academicTitle: '',
    firstName: '',
    lastName: '',
    nickname: '',
    homepage: '',
    instagram: '',
    youtube: '',
    facebook: '',
  });

  useEffect(() => {
    if (view === 'modify') {
      onInitial();
    }
  }, []);

  const updateReference = (e) => {
    const title = e.target.getAttribute('id');
    let value = e.target.value;

    if (title === 'salutation' || title === 'academicTitle') {
      value = e.target.getAttribute('value');
    }

    setReference({
      ...reference,
      ...{ [title]: value },
    });

    console.log(reference);
  };

  const onSave = () => {
    console.log('Save');
  };

  const onDelete = () => {
    console.log('Delete');
  };

  const onInitial = () => {
    setReference({
      id: currentReference.id,
      salutation: currentReference.salutation.title,
      academicTitle: currentReference.academicTitle.title,
      firstName: currentReference.firstName,
      lastName: currentReference.lastName,
      nickname: currentReference.nickname,
      homepage: currentReference.homepage,
      instagram: currentReference.instagram,
      youtube: currentReference.youtube,
      facebook: currentReference.facebook,
    });
  };

  return (
    <div className="recipe-form">
      <SiteHeader
        headline={view === 'create' ? 'Create Reference' : 'Modify References'}
        onClickBack={(e) => onChangeView('overview')}
      />
      <FormFrame>
        <SelectElement
          title="salutation"
          labelText="Salutation"
          value={reference.salutation}
          onSelect={updateReference}
          selectOptions={salutations}
        />
        <SelectElement
          title="academicTitle"
          labelText="Academic Title"
          value={reference.academicTitle}
          onSelect={updateReference}
          selectOptions={academicTitles}
        />
        <InputElement
          title="firstName"
          labelText="First Name"
          type="text"
          value={reference.firstName}
          onChange={updateReference}
        />
        <InputElement
          title="lastName"
          labelText="Last Name"
          type="text"
          value={reference.lastName}
          onChange={updateReference}
        />
        <InputElement
          title="nickname"
          labelText="Nickname"
          type="text"
          value={reference.nickname}
          onChange={updateReference}
        />
        <InputElement
          title="homepage"
          labelText="Homepage"
          type="text"
          value={reference.homepage}
          onChange={updateReference}
        />
        <InputElement
          title="instagram"
          labelText="Instagram Account"
          type="text"
          value={reference.instagram}
          onChange={updateReference}
        />
        <InputElement
          title="youtube"
          labelText="YouTube Channel"
          type="text"
          value={reference.youtube}
          onChange={updateReference}
        />
        <InputElement
          title="facebook"
          labelText="Facebook Page"
          type="text"
          value={reference.facebook}
          onChange={updateReference}
        />
        {view === 'create' ? (
          <ButtonBar onSave={onSave} />
        ) : (
          <ButtonBar onSave={onSave} onDelete={onDelete} />
        )}
      </FormFrame>
    </div>
  );
};

export default ReferenceForm;
