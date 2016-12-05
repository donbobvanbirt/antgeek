import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Card, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';

export default class ImageCard extends Component {

  selectPic(id) {
    console.log('id:', id);
    browserHistory.push(`/detail/${id}`);
  }

  render() {
    const { url, _id, title, tags, description, comments, timestamp } = this.props.pic;

    return (
      <Card onClick={() => this.selectPic(_id)}>
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
  }
}
