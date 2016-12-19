import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Card, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';

export default class ImageCard extends Component {

  selectPic(id) {
    // console.log('id:', id);
    browserHistory.push(`/detail/${id}`);
  }

  render() {
    const { url, _id, tags, description, comments, timestamp, user, likes, genus, species } = this.props.pic;
    // console.log('this.props.pic:', this.props.pic);
    let header = '';
    let image = <Image src={url} />;
    const hasId = genus && species;
    if (genus || species) {
      header = genus + ' ' + species;
    }
    if (!hasId) {
      image = <Image src={url} label={{ color: 'blue', content: 'ID Needed', ribbon: true }}/>
    }
    return (
      <Card onClick={() => this.selectPic(_id)}>
        {image}
        <Card.Content>
          <Card.Header>{header}</Card.Header>
          <Card.Meta>{user.name}</Card.Meta>
          <Card.Description>{moment(timestamp).fromNow()}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="comments" />
          {comments.length} Comments
          <div>
            <Icon name="heart" />
            {likes.length} Likes
          </div>
        </Card.Content>
      </Card>
    );
  }
}
