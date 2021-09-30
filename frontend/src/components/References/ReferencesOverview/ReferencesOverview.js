import './ReferencesOverview.css';

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import OptionsBar from 'src/components/Structure/OptionsBar/OptionsBar.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import Card from 'src/components/Structure/Card/Card.js';
import { BiWorld, BiPencil } from 'react-icons/bi';
import { FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import LinkIcon from 'src/components/Structure/LinkIcon/LinkIcon.js';
import FilterTag from 'src/components/Structure/FilterTag/FilterTag.js';

const ReferencesOverview = ({
  onChangeView,
  onSetCurrentReference,
  references,
  view,
}) => {
  const [filterTags, setFilterTags] = useState({
    homepage: true,
    instagram: true,
    youtube: true,
    facebook: true,
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
    const shouldBeDisplayed =
      reference[socialMedia] !== '' && filterTags[socialMedia];

    return shouldBeDisplayed;
  };

  const onModify = (e) => {
    const id = parseInt(
      e.currentTarget.parentNode.parentNode.getAttribute('id')
    );
    const filteredReference = references.filter((r) => r.id === id)[0];

    onSetCurrentReference(filteredReference);
    onChangeView('modify');
  };

  return (
    <div className="references-overview">
      <SiteHeader
        headline="References"
        onClickPlus={(e) => onChangeView('create')}
      />
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
      <div className="content-section">
        {references.map((reference) => {
          return displayCheck(reference, 'homepage') ||
            displayCheck(reference, 'instagram') ||
            displayCheck(reference, 'facebook') ||
            displayCheck(reference, 'youtube') ? (
            <Card id={reference.id} key={reference.id} hoverable={false}>
              <h3>
                {`${reference.academicTitle.title} ${reference.firstName} ${reference.lastName}`}
              </h3>
              <p>
                {reference.nickname} {reference.id}
              </p>
              <div className="modify-box">
                <IconFrame onClick={onModify}>
                  <BiPencil />
                </IconFrame>
              </div>
              <div className="icon-box">
                {reference.homepage ? (
                  <LinkIcon href={reference.homepage}>
                    <BiWorld />
                  </LinkIcon>
                ) : (
                  ''
                )}
                {reference.instagram ? (
                  <LinkIcon href={reference.instagram}>
                    <FiInstagram />
                  </LinkIcon>
                ) : (
                  ''
                )}
                {reference.facebook ? (
                  <LinkIcon href={reference.facebook}>
                    <FiFacebook />
                  </LinkIcon>
                ) : (
                  ''
                )}
                {reference.youtube ? (
                  <LinkIcon href={reference.youtube}>
                    <FiYoutube />
                  </LinkIcon>
                ) : (
                  ''
                )}
              </div>
            </Card>
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
};

ReferencesOverview.propTypes = {
  /** Function for changing the view inside references */
  onChangeView: PropTypes.func,
  /** View inside references */
  view: PropTypes.string,
};

export default ReferencesOverview;
