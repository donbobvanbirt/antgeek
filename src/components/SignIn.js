import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import Login from './Login';

export default class SignIn extends Component {
  render() {
    return (
      <Container>
        <Login />
      </Container>
    );
  }
}
