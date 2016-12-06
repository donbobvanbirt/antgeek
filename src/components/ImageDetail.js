import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Image, Container, Loader, Header, Label } from 'semantic-ui-react';
import moment from 'moment';

import { getCurrentImage } from '../actions/PostActions';

class ImageDetail extends Component {
  // constructor() {
  //
  // }

  componentWillMount() {
    this.props.getCurrentImage(this.props.params.id);
  }

  render() {
    let content = (<Loader active inline="centered" />);
    let id;
    let description;
    let title;
    let url;
    let timestamp;
    let tags;
    let comments;
    let user = 'AntEnthusiast';

    if(this.props.currentImage) {
      // console.log('this.props.currentImage:', this.props.currentImage[0]);
      const imageObj = this.props.currentImage[0];
      id = imageObj.id;
      description = imageObj.description;
      title = imageObj.title;
      url = imageObj.url;
      timestamp = imageObj.timestamp;
      tags = imageObj.tags.map((tag, i) => (
        <Label as="a" key={i}>{tag}</Label>
      ));
      if (imageObj.comments.length === 0) {
        comments = 'This post has no comments';
      }

      content = (
        <div>
          <Image src={url} fluid />
          <Header as="h1">
            {title}
            <Header.Subheader>
              Uploaded by {user} on {moment(timestamp).format('MMMM Do YYYY')}
            </Header.Subheader>
          </Header>
          <p>{description}</p>
          <Header as="h3">Tags:</Header>
          {tags} <Button size="mini">Add Tag</Button>
          <Header as="h3">Comments:</Header>
          {comments}
          <Form reply onSubmit={e => e.preventDefault()}>
            <Form.TextArea rows="3" />
            <Button content="Submit Comment" primary />
          </Form>
        </div>
      )
    }

    return (
      <Container>
        {content}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  currentImage: state.currentImage,
});

const mapDispatchToProps = dispatch => ({
  getCurrentImage(id) {
    dispatch(getCurrentImage(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
