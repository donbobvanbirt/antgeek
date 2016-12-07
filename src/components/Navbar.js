import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Menu, Form, Input } from 'semantic-ui-react';

export default class Navbar extends Component {
  state = {}

  handleItemClick = (name, path) => {
    this.setState({ activeItem: name });
    browserHistory.push(path)
  }

  search = (e, formInput) => {
    e.preventDefault();
    const { query } = formInput;
    browserHistory.push(`/search/${query.toLowerCase()}`);
  }

  testClick() {
    console.log('search click')
  }

  render() {
    const { activeItem } = this.state;
    console.log('browserHistory:', browserHistory);
    return (
      <Menu>
        <Menu.Item name="AntGeek" active={activeItem === 'AntGeek'} onClick={() => this.handleItemClick('home', '/')}>
          <img id="top-logo" src="/images/logoBlackTransparrent.png" alt="" />
        </Menu.Item>
        {/* <Menu.Item icon="search" name="Search" active={activeItem === 'Search'} onClick={this.handleItemClick} /> */}
        <Form id="navSearchForm" onSubmit={this.search.bind(this)}>
          <Form.Field>
            <Input name="query" id="searchInput" icon={{ name: 'search'}} placeholder="Search" />
          </Form.Field>
        </Form>
        <Menu.Item position="right" name="Login" active={activeItem === 'Profile'} />
      </Menu>
    );
  }
}
