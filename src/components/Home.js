import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
// import { Image, Container } from 'semantic-ui-react';

import { upload } from '../actions/PostActions';
import FileUpload from './FileUpload';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>AntGeek</h1>
        <FileUpload submitFile={this.props.upload} />
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  upload(file) {
    dispatch(upload(file));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
