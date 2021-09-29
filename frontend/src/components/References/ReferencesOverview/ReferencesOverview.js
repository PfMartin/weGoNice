import './ReferencesOverview.css';

import React, { useState } from 'react';
import SiteHeader from 'src/components/Structure/SiteHeader/SiteHeader.js';
import OptionsBar from 'src/components/Structure/OptionsBar/OptionsBar.js';
import Card from 'src/components/Structure/Card/Card.js';
import { BiWorld } from 'react-icons/bi';
import { FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import LinkIcon from 'src/components/Structure/LinkIcon/LinkIcon.js';

const ReferencesOverview = (props) => {
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

  return (
    <div className="references-overview">
      <SiteHeader
        headline="References"
        onClickPlus={() => console.log('create reference')}
      />
      <OptionsBar searchPlaceholder="Search References" />
      <div className="content-section">
        {references.map((reference) => {
          return (
            <Card>
              <h3>
                {`${reference.academicTitle.title} ${reference.firstName} ${reference.lastName}`}
              </h3>
              <p>{reference.nickName}</p>
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
          );
        })}
      </div>
    </div>
  );
};

export default ReferencesOverview;
