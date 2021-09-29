import './ReferencesOverview.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import OptionsBar from 'src/components/Structure/OptionsBar/OptionsBar.js';
import IconFrame from 'src/components/Structure/IconFrame/IconFrame.js';
import Card from 'src/components/Structure/Card/Card.js';
import { BiWorld, BiPencil } from 'react-icons/bi';
import { FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import LinkIcon from 'src/components/Structure/LinkIcon/LinkIcon.js';
import FilterTag from 'src/components/Structure/FilterTag/FilterTag.js';

const ReferencesOverview = ({ onChangeView, view }) => {
  const [filterTags, setFilterTags] = useState({
    homepage: true,
    instagram: true,
    youtube: true,
    facebook: true,
  });

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
            <Card key={reference.id} hoverable={false}>
              <h3>
                {`${reference.academicTitle.title} ${reference.firstName} ${reference.lastName}`}
              </h3>
              <p>{reference.nickName}</p>
              <div className="modify-box">
                <IconFrame>
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
