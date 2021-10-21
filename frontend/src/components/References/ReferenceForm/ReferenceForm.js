import './ReferenceForm.css';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchGetOne,
  fetchPost,
  fetchPut,
  fetchDelete,
} from 'src/utils/fetchApi';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import FormFrame from 'src/components/Forms/FormFrame/FormFrame.js';
import InputElement from 'src/components/Forms/InputElement/InputElement.js';
import SelectElement from 'src/components/Forms/SelectElement/SelectElement.js';
import ButtonBar from 'src/components/Forms/ButtonBar/ButtonBar.js';

const ReferenceForm = ({ history, location, selectData }) => {
  const currentView =
    location.pathname.split('/').reverse()[0] !== 'create'
      ? 'modify'
      : 'create';

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
    if (currentView === 'modify') {
      onInitial();
    }
  }, []);

  const onInitial = async () => {
    const currentReferenceId = parseInt(
      location.pathname.split('/').reverse()[0]
    );

    const currentReference = await fetchGetOne(
      'references',
      'references',
      currentReferenceId
    );

    setReference({
      ...currentReference,
      id: currentReferenceId,
      gender: currentReference.referencesGender.title,
      academicTitle: currentReference.referencesAcademicTitle.title,
    });
  };

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
    let genderId = 1; // For Validation
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
    if (currentView === 'modify') {
      response = await fetchPut(
        'references',
        'references',
        reference.id,
        JSON.stringify(body)
      );
    } else {
      response = await fetchPost(
        'references',
        'references',
        JSON.stringify(body)
      );
    }
    console.log(response);
    if (
      response.message === 'Reference Created' ||
      response.message === 'Reference Updated'
    ) {
      history.push('/references/overview');
    }
  };

  const onDelete = async () => {
    const referenceId = parseInt(location.pathname.split('/').reverse()[0]);

    const response = await fetchDelete('references', 'references', referenceId);
    console.log(response);
    if (response.message === 'Reference Deleted') {
      history.push('/references/overview');
    }
  };

  const headlineText =
    currentView === 'create' ? 'Create Reference' : 'Modify Reference';

  return (
    <div className="recipe-form">
      <SiteHeader headline={headlineText} hasBackButton={true} />
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
        {currentView === 'create' ? (
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
  };
};

export default connect(mapStateToProps)(ReferenceForm);
