import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Layout extends Component {

  render() {
    // console.log('this.props.location.pathname:', this.props.location.pathname);
    return (
      <div>
        <Navbar currentPath={this.props.location.pathname} />
        {this.props.children}
      </div>
    );
  }
}
