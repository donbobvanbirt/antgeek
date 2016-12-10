import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Header, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { signInWithGoogle } from '../actions/auth';

class Login extends Component {
  constructor() {
    super();

    this.state = {};
  }

  _googleSignIn = () => {
    const { googleSignIn, hideModal } = this.props;
    googleSignIn();
    if (hideModal) {
      hideModal();
    }
    browserHistory.push('/');
  }

  _signOut = () => {
    this.props.signOut();
  }

  render() {
    return (
      <div>
        <Header textAlign="center" as="h1" icon>
          <Icon name="user" />
            Login to AntGeek
        </Header>
        <Button onClick={this._googleSignIn} fluid color="google plus"><Icon name="google" size="large" /> Sign In With Google</Button>
        <button onClick={this._signOut}>Sign Out</button>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  googleSignIn() {
    dispatch(signInWithGoogle());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
