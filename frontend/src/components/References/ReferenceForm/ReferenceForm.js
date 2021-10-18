import './ReferenceForm.css';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchView } from 'src/actions';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import FormFrame from 'src/components/Forms/FormFrame/FormFrame.js';
import InputElement from 'src/components/Forms/InputElement/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';
import ButtonBar from 'src/components/Forms/ButtonBar/ButtonBar.js';

const ReferenceForm = ({
  selectData,
  selectedReference,
  selectedView,
  switchView,
}) => {
  const [reference, setReference] = useState({
    id: '',
    gender: '',
    academicTitle: '',
    firstName: '',
    lastName: '',
    title: '',
    homepage: '',
    instagram: '',
    youtube: '',
    facebook: '',
  });

  useEffect(() => {
    if (selectedView === 'modify') {
      onInitial();
    }
  }, []);

  const updateReference = (e) => {
    const title = e.target.getAttribute('id');
    let value = e.target.value;

    if (title === 'gender' || title === 'academicTitle') {
      value = e.target.getAttribute('value');
    }

    setReference({
      ...reference,
      ...{ [title]: value },
    });

    console.log(reference);
  };

  const onSave = async () => {
    let genderId = 1;
    let academicTitleId = 1;

    if (reference.gender !== '') {
      genderId = selectData.genders.find(
        (gender) => gender.title === reference.gender
      ).id;
    }

    if (reference.academicTitle !== '') {
      academicTitleId = selectData.academicTitles.find(
        (academicTitle) => academicTitle.title === reference.academicTitle
      ).id;
    }

    const body = {
      firstName: reference.firstName,
      lastName: reference.lastName,
      title: reference.title,
      homepage: reference.homepage,
      instagram: reference.instagram,
      youtube: reference.youtube,
      facebook: reference.facebook,
      referencesGenderId: genderId,
      referencesAcademicTitleId: academicTitleId,
    };

    let response;
    if (selectedView === 'modify') {
      response = await fetch(
        `http://localhost:8000/references/references/${selectedReference.id}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
    } else {
      response = await fetch('http://localhost:8000/references/references', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }

    console.log(response);
  };

  const onDelete = async () => {
    const response = await fetch(
      `http://localhost:8000/references/references/${selectedReference.id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
  };

  const onInitial = () => {
    const academicTitle =
      selectedReference.referencesAcademicTitle.id === 1
        ? ''
        : selectedReference.referencesAcademicTitle.title;

    setReference({
      ...selectedReference,
      gender: selectedReference.referencesGender.title,
      academicTitle: academicTitle,
    });
  };

  return (
    <div className="recipe-form">
      <SiteHeader
        headline={
          selectedView === 'create' ? 'Create Reference' : 'Modify References'
        }
        onClickBack={() => switchView('overview')}
      />
      <FormFrame>
        <SelectElement
          title="gender"
          labelText="Gender"
          value={reference.gender}
          onSelect={updateReference}
          selectOptions={selectData.genders}
        />
        <SelectElement
          title="academicTitle"
          labelText="Academic Title"
          value={reference.academicTitle}
          onSelect={updateReference}
          selectOptions={selectData.academicTitles}
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
          title="title"
          labelText="Nickname"
          type="text"
          value={reference.title}
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
        {selectedView === 'create' ? (
          <ButtonBar onSave={onSave} />
        ) : (
          <ButtonBar onSave={onSave} onDelete={onDelete} />
        )}
      </FormFrame>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectData: state.selectData,
    selectedView: state.selectedView,
    selectedReference: state.selectedReference,
  };
};

export default connect(mapStateToProps, { switchView })(ReferenceForm);
