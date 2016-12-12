import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

import { Container, Divider } from 'semantic-ui-react';

import { upload, getImages } from '../actions/PostActions';
import FileUpload from './FileUpload';
import ImageList from './ImageList';

class Home extends Component {
  componentWillMount() {
    this.props.getPics();
  }

  render() {
    const { upload, pics, user } = this.props;
    const fileUpload = _.isEmpty(user) ? '' : <FileUpload submitFile={upload} />;
    return (
      <Container>
        {fileUpload}
        <Divider />
        <ImageList images={pics} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pics: state.images,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  upload(file, details) {
    dispatch(upload(file, details));
  },
  getPics() {
    dispatch(getImages());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
