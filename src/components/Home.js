import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
import { Container } from 'semantic-ui-react';

import { upload, getImages } from '../actions/PostActions';
import FileUpload from './FileUpload';
import ImageList from './ImageList';

class Home extends Component {
  componentWillMount() {
    this.props.getPics();
  }

  render() {
    return (
      <Container>
        <FileUpload submitFile={this.props.upload} />
        <ImageList images={this.props.pics} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pics: state.images,
});

const mapDispatchToProps = dispatch => ({
  upload(file) {
    dispatch(upload(file));
  },
  getPics() {
    dispatch(getImages());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
