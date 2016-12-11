import React, { Component } from 'react';
import axios from 'axios';

import { firebaseAuth } from '../firebase';

export default class Dashboard extends Component {
  // componentDidMount() {
  //   firebaseAuth.currentUser.getToken()
  //     .then((token) => {
  //       return axios.get('/api/secret', {
  //         headers: {
  //           'x-auth-token': token,
  //         },
  //       });
  //     })
  //     .then((res) => {
  //       console.log('res:', res);
  //     })
  //     .catch((err) => {
  //       console.log('err:', err);
  //     });
  // }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}
