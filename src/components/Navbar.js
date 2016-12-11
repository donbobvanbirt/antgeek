import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Menu, Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Auth from './Auth';
import { signOut } from '../actions/auth';

class Navbar extends Component {
  state = {}

  handleItemClick = (name, path) => {
    this.setState({ activeItem: name });
    browserHistory.push(path)
  }

  search = (e, formInput) => {
    e.preventDefault();
    const { query } = formInput;
    console.log('this.props.currentPath:', this.props.currentPath.split('/'));
    browserHistory.push(`/search/${query.toLowerCase()}`);
  }

  logOut = () => {
    this.props.signOut();
    browserHistory.push('/');
  }

  render() {
    const { activeItem } = this.state;
    const { loggedIn, user, signOut } = this.props;
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
        <Menu.Item position="right" name="auth">
          <Auth loggedIn={loggedIn} user={user} signOut={this.logOut} handleItemClick={this.handleItemClick} />
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state => ({
  loggedIn: state.auth.authenticated,
  user: state.auth.user,
}));

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(signOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
