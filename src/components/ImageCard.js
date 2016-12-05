import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const ImageCard = (props) => {
  const { url, _id, name } = props.pic
  return (
  <Card href="#">
    <Image src={url} />
    <Card.Content>
      <Card.Header>Name</Card.Header>
      <Card.Meta>Date</Card.Meta>
      <Card.Description>Description</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Icon name="comments" />
      0 Comments
    </Card.Content>
  </Card>
  );
};

export default ImageCard
