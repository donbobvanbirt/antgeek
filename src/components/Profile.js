import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Table, Image, Grid, Divider, Menu } from 'semantic-ui-react';
import moment from 'moment';

import { getImagesByUser, getLikedImages, getUserInfo } from '../actions/PostActions';
import ImageList from './ImageList';
import FileUpload from './FileUpload';

class Profile extends Component {
  state = { activeItem: 'posts' }

  componentWillMount() {
    this.props.getImagesByUser(this.props.params.userId);
    this.props.getUserInfo(this.props.params.userId);
  }

  getPosts = () => {
    this.setState({ activeItem: 'posts' });
    this.props.getImagesByUser(this.props.params.userId);
  }

  getLikes = () => {
    this.setState({ activeItem: 'likes' });
    this.props.getLikedImages(this.props.params.userId);
  }

  render() {
    const { activeItem } = this.state;
    const { userImages, userInfo } = this.props;
    let displayName = '';
    let createdAt = '';
    let lastSignedInAt = '';
    let photoURL = '';

    if (userInfo) {
      displayName = userInfo.displayName;
      photoURL = userInfo.photoURL;
      createdAt = userInfo.metadata.createdAt;
      lastSignedInAt = userInfo.metadata.lastSignedInAt;
    }

    return (
      <Container>
        <Header as="h1" textAlign="center">{displayName}</Header>
        <Divider />
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column floated="right">
              <Image src={photoURL} shape="rounded" size="small" />
            </Grid.Column>
            <Grid.Column>
              <Table basic="very" celled collapsing>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell singleLine>Display Name:</Table.Cell>
                    <Table.Cell singleLine>{displayName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>Member Since:</Table.Cell>
                    <Table.Cell singleLine>{moment(createdAt).fromNow()}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>Last Seen:</Table.Cell>
                    <Table.Cell singleLine>{moment(lastSignedInAt).fromNow()}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        {/* <Header as="h2">Your Posts:</Header> */}
        {/* <FileUpload submitFile={upload} /> */}
        <br />
        <Menu tabular>
          <Menu.Item name="posts" active={activeItem === 'posts'} onClick={this.getPosts} />
          <Menu.Item name="likes" active={activeItem === 'likes'} onClick={this.getLikes} />
        </Menu>
        <ImageList images={userImages} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userImages: state.userImages,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  getImagesByUser(id) {
    dispatch(getImagesByUser(id));
  },
  getLikedImages(id) {
    dispatch(getLikedImages(id));
  },
  getUserInfo(id) {
    dispatch(getUserInfo(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
