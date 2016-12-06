import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Menu } from 'semantic-ui-react';

export default class Navbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item name="AntGeek" active={activeItem === 'AntGeek'} onClick={this.handleItemClick}>
          <img id="top-logo" src="/images/logoBlackTransparrent.png" alt="" />
        </Menu.Item>
        <Menu.Item name="Search" active={activeItem === 'Search'} onClick={this.handleItemClick} />

        <Menu.Item position="right" name="Login" active={activeItem === 'Profile'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}
