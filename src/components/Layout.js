import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Layout extends Component {

  render() {
    return (
      <div>
        <Navbar currentPath={this.props.location.pathname} />
        {this.props.children}
      </div>
    );
  }
}
