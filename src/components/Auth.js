import React, { Component } from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';

import Login from './Login';

export default class Auth extends Component {
  constructor() {
    super();

    this.state = { open: false };
  }

  showModal = () => {
    this.setState({ open: true });
  }

  hideModal = () => {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { loggedIn, user, signOut } = this.props;
    console.log('user:', user);

    const dropDown = (
      <Dropdown text={user.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text="Profile" />
          <Dropdown.Item text="Account" />
          <Dropdown.Divider />
          <Dropdown.Item onClick={signOut} text="Log Out" />
        </Dropdown.Menu>
      </Dropdown>
    );

    const logInOrOut = loggedIn ? dropDown : (
      <div className="login" onClick={this.showModal}>Login/Register</div>
    );
    return (
      <div>
        {logInOrOut}
        <Modal open={open} onClose={this.hideModal}>
          <Modal.Content>
            <Modal.Description>
              <Login hideModal={this.hideModal} />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}