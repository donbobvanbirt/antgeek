import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import { getImagesByUser } from '../actions/PostActions';
import ImageList from './ImageList';

class Dashboard extends Component {
  componentWillMount() {
    this.props.getImagesByUser(this.props.user.uid);
  }

  render() {
    const { user, userImages } = this.props;
    console.log('user:', user);
    console.log('userImages:', userImages);
    return (
      <Container>
        <h1>Dashboard</h1>
        <ImageList images={userImages} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userImages: state.userImages,
});

const mapDispatchToProps = dispatch => ({
  getImagesByUser(id) {
    dispatch(getImagesByUser(id));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
