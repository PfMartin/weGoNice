import './ReferencesOverview.css';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchReferences, switchView, selectReference } from 'src/actions';

import { BiPencil } from 'react-icons/bi';

import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import OptionsBar from 'src/components/Structure/OptionsBar/OptionsBar.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import Card from 'src/components/Structure/Card/Card.js';
import FilterTag from 'src/components/Structure/FilterTag/FilterTag.js';
import SocialMediaFooter from 'src/components/References/SocialMediaFooter/SocialMediaFooter';

const ReferencesOverview = ({
  fetchReferences,
  selectReference,
  switchView,
  references,
}) => {
  const [filterTags, setFilterTags] = useState({
    homepage: true,
    instagram: true,
    youtube: true,
    facebook: true,
    none: true,
  });

  useEffect(() => {
    fetchReferences();
  });

  const onToggleAllFilter = (e) => {
    if (
      filterTags.homepage |
      filterTags.instagram |
      filterTags.youtube |
      filterTags.facebook
    ) {
      setFilterTags({
        homepage: false,
        instagram: false,
        youtube: false,
        facebook: false,
      });
    } else {
      setFilterTags({
        homepage: true,
        instagram: true,
        youtube: true,
        facebook: true,
      });
    }
  };

  const onToggleFilter = (e) => {
    const name = e.currentTarget.getAttribute('name');
    setFilterTags({
      ...filterTags,
      ...{ [name]: !filterTags[name] },
    });
  };

  const displayCheck = (reference, socialMedia) => {
    // In case the reference doesn't have any social media, always display it disregarding the set filters
    if (
      reference.homepage === '' &&
      reference.instagram === '' &&
      reference.youtube === '' &&
      reference.facebook === ''
    ) {
      return true;
    }

    const shouldBeDisplayed =
      reference[socialMedia] !== '' && filterTags[socialMedia];

    return shouldBeDisplayed;
  };

  const onModify = (e) => {
    const id = parseInt(
      e.currentTarget.parentNode.parentNode.getAttribute('id')
    );
    const filteredReference = references.find((obj) => obj.id === id);

    selectReference(filteredReference);
    switchView('modify');
  };

  const displayName = (ref) => {
    const academicTitle =
      ref.referencesAcademicTitle.title !== 'None'
        ? `${ref.referencesAcademicTitle.title} `
        : '';

    return `${academicTitle}${ref.firstName} ${ref.lastName}`;
  };

  const displayNickname = (ref) => {
    return ref.title === '' ? `${ref.firstName} ${ref.lastName}` : ref.title;
  };

  return (
    <div className="references-overview">
      <SiteHeader hasAddButton={true} headline="References" />
      <OptionsBar
        searchPlaceholder="Search References"
        onClickFilter={onToggleAllFilter}
      >
        <FilterTag
          name="homepage"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.homepage}
        >
          homepage
        </FilterTag>
        <FilterTag
          name="instagram"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.instagram}
        >
          instagram
        </FilterTag>
        <FilterTag
          name="facebook"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.facebook}
        >
          facebook
        </FilterTag>
        <FilterTag
          name="youtube"
          onToggleFilter={onToggleFilter}
          isSelected={filterTags.youtube}
        >
          youtube
        </FilterTag>
      </OptionsBar>
      <div className="references-content-section">
        {references.map((reference) => {
          return displayCheck(reference, 'homepage') ||
            displayCheck(reference, 'instagram') ||
            displayCheck(reference, 'facebook') ||
            displayCheck(reference, 'youtube') ? (
            <Card id={reference.id} key={reference.id} hoverable={false}>
              <h3>{displayNickname(reference)}</h3>
              <p>{displayName(reference)}</p>
              <div className="modify-box">
                <Link to={`modify/${reference.id}`}>
                  <IconFrame>
                    <BiPencil />
                  </IconFrame>
                </Link>
              </div>
              <SocialMediaFooter reference={reference} />
            </Card>
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    references: state.references,
    selectedReference: state.selectedReference,
  };
};

export default connect(mapStateToProps, {
  fetchReferences,
  switchView,
  selectReference,
})(ReferencesOverview);
