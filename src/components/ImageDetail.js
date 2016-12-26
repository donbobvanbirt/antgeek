import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Button, Form, Image, Container, Loader, Header, Label, Comment, Icon, Modal, List } from 'semantic-ui-react';
import moment from 'moment';
import lodash from 'lodash';

import IdLabel from './IdLabel';
import DeleteImage from './DeleteImage';
import EditDescription from './EditDescription';
import RemoveTags from './RemoveTags';
import RemoveIds from './RemoveIds';
import Report from './Report';

import {
  getCurrentImage,
  postComment,
  addTags,
  removeTag,
  likePost,
  unlikePost,
  addId,
  removeImage,
  updateImage,
 } from '../actions/PostActions';

class ImageDetail extends Component {
  constructor() {
    super();
    this.state = {
      newComment: '',
      newTags: '',
      currentModel: null,
      reportReason: null,
    };
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

  // openTagModel = () => {
  //   this.setState({ currentModel: 'tagModel' });
  // }
  //
  // closeTagModel = () => {
  //   this.setState({ currentModel: null });
  // }

  setCurrentModel = (model) => {
    this.setState({ currentModel: model });
  }

  submitComment = (e) => {
    e.preventDefault();
    const { newComment } = this.state;
    if (newComment.trim()) {
      const commentObj = {
        body: newComment,
      };
      this.props.postComment(this.props.params.id, commentObj);
      this.setState({ newComment: '' });
    }
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

  deleteTag = (tag) => {
    this.props.deleteTags(this.props.params.id, { tag });
  }

  deleteId = (id) => {
    // this.props.deleteTags(this.props.params.id, { tag });
    // console.log('id:', id);
    this.props.updateImage(this.props.params.id, { [id]: '' });
  }

  submitNewId = (newVal) => {
    this.props.addId(this.props.params.id, newVal);
  }

  addLike = () => {
    // console.log('liked!', id);
    this.props.likePost(this.props.params.id);
  }

  removeLike = () => {
    // console.log('liked!', id);
    this.props.unlikePost(this.props.params.id);
  }

  clickTag = (search) => {
    browserHistory.push(`/search/${search}`)
  }

  deleteImage = () => {
    this.props.removeImage(this.props.params.id);
    browserHistory.push('/');
  }

  editImage = (editImageObj) => {
    // console.log('editImageObj:', editImageObj);
    this.props.updateImage(this.props.params.id, editImageObj);
  }

  internalLink = (path) => {
    browserHistory.push(path);
    // console.log('path:', path);
  }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  _onSelect = (e, { value }) => this.setState({ reportReason: value })

  reportImage = (e) => {
    e.preventDefault();
    const { reportComments, reportReason } = this.state;
    if (reportComments && reportReason) {
      // console.log('reportComments:', reportComments);
      // console.log('reportReason:', reportReason);
      const reportObj = {
        image: this.props.params.id,
        reson: reportReason,
        comment: reportComments,
      };
      this.setState({
        currentModel: null,
        reportComments: '',
        reportReason: null,
      });
    } else {
      alert('Please select a reason and provide details');
    }
  }

  render() {
    const { newComment, currentModel, newTags } = this.state;
    let content = (<Loader active inline="centered" />);
    let id;
    let description;
    // let genus = <IdLabel clickAction={() => this.internalLink('/signin')} content="Add Genus" />;
    // let species = <IdLabel clickAction={() => this.internalLink('/signin')} content="Add Species" />;
    // let commonName = <IdLabel clickAction={() => this.internalLink('/signin')} content="Add Common Name" />;
    let genus = <Label size="small" onClick={() => this.internalLink('/signin')} as="a">Add Genus</Label>;
    let species = <Label size="small" onClick={() => this.internalLink('/signin')} as="a">Add Species</Label>;
    let commonName = <Label size="small" onClick={() => this.internalLink('/signin')} as="a">Add Common Name</Label>;
    let url;
    let timestamp;
    let tags;
    let comments = 'This post has no comments';
    let userName;
    let avatar;
    let userId;
    let commentForm = <div className="login" onClick={() => this.internalLink('/signin')}>Please log in to leave a comment</div>;
    let tagButton = '';
    let likeButton = <Icon size="big" link name="empty heart" onClick={() => this.internalLink('/signin')} />;
    let likeCount = '';
    let likes;
    let editButtons = '';
    let editDescription = '';
    let removeTags = '';
    let removeIds = '';

    if (this.props.currentImage) {
      // console.log('this.props.currentImage:', this.props.currentImage[0]);
      const imageObj = this.props.currentImage[0];
      id = imageObj._id;
      description = imageObj.description;
      url = imageObj.url;
      timestamp = imageObj.timestamp;
      userName = imageObj.user.name;
      avatar = imageObj.user.picture;
      userId = imageObj.user.user_id;
      likeCount = imageObj.likes.length;
      // likes = Object.values(imageObj.likes).join();
      likes = imageObj.likes.map(like => (Object.values(like).join('')));
      // console.log('likes', likes);

      tags = imageObj.tags.map((tag, i) => {
        if (tag) {
          return (
            <Label as="a" key={i} onClick={() => this.clickTag(tag)}>{tag}</Label>
          );
        }
        return '';
      });
      if (imageObj.comments.length) {
        comments = imageObj.comments.map((comment) => {
          const { body, _id, user } = comment;
          return (
            <Comment key={_id}>
              <Comment.Avatar src={user.picture} />
              <Comment.Content>
                <Comment.Author as="a" onClick={() => this.internalLink(`/profile/${user.user_id}`)}>{user.name}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment(comment.timestamp).fromNow()}</div>
                </Comment.Metadata>
                <Comment.Text>{body}</Comment.Text>
                {/* <Comment.Actions>
                  <Comment.Action>Like</Comment.Action>
                </Comment.Actions> */}
              </Comment.Content>
            </Comment>
          );
        });
      }

      if (!_.isEmpty(this.props.user)) {
        commentForm = (
          <Form reply onSubmit={this.submitComment}>
            <Form.TextArea placeholder="Comment on this image" name="newComment" value={newComment} onChange={this.handleChange} rows="3" />
            <Button icon="comment outline" content="Submit" primary />
          </Form>
        );

        tagButton = (
          <Label color="black" as="a" onClick={() => this.setCurrentModel('tagModel')}>Add Tags</Label>
        );

        genus = <IdLabel content="Genus" id="genus" url={url} submitAction={this.submitNewId} />;
        species = <IdLabel content="Species" id="species" url={url} submitAction={this.submitNewId} />;
        commonName = <IdLabel content="Common Name" id="commonName" url={url} submitAction={this.submitNewId} />;

        const alreadyLiked = _.some(likes, like => (like === this.props.user.uid));
        if (alreadyLiked) {
          likeButton = (
            <Icon size="big" link name="heart" onClick={() => this.removeLike()} />
          );
        } else {
          likeButton = (
            <Icon size="big" link name="empty heart" onClick={() => this.addLike()} />
          );
        }

        if (userId === this.props.user.uid) {
          const { tags, genus, species, commonName } = imageObj;
          editButtons = (
            <div>
              <DeleteImage deleteImage={this.deleteImage} />
            </div>
          );
          editDescription = (
            <EditDescription
              url={url}
              description={description}
              submit={this.editImage}
              tags={tags}
            />
          );
          if (tags.length) {
            removeTags = <RemoveTags url={url} submit={this.deleteTag} tags={tags} />;
          }
          if (genus || species || commonName) {
            removeIds = (
              <RemoveIds
                url={url}
                submit={this.deleteId}
                genus={genus}
                species={species}
                commonName={commonName}
              />
            );
          }
        }
      }

      if (imageObj.genus) {
        genus = <a onClick={() => this.clickTag(imageObj.genus)}>{imageObj.genus}</a>;
      }
      if (imageObj.species) {
        species = <a onClick={() => this.clickTag(imageObj.species)}>{imageObj.species}</a>;
      }
      if (imageObj.commonName) {
        commonName = <a onClick={() => this.clickTag(imageObj.commonName)}>{imageObj.commonName}</a>;
      }

      content = (
        <div>
          <Header as="h1">
            {/* {title} */}
            <Header.Subheader>
              Uploaded by {userName} on {moment(timestamp).format('MMMM Do YYYY')}
            </Header.Subheader>
          </Header>
          <Image src={url} fluid />
          <br />
          {likeButton} {likeCount}
          <Comment.Group>
            <Comment>
              <Comment.Avatar src={avatar} />
              <Comment.Content>
                <Comment.Author as="a" onClick={() => this.internalLink(`/profile/${userId}`)}>{userName}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment(timestamp).fromNow()}</div>
                </Comment.Metadata>
              </Comment.Content>
            </Comment>
          </Comment.Group>
          <br />
          <p>{description}</p>
          {editDescription}
          <br />

          <List>
            <List.Item><b>Genus:</b> {genus}</List.Item>
            <List.Item><b>Species:</b> {species}</List.Item>
            <List.Item><b>Common Name:</b> {commonName}</List.Item>
          </List>
          {removeIds}

          <Header as="h3">Tags:</Header>
          {tags} {tagButton} {removeTags}
          <br />
          <br />
          {/* <div className="pointer" id="reportDiv" onClick={this.reportImage}>
            <Icon name="flag" /> Report image
          </div> */}
          <Report
            url={url}
            submit={this.reportImage}
            _onType={this._onType}
            _onSelect={this._onSelect}
            value={this.state.reportReason}
            setCurrentModel={this.setCurrentModel}
            open={currentModel === 'reportModel'}
          />
          <Comment.Group>
            <Header as="h3">Comments:</Header>
            {comments}
          </Comment.Group>

          {commentForm}
          <br />
          {editButtons}
          {/* <DeleteImage /> */}

          <Modal open={currentModel === 'tagModel'} onClose={() => this.setCurrentModel(null)}>
            <Modal.Header>Add Tags</Modal.Header>
            <Modal.Content image>
              <Image wrapped size="medium" src={url} />
              <Modal.Description>
                <Header>Enter tags separated by commas</Header>
                <Form onSubmit={this.submitNewTags}>
                  <Form.TextArea name="newTags" value={newTags} onChange={this.handleChange} rows="3" />
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
  user: state.auth.user,
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
  deleteTags(id, tag) {
    dispatch(removeTag(id, tag));
  },
  addId(imageId, newId) {
    dispatch(addId(imageId, newId));
  },
  likePost(id) {
    dispatch(likePost(id));
  },
  unlikePost(id) {
    dispatch(unlikePost(id));
  },
  removeImage(id) {
    dispatch(removeImage(id));
  },
  updateImage(id, obj) {
    dispatch(updateImage(id, obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
