import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Header, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { signInWithGoogle, signInWithFacebook } from '../actions/auth';

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

  _facebookSignIn = () => {
    const { facebookSignIn, hideModal } = this.props;
    facebookSignIn();
    if (hideModal) {
      hideModal();
    }
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <Header textAlign="center" as="h1" icon>
          <Icon name="user" />
            Sign In to AntGeek
        </Header>
        <Button onClick={this._googleSignIn} fluid color="google plus"><Icon name="google" size="large" /> Sign In with Google</Button>
        <br />
        <Button onClick={this._facebookSignIn} fluid color="facebook"><Icon name="facebook" size="large" /> Sign In with Facebook</Button>
        <br />
        <Button onClick={this._googleSignIn} fluid color="twitter"><Icon name="twitter" size="large" /> Sign In with Twitter</Button>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  googleSignIn() {
    dispatch(signInWithGoogle());
  },
  facebookSignIn() {
    dispatch(signInWithFacebook());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
