import React, { Component } from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, GooglePlusShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
// const LinkedinIcon = generateShareIcon('linkedin');
// const PinterestIcon = generateShareIcon('pinterest');
// const VKIcon = generateShareIcon('vk');

export default class ShareButton extends Component {
  render() {
    const { shareUrl, title } = this.props;

    return (
      <div className="socialLinkContainer">
        <div className="socialLink">
          <FacebookShareButton url={shareUrl} title={title} className="Demo__some-network__share-button">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className="socialLink">
          <TwitterShareButton url={shareUrl} title={title} className="Demo__some-network__share-button">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div className="socialLink">
          <GooglePlusShareButton url={shareUrl} className="Demo__some-network__share-button">
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </div>

      </div>
    );
  }
}
