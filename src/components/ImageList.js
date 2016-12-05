import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

import ImageCard from './ImageCard';

const ImageList = (props) => {
  let picList = '';
  if (props.images) {
    picList = props.images.map((pic) => {
      const { url, _id, name } = pic;
      return (
        // <img className="listimg" src={url} alt={name} key={_id} />
          <ImageCard imageUrl={url} key={_id} />
      );
    });
  }
  return (
    <Card.Group>
      {picList}
    </Card.Group>
  );
}

export default ImageList;
