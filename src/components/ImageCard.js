import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';

const ImageCard = (props) => {
  const { url, _id, title, tags, description, comments, timestamp } = props.pic
  return (
  <Card href="#">
    <Image src={url} />
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>{moment(timestamp).format('MMMM Do YYYY')}</Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Icon name="comments" />
      {comments.length} Comments
    </Card.Content>
  </Card>
  );
};

export default ImageCard
