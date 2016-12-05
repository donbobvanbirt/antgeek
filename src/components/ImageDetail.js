import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form } from 'semantic-ui-react';

import { getCurrentImage } from '../actions/PostActions';

class ImageDetail extends Component {
  // constructor() {
  //
  // }

  componentWillMount() {
    this.props.getCurrentImage(this.props.params.id);
  }

  render() {
    console.log('this.props.currentImage:', this.props.currentImage);
    return (
      <h1>detail</h1>
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
