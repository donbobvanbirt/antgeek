import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Image, Container, Loader, Header, Label, Comment } from 'semantic-ui-react';
import moment from 'moment';

import { getCurrentImage, postComment } from '../actions/PostActions';

class ImageDetail extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.props.getCurrentImage(this.props.params.id);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  submitComment = (e) => {
    e.preventDefault();
    console.log('this.state.newComment:', this.state.newComment);
    const commentObj = {
      body: this.state.newComment,
    };
    this.props.postComment(this.props.params.id, commentObj);
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
      } else {
        comments = imageObj.comments.map(comment => {
          const { body, _id } = comment;
          return (
            <Comment key={_id}>
              <Comment.Avatar src="http://semantic-ui.com/images/avatar/small/matt.jpg" />
              <Comment.Content>
                <Comment.Author as="a">{user}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment(comment.timestamp).format('MMMM Do YYYY')}</div>
                </Comment.Metadata>
                <Comment.Text>{body}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Like</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        });
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
          <Comment.Group>
            <Header as="h3">Comments:</Header>
            {comments}
          </Comment.Group>
          <Form reply onSubmit={this.submitComment}>
            <Form.TextArea placeholder="Comment on this image" name="newComment" onChange={this.handleChange} rows="3" />
            <Button content="Submit" primary />
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
  postComment(id, comment) {
    dispatch(postComment(id, comment));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
