import React, { Component } from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, GooglePlusShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');

const ShareButton = (props) => {
  const { shareUrl, title } = props;

  return (
    <div className="socialLinkContainer">
      <div className="socialLink">
        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div className="socialLink">
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div className="socialLink">
        <GooglePlusShareButton url={shareUrl}>
          <GooglePlusIcon size={32} round />
        </GooglePlusShareButton>
      </div>

    </div>
  );
  // }
};

export default ShareButton;
