import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Button, Form, Image, Container, Loader, Header, Label, Comment, Icon, Modal } from 'semantic-ui-react';
import moment from 'moment';

import { getCurrentImage, postComment, addTags } from '../actions/PostActions';

class ImageDetail extends Component {
  constructor() {
    super();
    this.state = { newComment: '', newTags: '', tagModel: false };
  }

  componentWillMount() {
    this.props.getCurrentImage(this.props.params.id);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // console.log('this.state:', this.state);
  }

  openTagModel = () => {
    this.setState({ tagModel: true });
  }

  closeTagModel = () => {
    this.setState({ tagModel: false });
  }

  submitComment = (e) => {
    e.preventDefault();
    // console.log('this.state.newComment:', this.state.newComment);
    const commentObj = {
      body: this.state.newComment,
    };
    this.props.postComment(this.props.params.id, commentObj);
    this.setState({ newComment: '' });
  }

  submitNewTags = (e) => {
    e.preventDefault();
    const tagArr = this.state.newTags.split(',').map(tag => (tag.trim().toLowerCase()));
    const tagObj = {
      newTags: tagArr,
    };
    this.props.addTags(this.props.params.id, tagObj);
    this.setState({ newTags: '', tagModel: false });
  }

  clickTag = (search) => {
    browserHistory.push(`/search/${search}`)
  }

  reportImage = () => {
    console.log('report');
  }

  render() {
    const { newComment, tagModel, newTags } = this.state;
    let content = (<Loader active inline="centered" />);
    let id;
    let description;
    let title;
    let url;
    let timestamp;
    let tags;
    let comments;
    let user = 'AntEnthusiast';

    if (this.props.currentImage) {
      // console.log('this.props.currentImage:', this.props.currentImage[0]);
      const imageObj = this.props.currentImage[0];
      id = imageObj.id;
      description = imageObj.description;
      title = imageObj.title;
      url = imageObj.url;
      timestamp = imageObj.timestamp;
      tags = imageObj.tags.map((tag, i) => (
        <Label as="a" key={i} onClick={() => this.clickTag(tag)}>{tag}</Label>
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
          {tags} <Label color="black" as="a" onClick={this.openTagModel}>Add Tags</Label>
          <br />
          <br />
          <div id="reportDiv" onClick={this.reportImage}>
            <Icon name="flag" /> Report image
          </div>
          <Comment.Group>
            <Header as="h3">Comments:</Header>
            {comments}
          </Comment.Group>
          <Form reply onSubmit={this.submitComment}>
            <Form.TextArea placeholder="Comment on this image" name="newComment" value={newComment} onChange={this.handleChange} rows="3" />
            <Button icon="comment outline" content="Submit" primary />
          </Form>

          <Modal open={tagModel} onClose={this.closeTagModel}>
            <Modal.Header>Add Tags to {title}</Modal.Header>
            <Modal.Content image>
              <Image wrapped size="medium" src={url} />
              <Modal.Description>
                <Header>Enter tags separated by commas</Header>
                <p>If you know the species or commons names enter them here:</p>
                <Form onSubmit={this.submitNewTags}>
                  <Form.TextArea placeholder="Camponotus, Carpenter ant, worker, queen, etc" name="newTags" value={newTags} onChange={this.handleChange} rows="3" />
                  <Button>Submit</Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>

        </div>
      );
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
  addTags(id, tags) {
    dispatch(addTags(id, tags));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
