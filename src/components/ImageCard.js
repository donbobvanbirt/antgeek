import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const ImageCard = props => (
  <Card href="#">
    <Image src={props.imageUrl} />
    <Card.Content>
      <Card.Header>Daniel</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
      <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Icon name="user" />
      10 Friends
    </Card.Content>
  </Card>
)

export default ImageCard
