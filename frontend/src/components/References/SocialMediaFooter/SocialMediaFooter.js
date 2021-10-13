import './SocialMediaFooter.css';

import React from 'react';
import { BiWorld, BiPencil } from 'react-icons/bi';
import { FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import LinkIcon from 'src/components/Structure/LinkIcon/LinkIcon.js';

const SocialMediaFooter = ({ reference }) => {
  return (
    <div className="social-media-footer">
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
  );
};

export default SocialMediaFooter;
